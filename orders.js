function makeOrder() {
    let orderCount = parseInt(localStorage.getItem("orderCount")) || 0;
    orderCount++;
    localStorage.setItem("orderCount", orderCount);
    document.getElementById("orderCount").textContent = orderCount;
}
    document.addEventListener("DOMContentLoaded", function() {
    let orderCount = parseInt(localStorage.getItem("orderCount")) || 0;
    document.getElementById("orderCount").textContent = orderCount;
});