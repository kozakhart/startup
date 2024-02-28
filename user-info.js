var username = localStorage.getItem("userName");

var userNameSpan = document.getElementById("userName");

if (username) {
    userNameSpan.textContent = username;
}