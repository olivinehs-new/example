const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const { Command } = require("commander");
const { normalizeText } = require("./text-utils");

const BASE = "https://www.moel.go.kr";
const LIST_URL = `${BASE}/news/enews/report/enewsList.do`;
const VIEW_URL = `${BASE}/news/enews/report/enewsView.do?news_seq=`;

const ARTICLE_SELECTORS = [
  "#contents .board_view",
  ".board_view",
  ".bbs_view",
  ".view_cont",
  ".news_view",
  ".article",
];

function isGenericTitle(title) {
  const t = normalizeText(title);
  return !t || /^보도(?:참고)?자료$/.test(t);
}

function parseDate(text) {
  const match = String(text || "").match(/(20\d{2})[.\-/](\d{1,2})[.\-/](\d{1,2})/);
  if (!match) return null;
  const [, yyyy, mm, dd] = match;
  return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
}

function cleanupDepartment(raw) {
  if (!raw) return null;
  let v = raw
    .replace(/\(.*?\)/g, " ")
    .replace(/[|]/g, " ")
    .replace(/[0-9]{2,4}-[0-9]{3,4}-[0-9]{4}/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const hits =
    v.match(
      /[가-힣A-Za-z0-9·\s]{3,40}?(?:담당관|정책관|지원단|상황실|센터|위원회|사무국|본부|과|국|팀)/g,
    ) || [];
  if (!hits.length) return null;
  hits.sort((a, b) => b.length - a.length);
  const primary = hits[0].trim();
  const compactHits =
    primary.match(
      /[가-힣A-Za-z0-9·]+(?:담당관|정책관|지원단|상황실|센터|위원회|사무국|본부|과|국|팀)/g,
    ) || [];
  if (compactHits.length) {
    compactHits.sort((a, b) => b.length - a.length);
    return compactHits[0];
  }
  return primary;
}

function extractDepartment(text) {
  const normalized = String(text || "").replace(/\s+/g, " ");
  const patterns = [
    /담당\s*부서\s*[:：]?\s*([^\n\r]{2,80})/i,
    /문\s*의\s*[:：]?\s*([^\n\r]{2,80})/i,
    /소관\s*부서\s*[:：]?\s*([^\n\r]{2,80})/i,
  ];
  for (const pattern of patterns) {
    const m = normalized.match(pattern);
    if (m) {
      const dept = cleanupDepartment(m[1]);
      if (dept) return dept;
    }
  }
  const parenHits = normalized.match(/\(([가-힣A-Za-z0-9·\s]+?(?:과|국|관|팀|담당관|정책관|센터))\)/g) || [];
  for (const ph of parenHits) {
    const dept = cleanupDepartment(ph);
    if (dept) return dept;
  }
  return null;
}

function pickMainContent($) {
  let best = "";
  for (const selector of ARTICLE_SELECTORS) {
    const text = normalizeText($(selector).text());
    if (text.length > best.length) {
      best = text;
    }
  }
  if (best.length > 120) return best;
  return normalizeText($("#contents").text() || $("body").text());
}

function decodeHtml(buffer, contentType = "") {
  const ctype = String(contentType || "").toLowerCase();
  let charset = "utf-8";
  const charsetHit = ctype.match(/charset=([a-z0-9\-_]+)/i);
  if (charsetHit) {
    charset = charsetHit[1].toLowerCase();
  } else {
    const ascii = Buffer.from(buffer).toString("latin1");
    const metaHit = ascii.match(/charset\s*=\s*["']?([a-z0-9\-_]+)/i);
    if (metaHit) charset = metaHit[1].toLowerCase();
  }
  if (charset.includes("ks_c_5601") || charset.includes("euc-kr")) {
    return iconv.decode(Buffer.from(buffer), "euc-kr");
  }
  return iconv.decode(Buffer.from(buffer), "utf-8");
}

async function withRetry(task, attempts = 4) {
  let lastErr = null;
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await task();
    } catch (err) {
      lastErr = err;
      const wait = 300 * (i + 1);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function fetchListPage(pageIndex) {
  const response = await withRetry(() =>
    axios.get(LIST_URL, {
      params: { pageIndex },
      responseType: "arraybuffer",
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml",
      },
    }),
  );

  const html = decodeHtml(response.data, response.headers["content-type"]);
  const $ = cheerio.load(html);
  const items = [];
  const seen = new Set();

  $("a[href*='enewsView.do?news_seq=']").each((_, el) => {
    const href = $(el).attr("href") || "";
    const hit = href.match(/news_seq=(\d+)/);
    if (!hit) return;
    const newsSeq = hit[1];
    if (seen.has(newsSeq)) return;
    seen.add(newsSeq);

    const row = $(el).closest("tr");
    const rowText = normalizeText(row.text());
    let title = normalizeText($(el).text());
    if (isGenericTitle(title)) {
      const candidates = row
        .find("td")
        .toArray()
        .map((td) => normalizeText($(td).text()))
        .filter((x) => x && !parseDate(x) && !isGenericTitle(x));
      candidates.sort((a, b) => b.length - a.length);
      title = candidates[0] || title;
    }
    const date = parseDate(rowText);
    if (!title) return;

    items.push({
      newsSeq,
      title,
      date,
      url: `${BASE}${href.startsWith("/") ? href : `/${href}`}`,
    });
  });

  $("a[onclick*='news_seq']").each((_, el) => {
    const onclick = $(el).attr("onclick") || "";
    const hit = onclick.match(/news_seq[=:'",\s]+(\d+)/);
    if (!hit) return;
    const newsSeq = hit[1];
    if (seen.has(newsSeq)) return;
    seen.add(newsSeq);

    const row = $(el).closest("tr");
    const rowText = normalizeText(row.text());
    let title = normalizeText($(el).text());
    if (isGenericTitle(title)) {
      const candidates = row
        .find("td")
        .toArray()
        .map((td) => normalizeText($(td).text()))
        .filter((x) => x && !parseDate(x) && !isGenericTitle(x));
      candidates.sort((a, b) => b.length - a.length);
      title = candidates[0] || title;
    }
    const date = parseDate(rowText);
    if (!title) return;

    items.push({
      newsSeq,
      title,
      date,
      url: `${VIEW_URL}${newsSeq}`,
    });
  });

  return items;
}

async function fetchDetail(newsSeq) {
  const url = `${VIEW_URL}${newsSeq}`;
  const response = await withRetry(() =>
    axios.get(url, {
      responseType: "arraybuffer",
      timeout: 20000,
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "text/html,application/xhtml+xml",
      },
    }),
  );

  const html = decodeHtml(response.data, response.headers["content-type"]);
  const $ = cheerio.load(html);
  const ogTitle = normalizeText($("meta[property='og:title']").attr("content"));
  const h3Title = normalizeText($("h3").first().text());
  const pageTitle = normalizeText($("title").text()).replace(/\s*-\s*고용노동부\s*$/, "");
  let title = ogTitle || h3Title || pageTitle;
  if (isGenericTitle(title)) {
    title = "";
  }

  const content = pickMainContent($);
  const wholeText = normalizeText($("body").text());

  const date =
    parseDate(wholeText) ||
    parseDate(content) ||
    parseDate(title);

  const department = extractDepartment(content) || extractDepartment(wholeText);

  return {
    newsSeq: String(newsSeq),
    title,
    date,
    department: department || "미상",
    content,
    url,
    crawledAt: new Date().toISOString(),
  };
}

async function mapLimit(list, limit, worker) {
  const result = new Array(list.length);
  let idx = 0;
  let active = 0;
  return new Promise((resolve) => {
    const run = () => {
      while (active < limit && idx < list.length) {
        const current = idx;
        idx += 1;
        active += 1;
        worker(list[current])
          .then((res) => {
            result[current] = res;
          })
          .catch(() => {
            result[current] = null;
          })
          .finally(() => {
            active -= 1;
            if (idx >= list.length && active === 0) {
              resolve(result.filter(Boolean));
              return;
            }
            run();
          });
      }
    };
    run();
  });
}

function toCsv(rows) {
  const header = ["newsSeq", "date", "department", "title", "content", "url"];
  const escaped = rows.map((row) =>
    header
      .map((k) => `"${String(row[k] || "").replace(/"/g, '""')}"`)
      .join(","),
  );
  return [header.join(","), ...escaped].join("\n");
}

async function run(options) {
  const years = Number(options.years || 3);
  const maxPages = Number(options.maxPages || 500);
  const outPath = path.resolve(options.out || "data/moel_press_releases_3y.json");
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - years);
  const cutoffYmd = cutoff.toISOString().slice(0, 10);

  const metas = [];
  let oldPageStreak = 0;
  for (let page = 1; page <= maxPages; page += 1) {
    const pageItems = await fetchListPage(page);
    if (!pageItems.length) break;

    let thisPageHasRecent = false;
    for (const item of pageItems) {
      if (!item.date || item.date >= cutoffYmd) {
        metas.push(item);
        thisPageHasRecent = true;
      }
    }

    if (thisPageHasRecent) {
      oldPageStreak = 0;
    } else {
      oldPageStreak += 1;
      if (oldPageStreak >= 3) break;
    }
  }

  const dedup = Array.from(
    new Map(metas.map((m) => [m.newsSeq, m])).values(),
  );
  const details = await mapLimit(dedup, 5, async (meta) => {
    const item = await fetchDetail(meta.newsSeq);
    if (item.date && item.date < cutoffYmd) return null;
    return {
      ...meta,
      ...item,
      title: !isGenericTitle(item.title) ? item.title : meta.title,
      date: item.date || meta.date,
      department: item.department || "미상",
    };
  });

  details.sort((a, b) => (a.date < b.date ? 1 : -1));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(details, null, 2), "utf8");
  fs.writeFileSync(outPath.replace(/\.json$/i, ".csv"), toCsv(details), "utf8");

  const byDept = {};
  for (const d of details) {
    byDept[d.department] = (byDept[d.department] || 0) + 1;
  }
  const topDept = Object.entries(byDept)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  console.log(`Saved: ${outPath}`);
  console.log(`Rows: ${details.length} | cutoff: ${cutoffYmd}`);
  console.log("Top departments:", topDept);
}

const program = new Command();
program
  .option("--years <number>", "최근 n년 데이터 수집", "3")
  .option("--maxPages <number>", "최대 목록 페이지 수", "500")
  .option("--out <path>", "출력 JSON 경로", "data/moel_press_releases_3y.json");

program.parse(process.argv);
run(program.opts()).catch((err) => {
  console.error("Scraping failed:", err.message);
  process.exit(1);
});
