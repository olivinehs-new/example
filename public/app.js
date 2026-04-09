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

function formatClassifyResult(payload) {
  const r = payload?.result || {};
  const summary = r.inputSummary || {};
  const ranked = (Array.isArray(r.likelyDepartments) ? [...r.likelyDepartments] : [])
    .sort((a, b) => Number(b.score || 0) - Number(a.score || 0));

  const lines = [];
  lines.push("[AI요약]");
  lines.push(summary.summaryText || "요약 정보가 없습니다.");
  lines.push("");

  lines.push("[부서 순위]");
  if (!ranked.length) {
    lines.push("- 없음");
  } else {
    ranked.forEach((d, i) => {
      lines.push(`${i + 1}. ${d.department || "미상"} | score=${Number(d.score || 0).toFixed(4)}`);
    });
  }

  return lines.join("\n");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "분류 중...";
  resultBox.textContent = "요청 처리 중...";

  try {
    const text = String(form.text.value || "").trim();
    if (!text) {
      resultBox.textContent = "입력 텍스트가 비어 있습니다.";
      return;
    }

    const res = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
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
