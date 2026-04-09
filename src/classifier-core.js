const fs = require("fs");
const path = require("path");
const {
  vectorize,
  topKeywords,
  normalizeText,
} = require("./text-utils");
const {
  loadLegalDepartmentData,
  legalDepartmentKeywordScore,
  normalizeDepartmentName,
} = require("./department-utils");
const { cosineQueryMapToSparseArray } = require("./model-format");

function loadModel(modelPath) {
  const raw = fs.readFileSync(path.resolve(modelPath), "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

function toIdfDict(model) {
  if (Array.isArray(model.terms) && Array.isArray(model.idf)) {
    const out = {};
    for (let i = 0; i < model.terms.length; i += 1) {
      out[model.terms[i]] = model.idf[i];
    }
    return out;
  }
  return model.idf || {};
}

function queryVectorToIdMap(queryVector, model) {
  if (!Array.isArray(model.terms)) return queryVector;
  const termToId = {};
  for (let i = 0; i < model.terms.length; i += 1) {
    termToId[model.terms[i]] = i;
  }
  const out = {};
  for (const [term, w] of Object.entries(queryVector || {})) {
    const id = termToId[term];
    if (id !== undefined) out[id] = w;
  }
  return out;
}

function cosineAgainstStored(queryIdMap, storedVec) {
  if (Array.isArray(storedVec)) {
    return cosineQueryMapToSparseArray(queryIdMap, storedVec);
  }
  let dot = 0;
  for (const [k, v] of Object.entries(storedVec || {})) {
    const q = queryIdMap[k];
    if (q) dot += q * v;
  }
  return dot;
}

function predictDepartment(queryIdMap, centroids, queryText, legalData = null) {
  const scored = Object.entries(centroids).map(([dept, vec]) => {
    const cosine = cosineAgainstStored(queryIdMap, vec);
    const legalScore = legalDepartmentKeywordScore(queryText, dept);
    return {
      department: dept,
      score: cosine * 0.85 + legalScore * 0.15,
      cosine,
      legalScore,
    };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

function retrieveSimilarDocs(queryIdMap, documents, topK = 5) {
  const scored = documents.map((doc) => ({
    ...doc,
    similarity: cosineAgainstStored(queryIdMap, doc.vector || {}),
  }));
  scored.sort((a, b) => b.similarity - a.similarity);
  return scored.slice(0, topK);
}

function aggregateTopics(queryText, similarDocs, idfDict, topN = 6) {
  const base = topKeywords(queryText, idfDict, topN);
  const score = new Map(base.map((k, i) => [k, topN - i]));
  for (const doc of similarDocs) {
    for (const kw of doc.keywords || []) {
      score.set(kw, (score.get(kw) || 0) + doc.similarity * 10);
    }
  }
  return Array.from(score.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([k]) => k);
}

function classifyText({
  model,
  text,
  topK = 5,
  topics = 6,
  legalData = null,
}) {
  const queryText = normalizeText(text);
  const idfDict = toIdfDict(model);
  const queryVector = vectorize(queryText, idfDict);
  const queryIdMap = queryVectorToIdMap(queryVector, model);
  const depRanking = predictDepartment(
    queryIdMap,
    model.departmentCentroids,
    queryText,
    legalData,
  );
  const similar = retrieveSimilarDocs(queryIdMap, model.documents, Number(topK));
  const mainTopics = aggregateTopics(queryText, similar, idfDict, Number(topics));

  return {
    predictedDepartment: normalizeDepartmentName(depRanking[0]?.department || "미상", legalData),
    confidence: Number((depRanking[0]?.score || 0).toFixed(4)),
    departmentCandidates: depRanking.slice(0, 5).map((x) => ({
      department: normalizeDepartmentName(x.department, legalData),
      score: Number(x.score.toFixed(4)),
      cosine: Number(x.cosine.toFixed(4)),
      legalScore: Number(x.legalScore.toFixed(4)),
    })),
    mainTopics,
    similarReferences: similar.map((d) => ({
      newsSeq: d.newsSeq,
      date: d.date,
      title: d.title,
      department: normalizeDepartmentName(d.department, legalData),
      similarity: Number(d.similarity.toFixed(4)),
      url: d.url,
    })),
  };
}

function classifyWithModelPath({
  modelPath,
  text,
  topK = 5,
  topics = 6,
  legalPath = "data/moel_legal_departments.json",
}) {
  const model = loadModel(modelPath);
  const legalData = loadLegalDepartmentData(legalPath);
  const result = classifyText({ model, text, topK, topics, legalData });
  return {
    ...result,
    references: {
      modelMeta: model.meta || null,
      legalMeta: legalData.meta || null,
    },
  };
}

module.exports = {
  loadModel,
  classifyText,
  classifyWithModelPath,
  loadLegalDepartmentData,
};
