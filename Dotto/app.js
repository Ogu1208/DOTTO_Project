
// app.js

// --- 엘리먼트 참조
const btn = document.querySelector("#countbtn");
const countEl = document.querySelector("#countNum");
const dottoImg = document.querySelector("#dotto");

// --- 상수/상태
const LS_KEY = "dotto-count";
let count = Number(localStorage.getItem(LS_KEY) || 0);
countEl.textContent = count;

// --- UI: 입 벌림/닫힘 토글
function setMouth(open) {
    dottoImg.src = open ? "dotto_nuki2.png" : "dotto_nuki.png";
}

// --- 카운트 증가 + 로컬 저장 (+ 추후 서버 동기화 자리)
async function increase() {
    count += 1;
    countEl.textContent = count;
    localStorage.setItem(LS_KEY, String(count));

    // [백엔드 붙인 뒤 활성화 예정]
    // try {
    //   const res = await fetch("/api/clicks/increment", { method: "POST" });
    //   const data = await res.json();
    //   // 서버 총합을 화면에 보여주고 싶다면 아래로 교체
    //   // countEl.textContent = data.total;
    // } catch (e) {
    //   // 네트워크 실패 시에도 로컬 카운트는 유지
    // }
}

// --- 마우스 입력
btn.addEventListener("mousedown", () => setMouth(true));
btn.addEventListener("mouseup", () => setMouth(false));
btn.addEventListener("mouseleave", () => setMouth(false));
btn.addEventListener("click", increase);

// --- 키보드 입력(스페이스/엔터)
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") setMouth(true);
});
window.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        setMouth(false);
        increase();
    }
});

// --- 페이지가 백그라운드로 갔다 돌아올 때 이미지 상태 보정(안전장치)
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") setMouth(false);
});