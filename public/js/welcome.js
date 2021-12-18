const req = new XMLHttpRequest();
req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
        const user = JSON.parse(req.response).user;
        document.getElementById("userMenuBtn").innerText = `${user.username}`+<i class="bi bi-person-circle"></i>;
    }
}