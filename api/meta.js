const fs = require("fs");
const {
  resolveAssetPathWithFallback,
  candidateRoots,
  defaultModelUrl,
  defaultLegalUrl,
} = require("../src/runtime-paths");

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const modelRelPath = process.env.MODEL_PATH || "model/moel_doc_classifier.json";
  const legalRelPath = process.env.LEGAL_PATH || "data/moel_legal_departments.json";
  const modelPath = await resolveAssetPathWithFallback(
    modelRelPath,
    defaultModelUrl(),
    "moel_doc_classifier.json",
  );
  const legalPath = await resolveAssetPathWithFallback(
    legalRelPath,
    defaultLegalUrl(),
    "moel_legal_departments.json",
  );
  const modelExists = fs.existsSync(modelPath);
  const legalExists = fs.existsSync(legalPath);

  const model = modelExists ? readJsonSafe(modelPath) : null;
  const legal = legalExists ? readJsonSafe(legalPath) : null;

  res.status(200).json({
    cwd: process.cwd(),
    roots: candidateRoots(),
    modelRelPath,
    legalRelPath,
    modelFallbackUrl: defaultModelUrl(),
    legalFallbackUrl: defaultLegalUrl(),
    modelPath,
    legalPath,
    modelExists,
    legalExists,
    modelMeta: model?.meta || null,
    legalMeta: legal?.meta || null,
  });
};
