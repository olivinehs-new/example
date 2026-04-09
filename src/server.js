const fs = require("fs");
const path = require("path");
const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const pdf = require("pdf-parse");
const iconv = require("iconv-lite");
const { classifyWithModelPath } = require("./classifier-core");

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

function decodeTextBuffer(buffer) {
  const utf8 = iconv.decode(buffer, "utf-8");
  const badRatio = (utf8.match(/\uFFFD/g) || []).length / Math.max(utf8.length, 1);
  if (badRatio > 0.01) {
    return iconv.decode(buffer, "euc-kr");
  }
  return utf8;
}

async function extractTextFromFile(file) {
  const ext = path.extname(file.originalname || "").toLowerCase();
  if (ext === ".pdf") {
    const parsed = await pdf(file.buffer);
    return parsed.text || "";
  }
  if (ext === ".docx") {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value || "";
  }
  return decodeTextBuffer(file.buffer);
}

function getModelPath() {
  return process.env.MODEL_PATH || "model/moel_doc_classifier.json";
}

function getLegalPath() {
  return process.env.LEGAL_PATH || "data/moel_legal_departments.json";
}

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("public")));

app.get("/api/meta", (req, res) => {
  const modelPath = path.resolve(getModelPath());
  const legalPath = path.resolve(getLegalPath());
  let modelMeta = null;
  let legalMeta = null;
  if (fs.existsSync(modelPath)) {
    const model = JSON.parse(fs.readFileSync(modelPath, "utf8").replace(/^\uFEFF/, ""));
    modelMeta = model.meta || null;
  }
  if (fs.existsSync(legalPath)) {
    const legal = JSON.parse(fs.readFileSync(legalPath, "utf8").replace(/^\uFEFF/, ""));
    legalMeta = legal.meta || null;
  }
  res.json({ modelPath, legalPath, modelMeta, legalMeta });
});

app.post("/api/classify", upload.single("file"), async (req, res) => {
  try {
    const textInput = String(req.body.text || "").trim();
    const file = req.file || null;
    const text = textInput || (file ? await extractTextFromFile(file) : "");

    if (!text || !text.trim()) {
      res.status(400).json({ error: "입력 텍스트가 없습니다. 텍스트 입력 또는 파일 첨부가 필요합니다." });
      return;
    }

    const result = classifyWithModelPath({
      modelPath: getModelPath(),
      legalPath: getLegalPath(),
      text,
      topK: Number(req.body.topk || 5),
      topics: Number(req.body.topics || 6),
    });

    res.json({
      input: {
        source: textInput ? "text" : "file",
        fileName: file?.originalname || null,
        textLength: text.length,
      },
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api", (req, res) => {
  res.status(404).json({
    error: "API endpoint not found",
    path: req.originalUrl,
    method: req.method,
  });
});

app.use((err, req, res, next) => {
  if (req.path.startsWith("/api")) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal server error" });
    return;
  }
  next(err);
});

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
