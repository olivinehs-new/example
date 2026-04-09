const form = document.getElementById("classifyForm");
const resultBox = document.getElementById("resultBox");
const metaBox = document.getElementById("metaBox");
const submitBtn = document.getElementById("submitBtn");
const appVersion = document.getElementById("appVersion");

async function readJsonSafely(res) {
  const raw = await res.text();
  try {
    return { json: JSON.parse(raw), raw };
  } catch (_) {
    return { json: null, raw };
  }
}

async function loadVersion() {
  if (!appVersion) return;
  try {
    const res = await fetch(`/version.json?t=${Date.now()}`, { cache: "no-store" });
    const { json } = await readJsonSafely(res);
    appVersion.textContent = res.ok && json && json.version ? `v${json.version}` : "v-";
  } catch (_) {
    appVersion.textContent = "v-";
  }
}

async function loadMeta() {
  try {
    const res = await fetch("/api/meta");
    const { json, raw } = await readJsonSafely(res);
    if (!json) {
      metaBox.textContent = `meta load failed: non-JSON response\nstatus=${res.status}\n${raw.slice(0, 300)}`;
      return;
    }
    metaBox.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    metaBox.textContent = `meta load failed: ${err.message}`;
  }
}

function yesNo(value) {
  return value ? "예" : "아니오";
}

function formatClassifyResult(payload) {
  const r = payload?.result || {};
  const likely = Array.isArray(r.likelyDepartments) ? r.likelyDepartments : [];
  const pressMatched = Array.isArray(r.pressMatchedDepartments) ? r.pressMatchedDepartments : [];

  const lines = [];
  if (r.inputSummary) {
    lines.push("[AI 요약]");
    lines.push(`- 요약문: ${r.inputSummary.summaryText || ""}`);
    lines.push(`- 길이: 원문 ${r.inputSummary.originalLength || 0}자 → 요약 ${r.inputSummary.summaryLength || 0}자`);
    lines.push("");
  }

  lines.push("[예측 부서]");
  lines.push(`- 부서: ${r.predictedDepartment || "미상"}`);
  lines.push(`- 신뢰도: ${Number(r.confidence || 0).toFixed(4)}`);

  if (r.predictedDepartmentDetail) {
    lines.push(`- 보도자료 매칭: ${yesNo(r.predictedDepartmentDetail.matchedInPress)}`);
    lines.push(`- 유사 보도자료 상위매칭: ${yesNo(r.predictedDepartmentDetail.matchedInSimilarReferences)}`);
    lines.push(`- 고용노동부 직제 포함: ${yesNo(r.predictedDepartmentDetail.inMoelOrganization)}`);
    lines.push(`- 법령 상단표출 과 포함: ${yesNo(r.predictedDepartmentDetail.inLawTopDepartments)}`);
  }

  lines.push("");
  lines.push("[가능성 높은 부서]");
  if (!likely.length) {
    lines.push("- 없음");
  } else {
    likely.forEach((d, i) => {
      lines.push(
        `${i + 1}. ${d.department} | score=${Number(d.score || 0).toFixed(4)} | 보도자료=${yesNo(d.matchedInPress)} | 직제=${yesNo(d.inMoelOrganization)} | 상단과=${yesNo(d.inLawTopDepartments)}`,
      );
    });
  }

  lines.push("");
  lines.push("[보도자료 직접 매칭 부서(유사문서 기준)]");
  if (!pressMatched.length) {
    lines.push("- 없음");
  } else {
    pressMatched.forEach((d, i) => {
      lines.push(`${i + 1}. ${d.department} | 매칭건수=${d.matchedCount} | 최대유사도=${Number(d.maxSimilarity || 0).toFixed(4)}`);
    });
  }

  lines.push("\n[RAW JSON]");
  lines.push(JSON.stringify(payload, null, 2));
  return lines.join("\n");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "분류 중...";
  resultBox.textContent = "요청 처리 중...";

  try {
    const text = String(form.text.value || "").trim();
    const topk = Number(form.topk.value || 5);
    const topics = Number(form.topics.value || 6);

    if (!text) {
      resultBox.textContent = "입력 텍스트가 비어 있습니다.";
      return;
    }

    const res = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, topk, topics }),
    });

    const { json, raw } = await readJsonSafely(res);

    if (!json) {
      resultBox.textContent = `classify failed: non-JSON response\nstatus=${res.status}\n${raw.slice(0, 600)}`;
      return;
    }

    if (!res.ok) {
      resultBox.textContent = JSON.stringify(
        { error: json.error || "요청 실패", status: res.status, body: json },
        null,
        2,
      );
      return;
    }

    resultBox.textContent = formatClassifyResult(json);
  } catch (err) {
    resultBox.textContent = `classify failed: ${err.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "분류 실행";
  }
});

loadVersion();
loadMeta();
