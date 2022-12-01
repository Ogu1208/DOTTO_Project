const btn = document.querySelector("#countbtn");
const clickCount = document.querySelector("#countNum");



console.log(btn);
var count = 0;

function increase() {
    count = count + 1;
    clickCount.innerText = count;
    localStorage.setItem('json', JSON.stringify(count));
    JSON.parse(localStorage.getItem('json'));
    
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




