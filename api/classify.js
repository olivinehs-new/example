const fs = require("fs");
const os = require("os");
const path = require("path");
const { IncomingForm } = require("formidable");
const iconv = require("iconv-lite");
const { classifyWithModelPath } = require("../src/classifier-core");

function parseMultipart(req) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({
      multiples: false,
      keepExtensions: true,
      uploadDir: os.tmpdir(),
      maxFileSize: 15 * 1024 * 1024,
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function decodeTextBuffer(buffer) {
  const utf8 = iconv.decode(buffer, "utf-8");
  const badRatio = (utf8.match(/\uFFFD/g) || []).length / Math.max(utf8.length, 1);
  if (badRatio > 0.01) return iconv.decode(buffer, "euc-kr");
  return utf8;
}

function readField(fields, key, defaultValue = "") {
  const value = fields?.[key];
  if (Array.isArray(value)) return String(value[0] || defaultValue);
  if (value == null) return defaultValue;
  return String(value);
}

async function extractTextFromUploadedFile(file) {
  if (!file) return "";
  const filepath = file.filepath || file.path;
  const originalName = file.originalFilename || file.newFilename || "";
  const ext = path.extname(originalName).toLowerCase();
  const buffer = fs.readFileSync(filepath);

  if (ext === ".pdf") {
    const pdf = require("pdf-parse");
    const parsed = await pdf(buffer);
    return parsed.text || "";
  }
  if (ext === ".docx") {
    const mammoth = require("mammoth");
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  }
  return decodeTextBuffer(buffer);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const modelPath = process.env.MODEL_PATH || "model/moel_doc_classifier.json";
    const legalPath = process.env.LEGAL_PATH || "data/moel_legal_departments.json";
    const absModelPath = path.resolve(process.cwd(), modelPath);
    const absLegalPath = path.resolve(process.cwd(), legalPath);

    if (!fs.existsSync(absModelPath)) {
      res.status(503).json({
        error: "Model file is missing in deployment.",
        modelPath: absModelPath,
      });
      return;
    }
    if (!fs.existsSync(absLegalPath)) {
      res.status(503).json({
        error: "Legal department dictionary file is missing in deployment.",
        legalPath: absLegalPath,
      });
      return;
    }

    const contentType = String(req.headers["content-type"] || "");
    let textInput = "";
    let topK = 5;
    let topics = 6;
    let file = null;

    if (contentType.includes("multipart/form-data")) {
      const parsed = await parseMultipart(req);
      textInput = readField(parsed.fields, "text", "").trim();
      topK = Number(readField(parsed.fields, "topk", "5")) || 5;
      topics = Number(readField(parsed.fields, "topics", "6")) || 6;
      const maybeFile = parsed.files?.file;
      file = Array.isArray(maybeFile) ? maybeFile[0] : maybeFile || null;
    } else if (contentType.includes("application/json")) {
      let body = req.body;
      if (!body || (typeof body === "object" && Object.keys(body).length === 0)) {
        const raw = await readRawBody(req);
        body = raw ? JSON.parse(raw) : {};
      } else if (typeof body === "string") {
        body = JSON.parse(body || "{}");
      }
      textInput = String(body.text || "").trim();
      topK = Number(body.topk || 5) || 5;
      topics = Number(body.topics || 6) || 6;
    } else {
      res.status(400).json({ error: "Unsupported content type" });
      return;
    }

    const fileText = file ? await extractTextFromUploadedFile(file) : "";
    const text = (textInput || fileText || "").trim();
    if (!text) {
      res.status(400).json({ error: "입력 텍스트가 없습니다. 텍스트 입력 또는 파일 첨부가 필요합니다." });
      return;
    }

    const result = classifyWithModelPath({
      modelPath,
      legalPath,
      text,
      topK,
      topics,
    });

    res.status(200).json({
      input: {
        source: textInput ? "text" : "file",
        fileName: file?.originalFilename || null,
        textLength: text.length,
      },
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};
