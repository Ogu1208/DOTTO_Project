
const btn = document.querySelector("#countbtn");
const clickCount = document.querySelector("#countNum");
const fill = document.getElementById("fill");
const maxCount = 30000; // 최대 값
let count = parseInt(localStorage.getItem('json')) || 0;


const dotto = $('#dotto');
let isImageNuki = true;

// 포커스 주기
document.body.focus();

function increase() {
    if (count < maxCount) {
        count += 1;
        updateCountDisplay();
        localStorage.setItem('json', JSON.stringify(count));
        //toggleImage();
    }
}


function reset() {
    count = 0;
    updateCountDisplay();
    console.log(count);
    localStorage.setItem('json', '0'); // 로컬 스토리지 값을 0으로 초기화
}

function updateCountDisplay() {
    clickCount.textContent = count;
    const fillPercentage = (count / maxCount) * 100;
    countNum.textContent = `${count} / ${maxCount} 원`; // count 값 / 30,000 형식으로 표시
    fill.style.width = `${fillPercentage}%`;
}



document.querySelector("#resetbtn").addEventListener("click", reset); // 초기화 버튼에 이벤트 핸들러 추가
// 이미지 클릭 이벤트 핸들러 추가
document.getElementById("dotto").addEventListener("click", function () {
    increase();
    toggleImage();
});

// 키보드 입력 이벤트 핸들러 추가
document.body.addEventListener("keydown", function (event) {
    if (count < maxCount) {
        increase();
        toggleImage();
    }
});





// 이미지 전환 함수
//function toggleImage() {
////    $('#dotto').toggle(
////        function () {
////            $('#dotto').attr('src', 'dotto_nuki2.png');
////        },
////        function () {
////            $('#dotto').attr('src', 'dotto_nuki.png');
////        });
//    const dotto = $('#dotto');
//        if (dotto.attr('src') === 'dotto_nuki.png') {
//            dotto.attr('src', 'dotto_nuki2.png');
//        } else {
//            dotto.attr('src', 'dotto_nuki.png');
//        }
//
//}
function toggleImage() {
    if (isImageNuki) {
        dotto.attr('src', 'dotto_nuki2.png');
    } else {
        dotto.attr('src', 'dotto_nuki.png');
    }
    isImageNuki = !isImageNuki;
}



//btn.addEventListener("click", increase);
// 초기 로딩 시 업데이트
updateCountDisplay();


$(function () {
    $('#dotto').toggle(
        function () {
            $('#dotto').attr('src', 'dotto_nuki2.png');
        },
        function () {
            $('#dotto').attr('src', 'dotto_nuki.png');
        });
});

const tooltipIcon = document.querySelector('.tooltip-icon');
const tooltipText = document.querySelector('.tooltip-text');

tooltipIcon.addEventListener('mouseenter', () => {
    tooltipText.style.display = 'block';
});

tooltipIcon.addEventListener('mouseleave', () => {
    tooltipText.style.display = 'none';
});