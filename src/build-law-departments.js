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

function loadObservedDepartments() {
  const file = path.resolve("data/moel_press_releases_3y.json");
  if (!fs.existsSync(file)) return new Set();
  const raw = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
  const rows = JSON.parse(raw);
  const set = new Set();
  for (const row of rows) {
    const src = String(row.department || "");
    const m =
      src.match(
        /[가-힣A-Za-z0-9·ㆍ]+(?:담당관|정책관|정책단|지원단|상황실|센터|사무국|본부|실|국|과|팀)/g,
      ) || [];
    for (const x of m) set.add(x.replace(/\s+/g, ""));
  }
  return set;
}

function detectAndDecode(buffer, contentType = "") {
  const ctype = String(contentType || "").toLowerCase();
  const m = ctype.match(/charset=([a-z0-9\-_]+)/i);
  const charset = m ? m[1].toLowerCase() : "";
  if (charset.includes("euc-kr") || charset.includes("ks_c_5601")) {
    return iconv.decode(buffer, "euc-kr");
  }
  return iconv.decode(buffer, "utf-8");
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

function extractDepartmentCandidates(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ");
  const re =
    /[가-힣A-Za-z0-9·ㆍ]{2,40}(?:담당관|정책관|정책단|지원단|상황실|센터|위원회|사무국|본부|실|국|과|팀)/g;
  const hits = cleaned.match(re) || [];
  const skipWords = [
    "고용노동부",
    "정부조직법",
    "고용노동부와그소속기관직제",
    "제1조",
    "제2조",
    "부칙",
    "별표",
    "별지",
    "위원회상임위원",
  ];

  const set = new Set();
  for (const raw of hits) {
    const parts = raw.split(/[ㆍ·,]/g).map((x) => x.trim());
    for (const part of parts) {
      const dept = part.replace(/\s+/g, "");
      if (dept.length < 3 || dept.length > 20) continue;
      if (skipWords.some((w) => dept.includes(w))) continue;
      if (/^제\d+조/.test(dept)) continue;
      if (/^\d+/.test(dept)) continue;
      if (/[0-9]명과$/.test(dept)) continue;
      if (/결과$/.test(dept)) continue;
      if (/사항과$/.test(dept)) continue;
      if (!/[가-힣]/.test(dept)) continue;
      set.add(dept);
    }
  }
  return Array.from(set);
}

function isDepartmentLike(name, observedSet) {
  const dept = String(name || "");
  const strictSuffix = /(담당관|정책관|정책단|지원단|센터|사무국|과|팀)$/;
  if (!strictSuffix.test(dept)) return false;
  if (observedSet.has(dept)) return true;
  const banned = [
    "장관",
    "차관",
    "정부",
    "대통령",
    "국회",
    "법원",
    "법무부",
    "교육부",
    "기획재정부",
    "국무",
    "위원회",
    "계획",
    "개정",
  ];
  if (banned.some((x) => dept.includes(x))) return false;
  return dept.length >= 3 && dept.length <= 15;
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

async function run(options) {
  const outPath = path.resolve(options.output);
  const rows = [];
  const observed = loadObservedDepartments();
  const departments = new Set();

  for (const src of LAW_SOURCES) {
    const info = await fetchLawInfo(src.lsiSeq);
    const body = await fetchLawBody(src.lsiSeq, info.efYd);
    const $ = cheerio.load(body);
    const text = $("#conScroll").text() || $("body").text();
    const hits = extractDepartmentCandidates(text);
    hits.forEach((d) => departments.add(d));
    rows.push({
      ...src,
      infoUrl: info.infoUrl,
      effectiveDate: info.efYd || null,
      extractedCount: hits.length,
    });
  }

  const sorted = Array.from(departments)
    .filter((x) => isDepartmentLike(x, observed))
    .sort((a, b) => a.localeCompare(b, "ko"));
  const payload = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: "law.go.kr",
      lawCount: rows.length,
      departmentCount: sorted.length,
      references: rows,
    },
    departments: sorted,
    aliases: buildAliasMap(sorted),
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Saved: ${outPath}`);
  console.log(`Departments: ${sorted.length}`);
  console.log(`Sample: ${sorted.slice(0, 20).join(", ")}`);
}

const program = new Command();
program.option("--output <path>", "output json path", "data/moel_legal_departments.json");
program.parse(process.argv);

run(program.opts()).catch((err) => {
  console.error("Build legal departments failed:", err.message);
  process.exit(1);
});
