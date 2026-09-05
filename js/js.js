const correctHash = "3507f0107622741394834906314022304102512340272270302130711000504";
let wrongCount = 0;

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    const hashArray = Array.from(new Uint8Array(buf));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join("");
}

async function checkPassword(inputText) {
    if (wrongCount >= 3) {
        return { ok: false, msg: "已经输错3次，页面已锁定！刷新重置" };
    }
    const inputHash = await sha256(inputText);
    if (inputHash === correctHash) {
        return { ok: true, msg: "密码正确" };
    } else {
        wrongCount++;
        return { ok: false, msg: `密码错误，还剩 ${3 - wrongCount} 次机会` };
    }
}

async function doCheck() {
    const tipDom = document.getElementById("tip");
    const inputPwd = document.getElementById("pwd").value;
    const res = await checkPassword(inputPwd);
    tipDom.innerText = res.msg;
    if (res.ok) {
        window.location.href = "download.html";
    }
}
