const form = document.getElementById("classifyForm");
const resultBox = document.getElementById("resultBox");
const metaBox = document.getElementById("metaBox");
const submitBtn = document.getElementById("submitBtn");

async function loadMeta() {
  try {
    const res = await fetch("/api/meta");
    const json = await res.json();
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
    const fd = new FormData(form);
    const res = await fetch("/api/classify", { method: "POST", body: fd });
    const json = await res.json();
    resultBox.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    resultBox.textContent = `classify failed: ${err.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "분류 실행";
  }
});

loadMeta();
