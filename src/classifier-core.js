const fs = require("fs");
const path = require("path");
const { vectorize, topKeywords, normalizeText } = require("./text-utils");
const {
  loadLegalDepartmentData,
  legalDepartmentKeywordScore,
  lawTopDepartmentScore,
  normalizeDepartmentName,
} = require("./department-utils");
const { cosineQueryMapToSparseArray } = require("./model-format");

const MISANG = "미상";

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

function splitSentences(text) {
  const src = normalizeText(text);
  if (!src) return [];
  return src
    .split(/(?<=[.!?。！？]|\n)/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 10);
}

function sentenceScore(sentence, idfDict, keyTerms) {
  const vec = vectorize(sentence, idfDict);
  let score = 0;
  for (const v of Object.values(vec)) score += Number(v || 0);
  for (const t of keyTerms) {
    if (t && sentence.includes(t)) score += 0.4;
  }
  score += Math.min(sentence.length, 220) / 2200;
  return score;
}

function summarizeText(text, idfDict, maxSentences = 3, maxChars = 420) {
  const sentences = splitSentences(text);
  if (!sentences.length) {
    const fallback = normalizeText(text).slice(0, maxChars).trim();
    return {
      summaryText: fallback,
      sentenceCount: fallback ? 1 : 0,
      method: "truncate-fallback",
    };
  }

  const keyTerms = topKeywords(text, idfDict, 8);
  const ranked = sentences
    .map((s, i) => ({ index: i, sentence: s, score: sentenceScore(s, idfDict, keyTerms) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(1, maxSentences))
    .sort((a, b) => a.index - b.index);

  const picked = [];
  let len = 0;
  for (const x of ranked) {
    const nextLen = len + (picked.length ? 1 : 0) + x.sentence.length;
    if (picked.length && nextLen > maxChars) continue;
    picked.push(x.sentence);
    len = nextLen;
  }

  if (!picked.length) picked.push(ranked[0].sentence.slice(0, maxChars));

  return {
    summaryText: picked.join(" "),
    sentenceCount: picked.length,
    method: "extractive-keysentence",
  };
}

function predictDepartment(queryIdMap, centroids, queryText, legalData = null) {
  const scored = Object.entries(centroids).map(([dept, vec]) => {
    const cosine = cosineAgainstStored(queryIdMap, vec);
    const legalScore = legalDepartmentKeywordScore(queryText, dept);
    const lawTopScore = lawTopDepartmentScore(queryText, dept, legalData);
    return {
      department: dept,
      score: cosine * 0.8 + legalScore * 0.15 + lawTopScore * 0.05,
      cosine,
      legalScore,
      lawTopScore,
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

function makeDepartmentMembershipIndexes(model, legalData = null) {
  const pressSet = new Set();
  for (const doc of model.documents || []) {
    const dept = normalizeDepartmentName(doc.department, legalData);
    if (dept && dept !== MISANG) pressSet.add(dept);
  }

  const legalSet = new Set();
  for (const dept of legalData?.departments || []) {
    const normalized = normalizeDepartmentName(dept, legalData);
    if (normalized && normalized !== MISANG) legalSet.add(normalized);
  }

  return { pressSet, legalSet };
}

function summarizePressMatchedDepartments(similarDocs, legalData = null) {
  const stats = new Map();
  for (const doc of similarDocs || []) {
    const dept = normalizeDepartmentName(doc.department, legalData);
    if (!dept || dept === MISANG) continue;

    const current = stats.get(dept) || { count: 0, maxSimilarity: 0 };
    current.count += 1;
    current.maxSimilarity = Math.max(current.maxSimilarity, Number(doc.similarity || 0));
    stats.set(dept, current);
  }

  return Array.from(stats.entries())
    .sort((a, b) => {
      if (b[1].maxSimilarity !== a[1].maxSimilarity) return b[1].maxSimilarity - a[1].maxSimilarity;
      return b[1].count - a[1].count;
    })
    .map(([department, info]) => ({
      department,
      matchedCount: info.count,
      maxSimilarity: Number(info.maxSimilarity.toFixed(4)),
    }));
}

function classifyText({ model, text, topK = 5, topics = 6, legalData = null }) {
  const inputText = normalizeText(text);
  const idfDict = toIdfDict(model);
  const summary = summarizeText(inputText, idfDict, 3, 420);
  const queryText = summary.summaryText || inputText;

  const queryVector = vectorize(queryText, idfDict);
  const queryIdMap = queryVectorToIdMap(queryVector, model);

  const depRanking = predictDepartment(queryIdMap, model.departmentCentroids, queryText, legalData);
  const similar = retrieveSimilarDocs(queryIdMap, model.documents, Number(topK));
  const mainTopics = aggregateTopics(queryText, similar, idfDict, Number(topics));

  const { pressSet, legalSet } = makeDepartmentMembershipIndexes(model, legalData);
  const lawTopSet = new Set(
    (legalData?.topDepartments || [])
      .map((d) => normalizeDepartmentName(d, legalData))
      .filter((d) => d && d !== MISANG),
  );
  const similarMatchedSet = new Set(
    similar
      .map((d) => normalizeDepartmentName(d.department, legalData))
      .filter((d) => d && d !== MISANG),
  );

  const likelyDepartments = depRanking.slice(0, 5).map((x) => {
    const normalizedDept = normalizeDepartmentName(x.department, legalData);
    return {
      department: normalizedDept,
      score: Number(x.score.toFixed(4)),
      cosine: Number(x.cosine.toFixed(4)),
      legalScore: Number(x.legalScore.toFixed(4)),
      lawTopScore: Number((x.lawTopScore || 0).toFixed(4)),
      matchedInPress: pressSet.has(normalizedDept),
      matchedInSimilarReferences: similarMatchedSet.has(normalizedDept),
      inMoelOrganization: legalSet.has(normalizedDept),
      inLawTopDepartments: lawTopSet.has(normalizedDept),
    };
  });

  const pressMatchedDepartments = summarizePressMatchedDepartments(similar, legalData);
  const predictedDepartmentDetail = likelyDepartments[0] || {
    department: MISANG,
    score: 0,
    cosine: 0,
    legalScore: 0,
    lawTopScore: 0,
    matchedInPress: false,
    matchedInSimilarReferences: false,
    inMoelOrganization: false,
    inLawTopDepartments: false,
  };

  return {
    inputSummary: {
      originalLength: inputText.length,
      summaryLength: queryText.length,
      ...summary,
    },
    predictedDepartment: predictedDepartmentDetail.department,
    confidence: predictedDepartmentDetail.score,
    predictedDepartmentDetail,
    likelyDepartments,
    pressMatchedDepartments,
    departmentCandidates: likelyDepartments,
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
  summarizeText,
};
