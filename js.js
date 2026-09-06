const correctHash = "3507f0107622741394834906314022304102512340272270302130711000504";
let wrongCount = 0;

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    const hashArr = Array.from(new Uint8Array(buf));
    return hashArr.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

async function doCheck() {
    const tipDom = document.getElementById("tip");
    const inputPwd = document.getElementById("pwd").value;

    if(wrongCount >= 3){
        tipDom.innerText = "乐子";
        return;
    }

    const inputHash = await sha256(inputPwd);
    if(inputHash == correctHash){
        localStorage.setItem("Unlock","1");
        window.location.href = "download.html";
    }else{
        wrongCount++;
        tipDom.innerText = `密码错误，还剩 ${3 - wrongCount} 次机会`;
    }
}
