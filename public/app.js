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
    const res = await fetch(`/version.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    const { json } = await readJsonSafely(res);
    if (res.ok && json && json.version) {
      appVersion.textContent = `v${json.version}`;
      return;
    }
    appVersion.textContent = "v-";
  } catch (_) {
    appVersion.textContent = "v-";
  }
}

async function loadMeta() {
  try {
    const res = await fetch("/api/meta");
    const { json, raw } = await readJsonSafely(res);
    if (!json) {
      metaBox.textContent = `meta load failed: JSON이 아닌 응답\nstatus=${res.status}\n${raw.slice(0, 300)}`;
      return;
    }
    metaBox.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    metaBox.textContent = `meta load failed: ${err.message}`;
  }
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
      resultBox.textContent =
        `classify failed: JSON이 아닌 응답\nstatus=${res.status}\n` +
        raw.slice(0, 600);
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

    resultBox.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    resultBox.textContent = `classify failed: ${err.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "분류 실행";
  }
});

loadVersion();
loadMeta();
