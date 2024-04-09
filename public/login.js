function login() {
    event.preventDefault();
    const nameEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");

    if (passwordEl.value === ""){
        alert("Please enter your password");
        return;
    }

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: nameEl.value,
            password: passwordEl.value,
        }),
    })
    .then((response) => {
        if (response.status === 200) {
            // redirect to the home page
            window.location.href = "home.html";
            return response.json();
        } else {
            alert("Invalid email or password");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
  }

function register() {
    event.preventDefault();
    const nameEl = document.querySelector("#email");
    const passwordEl = document.querySelector("#password");

    if (passwordEl.value === ""){
        alert("Please enter your password");
        return;
    }

    fetch("/api/auth/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: nameEl.value,
            password: passwordEl.value,
        }),
    })
    .then((response) => {
        if (response.status === 200) {
            // redirect to the home page
            window.location.href = "home.html";
            return response.json();
        } else {
            alert("Invalid email or password");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}