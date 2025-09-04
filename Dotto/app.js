// app.js

// ====== 설정 ======
const API_BASE = "http://localhost:8080"; // Spring Boot 주소/포트

// ====== 엘리먼트 ======
const btn = document.querySelector("#countbtn");
const countEl = document.querySelector("#countNum");
const dottoImg = document.querySelector("#dotto");

// ====== 상태 ======
const LS_KEY = "dotto-count";
let localCount = Number(localStorage.getItem(LS_KEY) || 0);

// 서버 총합을 화면에 표시할지 여부 (true 권장)
const SHOW_SERVER_TOTAL = true;

// ====== 유틸 ======
function setMouth(open) {
    dottoImg.src = open ? "dotto_nuki2.png" : "dotto_nuki.png";
}
function setCountDisplay(n) {
    countEl.textContent = String(n);
}

// ====== 서버 동기화 ======
async function fetchTotal() {
    try {
        const res = await fetch(`${API_BASE}/api/clicks`, { method: "GET" });
        const data = await res.json();
        return Number(data.total || 0);
    } catch {
        return null; // 네트워크 실패 시 null
    }
}

async function incrementOnServer() {
    const res = await fetch(`${API_BASE}/api/clicks/increment`, {
        method: "POST",
        // body 없음 → preflight(OPTIONS) 없이 간단 요청
        // 필요시 keepalive: true,
    });
    const data = await res.json();
    return Number(data.total || 0);
}

// ====== 초기화: 서버 총합 동기화(가능하면 서버, 아니면 로컬) ======
(async function init() {
    const serverTotal = await fetchTotal();
    if (SHOW_SERVER_TOTAL && serverTotal !== null) {
        setCountDisplay(serverTotal);
    } else {
        // 서버가 안 될 때는 로컬 표시
        setCountDisplay(localCount);
    }
})();

// ====== 증가 로직 ======
async function increase() {
    // 즉각적인 피드백: 로컬 먼저 증가
    localCount += 1;
    if (!SHOW_SERVER_TOTAL) setCountDisplay(localCount);
    localStorage.setItem(LS_KEY, String(localCount));

    // 서버 증가 시도
    try {
        const serverTotal = await incrementOnServer();
        if (SHOW_SERVER_TOTAL) setCountDisplay(serverTotal);
    } catch {
        // 서버 실패 시 화면은 로컬 값 유지
    }
}

// ====== 입력 바인딩 (마우스/키보드/터치) ======
// 마우스
btn.addEventListener("mousedown", () => setMouth(true));
btn.addEventListener("mouseup", () => setMouth(false));
btn.addEventListener("mouseleave", () => setMouth(false));
btn.addEventListener("click", increase);

// 키보드(스페이스/엔터)
window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "Enter") setMouth(true);
});
window.addEventListener("keyup", (e) => {
    if (e.code === "Space" || e.code === "Enter") {
        setMouth(false);
        increase();
    }
});

// 터치(모바일)
btn.addEventListener("touchstart", () => setMouth(true), { passive: true });
btn.addEventListener("touchend", () => { setMouth(false); increase(); }, { passive: true });

// 탭 전환 복귀 시 상태 보정
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") setMouth(false);
});