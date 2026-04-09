const fs = require("fs");
const path = require("path");

const DEPT_SUFFIX_RE =
  /(담당관|정책관|정책단|지원단|상황실|센터|위원회|사무국|본부|실|국|과|팀)$/;

const INVALID_DEPTS = new Set([
  "미상",
  "한국",
  "결과",
  "자료",
  "보도자료",
  "참고",
  "대한민국",
  "고용노동부",
  "노동부",
  "정부",
  "부서",
  "문의",
]);

function readJsonSafe(filePath) {
  try {
    const raw = fs.readFileSync(path.resolve(filePath), "utf8").replace(/^\uFEFF/, "");
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
}

function loadLegalDepartmentData(filePath = "data/moel_legal_departments.json") {
  const data = readJsonSafe(filePath);
  if (!data || !Array.isArray(data.departments)) {
    return { departments: [], aliases: {}, meta: null };
  }
  return {
    departments: data.departments,
    aliases: data.aliases || {},
    meta: data.meta || null,
  };
}

function normalizeDepartmentName(raw, legalData = null) {
  let dept = String(raw || "").replace(/\s+/g, " ").trim();
  if (!dept) return "미상";

  dept = dept.replace(/\(.*?\)/g, " ").replace(/\s+/g, " ").trim();
  if (dept.includes(",")) dept = dept.split(",")[0].trim();
  if (dept.includes("/")) dept = dept.split("/")[0].trim();
  if (!dept) return "미상";

  const compactHits =
    dept.match(
      /[가-힣A-Za-z0-9·]+(?:담당관|정책관|정책단|지원단|상황실|센터|위원회|사무국|본부|실|국|과|팀)/g,
    ) || [];
  if (compactHits.length) {
    compactHits.sort((a, b) => b.length - a.length);
    dept = compactHits[0];
  }

  if (legalData?.aliases?.[dept]) {
    dept = legalData.aliases[dept];
  }

  if (dept.length < 3) return "미상";
  if (INVALID_DEPTS.has(dept)) return "미상";
  if (!DEPT_SUFFIX_RE.test(dept)) return "미상";
  return dept;
}

function guessDepartmentFromText(text, legalData = null) {
  if (!text || !legalData || !Array.isArray(legalData.departments)) return null;
  const normalized = String(text).replace(/\s+/g, " ");
  const candidates = [...legalData.departments].sort((a, b) => b.length - a.length);
  for (const dept of candidates) {
    if (dept && normalized.includes(dept)) {
      return dept;
    }
  }
  return null;
}

function legalDepartmentKeywordScore(text, department) {
  if (!text || !department) return 0;
  const src = String(text);
  const tokens =
    department.match(/[가-힣A-Za-z0-9]+/g)?.filter((x) => x.length >= 2) || [];
  if (!tokens.length) return 0;
  let hit = 0;
  for (const token of tokens) {
    if (src.includes(token)) hit += 1;
  }
  return hit / tokens.length;
}

module.exports = {
  loadLegalDepartmentData,
  normalizeDepartmentName,
  guessDepartmentFromText,
  legalDepartmentKeywordScore,
};
