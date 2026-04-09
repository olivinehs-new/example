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
    throw new Error("학습 데이터가 비어 있습니다.");
  }

  const docs = rows.map((r) => {
    const text = normalizeText(`${r.title} ${r.content}`);
    const normalized = normalizeDepartmentName(r.department, legalData);
    const guessed = normalized === "미상" ? guessDepartmentFromText(text, legalData) : null;
    return {
      ...r,
      department: guessed || normalized,
      text,
    };
  });

  const idf = buildIdf(docs.map((d) => d.text), 2, 70000);
  const vectors = docs.map((d) => vectorize(d.text, idf));

  const deptBuckets = new Map();
  docs.forEach((doc, i) => {
    const dept = doc.department || "미상";
    if (dept === "미상") return;
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
    department: doc.department || "미상",
    url: doc.url,
    keywords: topKeywords(doc.text, idf, 6),
    vector: clipVector(vectors[i], 220),
  }));

  const model = {
    meta: {
      createdAt: new Date().toISOString(),
      dataSize: modelDocs.length,
      departmentSize: Object.keys(deptCentroids).length,
      source: "고용노동부 보도자료 최근 3년",
      legalReference: legalData.meta || null,
    },
    idf,
    departmentCentroids: deptCentroids,
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
  .option("--legal <path>", "legal department dictionary json", "data/moel_legal_departments.json");

program.parse(process.argv);

try {
  run(program.opts());
} catch (err) {
  console.error("Build model failed:", err.message);
  process.exit(1);
}
