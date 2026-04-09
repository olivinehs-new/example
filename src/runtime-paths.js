const fs = require("fs");
const os = require("os");
const path = require("path");
const axios = require("axios");

function candidateRoots() {
  const roots = [];
  const cwd = process.cwd();
  const here = __dirname;
  roots.push(cwd);
  roots.push(path.resolve(here, ".."));
  roots.push(path.resolve(here, "../.."));
  roots.push(path.resolve(here, "../../.."));
  roots.push("/var/task");
  roots.push("/var/task/user");
  return Array.from(new Set(roots));
}

function resolveAssetPath(relativePath) {
  for (const root of candidateRoots()) {
    const p = path.resolve(root, relativePath);
    if (fs.existsSync(p)) return p;
  }
  return path.resolve(process.cwd(), relativePath);
}

function defaultModelUrl() {
  return process.env.MODEL_URL ||
    "https://raw.githubusercontent.com/olivinehs-new/example/main/model/moel_doc_classifier.json";
}

function defaultLegalUrl() {
  return process.env.LEGAL_URL ||
    "https://raw.githubusercontent.com/olivinehs-new/example/main/data/moel_legal_departments.json";
}

async function downloadToFile(url, destPath) {
  const res = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 60000,
    maxRedirects: 5,
    headers: { "User-Agent": "moel-classifier/1.0" },
  });
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, Buffer.from(res.data));
}

async function resolveAssetPathWithFallback(relativePath, fallbackUrl, cacheName) {
  const localPath = resolveAssetPath(relativePath);
  if (fs.existsSync(localPath)) return localPath;

  const cachePath = path.resolve(os.tmpdir(), cacheName);
  if (fs.existsSync(cachePath)) return cachePath;

  if (fallbackUrl) {
    try {
      await downloadToFile(fallbackUrl, cachePath);
      if (fs.existsSync(cachePath)) return cachePath;
    } catch (_) {
      return localPath;
    }
  }
  return localPath;
}

module.exports = {
  candidateRoots,
  resolveAssetPath,
  resolveAssetPathWithFallback,
  defaultModelUrl,
  defaultLegalUrl,
};
