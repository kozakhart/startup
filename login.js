function login() {
    const nameEl = document.querySelector("#username");
    const passwordEl = document.querySelector("#password");
    if (passwordEl.value === ""){
        alert("Please enter your password");
        return;
    }
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "play.html";
  }