const fs = require("fs");
const path = require("path");

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

module.exports = {
  candidateRoots,
  resolveAssetPath,
};
