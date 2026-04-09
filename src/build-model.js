const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const {
  buildIdf,
  vectorize,
  meanVectors,
  topKeywords,
  clipVector,
  normalizeText,
} = require("./text-utils");
const {
  loadLegalDepartmentData,
  normalizeDepartmentName,
  guessDepartmentFromText,
} = require("./department-utils");
const { buildTermIndex, encodeSparseVector } = require("./model-format");

const MISANG = "\uBBF8\uC0C1";

function loadJson(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(raw);
}

function run(options) {
  const inputPath = path.resolve(options.input);
  const outputPath = path.resolve(options.output);
  const legalPath = options.legal || "data/moel_legal_departments.json";
  const legalData = loadLegalDepartmentData(legalPath);

  const rows = loadJson(inputPath).filter((r) => r && r.title && r.content);
  if (!rows.length) {
    throw new Error("Training data is empty.");
  }

  const docs = rows.map((r) => {
    const text = normalizeText(`${r.title} ${r.content}`);
    // Prefer department parsed from the footer of each press release.
    // If footer department is unavailable/invalid, fall back to legal dictionary text matching.
    const footerDepartment = normalizeDepartmentName(r.department, legalData);
    const guessed = footerDepartment === MISANG ? guessDepartmentFromText(text, legalData) : null;
    const department = footerDepartment !== MISANG
      ? footerDepartment
      : normalizeDepartmentName(guessed || "", legalData);
    return {
      ...r,
      department,
      text,
    };
  });

  const maxFeatures = Number(options.maxFeatures || 25000);
  const clipSize = Number(options.clip || 90);
  const idf = buildIdf(docs.map((d) => d.text), 2, maxFeatures);
  const vectors = docs.map((d) => vectorize(d.text, idf));
  const { terms, termToId, idf: idfArray } = buildTermIndex(idf);

  const deptBuckets = new Map();
  docs.forEach((doc, i) => {
    const dept = doc.department || MISANG;
    if (dept === MISANG) return;
    if (!deptBuckets.has(dept)) deptBuckets.set(dept, []);
    deptBuckets.get(dept).push(vectors[i]);
  });

  const deptCentroids = {};
  const minDeptDocs = Number(options.minDeptDocs || 3);
  for (const [dept, vecs] of deptBuckets.entries()) {
    if (vecs.length < minDeptDocs) continue;
    deptCentroids[dept] = meanVectors(vecs);
  }

  const modelDocs = docs.map((doc, i) => ({
    newsSeq: doc.newsSeq,
    date: doc.date,
    title: doc.title,
    department: doc.department || MISANG,
    url: doc.url,
    keywords: topKeywords(doc.text, idf, 6),
    vector: encodeSparseVector(clipVector(vectors[i], clipSize), termToId),
  }));

  const compactCentroids = {};
  for (const [dept, vec] of Object.entries(deptCentroids)) {
    compactCentroids[dept] = encodeSparseVector(vec, termToId);
  }

  const model = {
    meta: {
      createdAt: new Date().toISOString(),
      dataSize: modelDocs.length,
      departmentSize: Object.keys(deptCentroids).length,
      source: "moel press releases recent 3 years",
      legalReference: legalData.meta || null,
      format: "compact-v1",
      features: terms.length,
      clipSize,
    },
    terms,
    idf: idfArray,
    departmentCentroids: compactCentroids,
    documents: modelDocs,
  };

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(model), "utf8");

  console.log(`Saved model: ${outputPath}`);
  console.log(`documents=${model.meta.dataSize}, departments=${model.meta.departmentSize}`);
}

const program = new Command();
program
  .requiredOption("--input <path>", "training data json")
  .requiredOption("--output <path>", "model output json")
  .option("--minDeptDocs <number>", "minimum documents per department", "3")
  .option("--maxFeatures <number>", "maximum tf-idf features", "25000")
  .option("--clip <number>", "max sparse terms per document vector", "90")
  .option("--legal <path>", "legal department dictionary json", "data/moel_legal_departments.json");

program.parse(process.argv);

try {
  run(program.opts());
} catch (err) {
  console.error("Build model failed:", err.message);
  process.exit(1);
}
