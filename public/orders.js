function makeOrder() {
    let personalOrderCount = parseInt(localStorage.getItem("personalOrderCount")) || 0;
    personalOrderCount++;
    localStorage.setItem("personalOrderCount", personalOrderCount);
    updateTotalOrderCount();
}
function updateTotalOrderCount() {
    let totalOrderCount = parseInt(localStorage.getItem("totalOrderCount")) || 0;
    totalOrderCount++;
    localStorage.setItem("totalOrderCount", totalOrderCount);
    document.getElementById("totalOrderCount").textContent = totalOrderCount;
}

    document.addEventListener("DOMContentLoaded", function() {
    let totalOrderCount = parseInt(localStorage.getItem("totalOrderCount")) || 0;
    document.getElementById("totalOrderCount").textContent = totalOrderCount;
    
    setInterval(function() {
        if (Math.random() < 0.5) {
            updateTotalOrderCount();
            console.log("Checking for new orders...");
        }
    }, Math.random() * 4999 + 1);
});


    

