const STOPWORDS = new Set([
  "고용노동부",
  "노동부",
  "정부",
  "관련",
  "이번",
  "이번에",
  "통해",
  "위해",
  "대한",
  "및",
  "등",
  "수",
  "것",
  "있는",
  "있다",
  "했다",
  "한다",
  "한다고",
  "에서",
  "으로",
  "하고",
  "대한",
  "보도자료",
  "참고",
  "배포",
  "즉시",
  "기자",
  "설명",
  "담당",
  "문의",
]);

function normalizeText(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeWords(text) {
  const normalized = normalizeText(text).toLowerCase();
  return normalized.match(/[가-힣a-z0-9]+/g) || [];
}

function ngrams(token, min = 2, max = 4) {
  const grams = [];
  for (let n = min; n <= max; n += 1) {
    if (token.length < n) continue;
    for (let i = 0; i <= token.length - n; i += 1) {
      grams.push(token.slice(i, i + n));
    }
  }
  return grams;
}

function extractFeatures(text) {
  const tf = new Map();
  const words = tokenizeWords(text);
  for (const word of words) {
    if (word.length < 2) continue;
    const wordKey = `w:${word}`;
    tf.set(wordKey, (tf.get(wordKey) || 0) + 1);
    for (const gram of ngrams(word)) {
      const gramKey = `c:${gram}`;
      tf.set(gramKey, (tf.get(gramKey) || 0) + 1);
    }
  }
  return tf;
}

function buildIdf(documents, minDf = 2, maxFeatures = 50000) {
  const df = new Map();
  const N = documents.length;
  for (const doc of documents) {
    const seen = new Set();
    for (const [term] of extractFeatures(doc)) {
      if (seen.has(term)) continue;
      seen.add(term);
      df.set(term, (df.get(term) || 0) + 1);
    }
  }

  const scored = [];
  for (const [term, freq] of df.entries()) {
    if (freq < minDf) continue;
    if (freq / N > 0.85) continue;
    const idf = Math.log((1 + N) / (1 + freq)) + 1;
    scored.push({ term, idf, freq });
  }
  scored.sort((a, b) => b.freq - a.freq || b.idf - a.idf);
  return Object.fromEntries(
    scored.slice(0, maxFeatures).map((x) => [x.term, x.idf]),
  );
}

function vectorize(text, idfDict) {
  const tf = extractFeatures(text);
  const vec = {};
  let normSq = 0;
  for (const [term, count] of tf.entries()) {
    const idf = idfDict[term];
    if (!idf) continue;
    const weight = (1 + Math.log(count)) * idf;
    vec[term] = weight;
    normSq += weight * weight;
  }
  const norm = Math.sqrt(normSq) || 1;
  for (const term of Object.keys(vec)) {
    vec[term] = vec[term] / norm;
  }
  return vec;
}

function cosineSparse(a, b) {
  let dot = 0;
  const [small, large] =
    Object.keys(a).length < Object.keys(b).length ? [a, b] : [b, a];
  for (const key of Object.keys(small)) {
    if (large[key]) {
      dot += small[key] * large[key];
    }
  }
  return dot;
}

function meanVectors(vectors) {
  const acc = {};
  for (const vec of vectors) {
    for (const [key, value] of Object.entries(vec)) {
      acc[key] = (acc[key] || 0) + value;
    }
  }
  const divisor = Math.max(vectors.length, 1);
  let normSq = 0;
  for (const key of Object.keys(acc)) {
    acc[key] = acc[key] / divisor;
    normSq += acc[key] * acc[key];
  }
  const norm = Math.sqrt(normSq) || 1;
  for (const key of Object.keys(acc)) {
    acc[key] = acc[key] / norm;
  }
  return acc;
}

function topKeywords(text, idfDict, topN = 8) {
  const words = tokenizeWords(text).filter(
    (w) => w.length >= 2 && !STOPWORDS.has(w),
  );
  const tf = new Map();
  for (const w of words) {
    tf.set(w, (tf.get(w) || 0) + 1);
  }
  const scored = [];
  for (const [word, count] of tf.entries()) {
    const idf = idfDict[`w:${word}`] || 1;
    const score = count * idf;
    scored.push([word, score]);
  }
  scored.sort((a, b) => b[1] - a[1]);
  return scored.slice(0, topN).map(([word]) => word);
}

function clipVector(vec, topN = 250) {
  const entries = Object.entries(vec);
  entries.sort((a, b) => b[1] - a[1]);
  return Object.fromEntries(entries.slice(0, topN));
}

module.exports = {
  normalizeText,
  buildIdf,
  vectorize,
  cosineSparse,
  meanVectors,
  topKeywords,
  clipVector,
};
