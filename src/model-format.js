function roundWeight(n) {
  return Math.round(n * 10000) / 10000;
}

function buildTermIndex(idfDict) {
  const terms = Object.keys(idfDict);
  const termToId = {};
  const idf = new Array(terms.length);
  for (let i = 0; i < terms.length; i += 1) {
    const t = terms[i];
    termToId[t] = i;
    idf[i] = roundWeight(idfDict[t]);
  }
  return { terms, termToId, idf };
}

function encodeSparseVector(vecObj, termToId) {
  const arr = [];
  for (const [term, w] of Object.entries(vecObj || {})) {
    const id = termToId[term];
    if (id === undefined) continue;
    const rw = roundWeight(w);
    if (!rw) continue;
    arr.push(id, rw);
  }
  return arr;
}

function sparseArrayToMap(arr) {
  const out = {};
  if (!Array.isArray(arr)) return out;
  for (let i = 0; i < arr.length - 1; i += 2) {
    out[arr[i]] = arr[i + 1];
  }
  return out;
}

function cosineQueryMapToSparseArray(queryMap, targetArr) {
  let dot = 0;
  if (!targetArr) return 0;
  for (let i = 0; i < targetArr.length - 1; i += 2) {
    const id = targetArr[i];
    const w = targetArr[i + 1];
    const q = queryMap[id];
    if (q) dot += q * w;
  }
  return dot;
}

module.exports = {
  buildTermIndex,
  encodeSparseVector,
  sparseArrayToMap,
  cosineQueryMapToSparseArray,
};
