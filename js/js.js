const correctPassword = "34956jdo43";
let wrongCount = 0;

function doCheck() {
    const tipDom = document.getElementById("tip");
    const inputPwd = document.getElementById("pwd").value;

    if (wrongCount >= 3) {
        tipDom.innerText = "你老牧师了";
        return;
    }

    if (inputPwd === correctPassword) {
        window.location.href = "https://lls-aw.github.io/download";
    } else {
        wrongCount++;
        tipDom.innerText = `密码错误，还剩 ${3 - wrongCount} 次机会`;
    }
}
