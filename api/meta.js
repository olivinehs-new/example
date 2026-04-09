const fs = require("fs");
const path = require("path");

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

  const modelPath = path.resolve(process.cwd(), process.env.MODEL_PATH || "model/moel_doc_classifier.json");
  const legalPath = path.resolve(process.cwd(), process.env.LEGAL_PATH || "data/moel_legal_departments.json");

  const model = readJsonSafe(modelPath);
  const legal = readJsonSafe(legalPath);

  res.status(200).json({
    modelPath,
    legalPath,
    modelMeta: model?.meta || null,
    legalMeta: legal?.meta || null,
  });
};
