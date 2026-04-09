const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const { Command } = require("commander");

const LAW_SOURCES = [
  {
    name: "고용노동부와 그 소속기관 직제",
    lsiSeq: "283523",
    url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=283523",
  },
  {
    name: "고용노동부와 그 소속기관 직제 시행규칙",
    lsiSeq: "283471",
    url: "https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=283471",
  },
];

const DEPT_SUFFIX_RE = /(담당관|기획관|지원단|센터|위원회|본부|국|과)$/;
const DEPT_PATTERN = /[가-힣A-Za-z0-9]{2,40}(?:담당관|기획관|지원단|센터|위원회|본부|국|과)/g;

function loadObservedDepartments() {
  const file = path.resolve("data/moel_press_releases_3y.json");
  if (!fs.existsSync(file)) return new Set();
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const rows = JSON.parse(raw);
  const set = new Set();
  for (const row of rows) {
    const src = String(row.department || "");
    const matches = src.match(DEPT_PATTERN) || [];
    for (const m of matches) set.add(cleanDepartmentToken(m));
  }
  return set;
}

function scoreDecodedText(text) {
  const src = String(text || "");
  const hangul = (src.match(/[가-힣]/g) || []).length;
  const replacement = (src.match(/�/g) || []).length;
  const controls = (src.match(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g) || []).length;
  return hangul * 3 - replacement * 5 - controls * 10;
}

function detectAndDecode(buffer, contentType = "") {
  const ctype = String(contentType || "").toLowerCase();
  const m = ctype.match(/charset=([a-z0-9\-_]+)/i);
  const charset = m ? m[1].toLowerCase() : "";

  if (charset.includes("euc-kr") || charset.includes("ks_c_5601") || charset.includes("cp949")) {
    return iconv.decode(buffer, "euc-kr");
  }

  const utf8 = iconv.decode(buffer, "utf-8");
  const euckr = iconv.decode(buffer, "euc-kr");
  return scoreDecodedText(euckr) > scoreDecodedText(utf8) ? euckr : utf8;
}

async function fetchLawInfo(lsiSeq) {
  const url = `https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=${lsiSeq}`;
  const res = await axios.get(url, {
    responseType: "arraybuffer",
    timeout: 30000,
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = detectAndDecode(Buffer.from(res.data), res.headers["content-type"]);
  const match = html.match(/lsPopViewAll2\('\d+',\s*'',\s*'',\s*'(\d{8})'/);
  return {
    infoUrl: url,
    efYd: match ? match[1] : "",
    html,
  };
}

async function fetchLawBody(lsiSeq, efYd) {
  const params = new URLSearchParams({
    lsiSeq: String(lsiSeq),
    efYd: String(efYd || ""),
    efYn: "Y",
    nwJoYnInfo: "Y",
    chrClsCd: "010202",
    ancYnChk: "0",
  });
  const res = await axios.post("https://www.law.go.kr/LSW/lsInfoR.do", params.toString(), {
    responseType: "arraybuffer",
    timeout: 30000,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent": "Mozilla/5.0",
    },
  });
  return detectAndDecode(Buffer.from(res.data), res.headers["content-type"]);
}

function cleanDepartmentToken(value) {
  let s = String(value || "").trim();
  s = s.replace(/[\u0000-\u001F]/g, " ");
  s = s.replace(/\s+/g, "");
  s = s.replace(/^\(/, "").replace(/\)$/, "");
  s = s.replace(/[\[\]{}<>]/g, "");
  return s;
}

function isDepartmentLike(name, observedSet) {
  const dept = cleanDepartmentToken(name);
  if (!dept || dept.length < 2 || dept.length > 20) return false;
  if (!DEPT_SUFFIX_RE.test(dept)) return false;

  const banned = [
    "고용노동부",
    "행정안전부",
    "별표",
    "별지",
    "부칙",
    "조",
    "항",
    "호",
    "결과",
    "자료",
    "참고",
    "법",
    "시행령",
    "시행규칙",
  ];
  if (banned.some((x) => dept === x || dept.includes(`${x}제`))) return false;

  if (observedSet.has(dept)) return true;
  return true;
}

function extractDepartmentCandidates(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ");
  const hits = cleaned.match(DEPT_PATTERN) || [];
  const set = new Set();
  for (const raw of hits) {
    const dept = cleanDepartmentToken(raw);
    if (!dept) continue;
    if (!/[가-힣]/.test(dept)) continue;
    set.add(dept);
  }
  return Array.from(set);
}

function extractTopBannerDepartments(lawBodyHtml) {
  const $ = cheerio.load(lawBodyHtml);
  const out = new Set();

  $("#conScroll .cont_subtit p").each((_, p) => {
    const pText = $(p).text();

    $(p)
      .find("span")
      .each((__, sp) => {
        const t = cleanDepartmentToken($(sp).text());
        if (t && DEPT_SUFFIX_RE.test(t)) out.add(t);
      });

    const bracket = pText.match(/\(([^)]{2,40})\)/g) || [];
    for (const b of bracket) {
      const inner = cleanDepartmentToken(b.replace(/[()]/g, ""));
      if (inner && DEPT_SUFFIX_RE.test(inner)) out.add(inner);
    }

    const direct = pText.match(DEPT_PATTERN) || [];
    for (const m of direct) {
      const dept = cleanDepartmentToken(m);
      if (dept) out.add(dept);
    }
  });

  return Array.from(out);
}

function buildAliasMap(departments) {
  const aliases = {};
  for (const dept of departments) {
    aliases[dept] = dept;
    aliases[dept.replace(/고용노동부/g, "")] = dept;
    aliases[dept.replace(/지방고용노동청/g, "")] = dept;
    aliases[dept.replace(/지방고용노동관서/g, "")] = dept;
  }
  return aliases;
}

function sanitizeText(value) {
  return String(value || "")
    .replace(/[\u0000-\u001F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function run(options) {
  const outPath = path.resolve(options.output);
  const rows = [];
  const observed = loadObservedDepartments();
  const departments = new Set();
  const topDepartments = new Set();

  for (const src of LAW_SOURCES) {
    const info = await fetchLawInfo(src.lsiSeq);
    const body = await fetchLawBody(src.lsiSeq, info.efYd);
    const $ = cheerio.load(body);
    const text = $("#conScroll").text() || $("body").text();

    const hits = extractDepartmentCandidates(text);
    hits.forEach((d) => departments.add(d));

    const topHits = extractTopBannerDepartments(body);
    topHits.forEach((d) => topDepartments.add(d));

    rows.push({
      ...src,
      name: sanitizeText(src.name),
      infoUrl: info.infoUrl,
      effectiveDate: info.efYd || null,
      extractedCount: hits.length,
      topDepartmentCount: topHits.length,
      topDepartments: topHits.sort((a, b) => a.localeCompare(b, "ko")),
    });
  }

  const sortedDepartments = Array.from(departments)
    .filter((x) => isDepartmentLike(x, observed))
    .map((x) => sanitizeText(x))
    .sort((a, b) => a.localeCompare(b, "ko"));

  const sortedTopDepartments = Array.from(topDepartments)
    .filter((x) => isDepartmentLike(x, observed))
    .map((x) => sanitizeText(x))
    .sort((a, b) => a.localeCompare(b, "ko"));

  const aliasSeed = Array.from(new Set([...sortedDepartments, ...sortedTopDepartments]));

  const payload = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: "law.go.kr",
      lawCount: rows.length,
      departmentCount: sortedDepartments.length,
      topDepartmentCount: sortedTopDepartments.length,
      references: rows,
    },
    departments: sortedDepartments,
    topDepartments: sortedTopDepartments,
    aliases: buildAliasMap(aliasSeed),
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");

  console.log(`Saved: ${outPath}`);
  console.log(`Departments: ${sortedDepartments.length}`);
  console.log(`Top banner departments: ${sortedTopDepartments.length}`);
}

const program = new Command();
program.option("--output <path>", "output json path", "data/moel_legal_departments.json");
program.parse(process.argv);

run(program.opts()).catch((err) => {
  console.error("Build legal departments failed:", err.message);
  process.exit(1);
});
