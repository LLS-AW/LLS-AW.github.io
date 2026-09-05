const correctHash = "27944707868173224164214102071131104031107304370430842014342011080";
let wrongCount = 0;

async function sha256(str) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).join("");
}

async function checkPassword(inputText) {
    if (wrongCount >= 3) {
        return { ok: false, msg: "东子" };
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
        window.location.href = "https://lls-aw.github.io/download";
    }
}
