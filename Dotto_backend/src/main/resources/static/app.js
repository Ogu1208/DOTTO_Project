const btn = document.querySelector("#countbtn");
const clickCount = document.querySelector("#countNum");



console.log(btn);
var count = 0;

function increase() {
 // 로컬 스토리지에서 저장된 값을 불러옴
    var count = parseInt(localStorage.getItem('json')) || 0;

    count = count + 1;
    clickCount.innerText = count;
    localStorage.setItem('json', JSON.stringify(count));

     // 서버로 업데이트된 값을 보내는 AJAX 요청
        fetch("/updateCount?count=" + count, {
            method: "POST"
        });
}




$(function () {
    $('button').toggle(
        function () { //버튼 클릭할때 마다 이미지 바뀜                
            $('#dotto').attr('src', 'dotto_nuki2.png');
        },
        function () {
            $('#dotto').attr('src', 'dotto_nuki.png');
        });
});


btn.addEventListener("click", increase);




