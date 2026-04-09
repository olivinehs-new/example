const fs = require("fs");
const { classifyWithModelPath } = require("../src/classifier-core");
const {
  resolveAssetPathWithFallback,
  defaultModelUrl,
  defaultLegalUrl,
} = require("../src/runtime-paths");

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const modelRelPath = process.env.MODEL_PATH || "model/moel_doc_classifier.json";
    const legalRelPath = process.env.LEGAL_PATH || "data/moel_legal_departments.json";
    const absModelPath = await resolveAssetPathWithFallback(
      modelRelPath,
      defaultModelUrl(),
      "moel_doc_classifier.json",
    );
    const absLegalPath = await resolveAssetPathWithFallback(
      legalRelPath,
      defaultLegalUrl(),
      "moel_legal_departments.json",
    );

    if (!fs.existsSync(absModelPath)) {
      res.status(503).json({ error: "Model file is missing in deployment.", modelPath: absModelPath });
      return;
    }
    if (!fs.existsSync(absLegalPath)) {
      res.status(503).json({ error: "Legal department dictionary file is missing in deployment.", legalPath: absLegalPath });
      return;
    }

    const contentType = String(req.headers["content-type"] || "");
    if (!contentType.includes("application/json")) {
      res.status(400).json({ error: "Unsupported content type. Use application/json." });
      return;
    }

    let body = req.body;
    if (!body || (typeof body === "object" && Object.keys(body).length === 0)) {
      const raw = await readRawBody(req);
      body = raw ? JSON.parse(raw) : {};
    } else if (typeof body === "string") {
      body = JSON.parse(body || "{}");
    }

    const textInput = String(body.text || "").trim();
    if (!textInput) {
      res.status(400).json({ error: "입력 텍스트가 없습니다. 텍스트를 입력해 주세요." });
      return;
    }

    const result = classifyWithModelPath({
      modelPath: absModelPath,
      legalPath: absLegalPath,
      text: textInput,
      topK: 5,
      topics: 6,
    });

    res.status(200).json({
      input: { source: "text", fileName: null, textLength: textInput.length },
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
