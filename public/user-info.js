var username = localStorage.getItem("userName");

var userNameSpan = document.getElementById("userName");

if (username) {
    userNameSpan.textContent = username;
}

function showPersonalInformation() {
    // Retrieve personal information from local storage
    const name = localStorage.getItem("name") || "John";
    const username = localStorage.getItem("userName") || "";
    const address = localStorage.getItem("address") || "1238 N 1234 W, Salt Lake City, UT 84123";
    const phoneNumber = localStorage.getItem("phoneNumber") || "123-456-7890";

    // Update account content with personal information form
    document.getElementById("accountContent").innerHTML = `
        <h1>Personal Information</h1>
        <div class="form-group-js">
        <label for="name">Name:</label>
            <input type="text" id="name" value="${name}" class="input-btn"><br>
        </div>
        <div class="form-group-js">
            <label for="username">Username:</label>
            <input type="text" id="username" value="${username}" class="input-btn"><br>
        </div>
        <div class="form-group-js">
            <label for="address">Address:</label>
            <input type="text" id="address" value="${address}" class="input-btn"><br>
        </div>
        <div class="form-group-js">
            <label for="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" value="${phoneNumber}" class="input-btn"><br>
        </div>
        <div class="form-group-js-input form-group">
            <input type="submit" onclick="savePersonalInformation()" value="Save">
        </div>
    `;
}

function savePersonalInformation() {
    // Get values from input fields
    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const address = document.getElementById("address").value;
    const phoneNumber = document.getElementById("phoneNumber").value;

    // Save personal information to local storage
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
    localStorage.setItem("address", address);
    localStorage.setItem("phoneNumber", phoneNumber);

    alert("Changes to your personal information saved successfully!");
}

// function showOrderHistory() {
//     const personalOrderCount = localStorage.getItem("personalOrderCount") || 0;

//     document.getElementById("accountContent").innerHTML = `
//         <h1>Order History</h1>
//         <p>You have placed ${personalOrderCount} orders.</p>
//     `;
// }

async function showOrderHistory() {
    try {
        // include username in the request
        // const response = await fetch('/api/orders');
        const response = await fetch('/api/user/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                customer: localStorage.getItem('userName'),
            })
        });

        const orders = await response.json();
        console.log(orders);
        let ordersHtml = '';

        for (const [i, order] of orders.entries()) {
            if (i >= 3) break;
            ordersHtml += `
                <div class="order">
                    <h2>Order ${i + 1}</h2>
                    <p>Customer: ${order.customer}</p>
                    <p>Product: ${order.product}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <p>Date: ${new Date(order.timestamp).toLocaleString()}</p>
                </div>
            `;
        }

        document.getElementById("accountContent").innerHTML = `
            <h1>Order History</h1>
            <p>You have placed ${orders.length} orders.</p>
            ${ordersHtml}
        `;
    } catch (error) {
        document.getElementById("accountContent").innerHTML = `
        <h1>Order History</h1>
        <p>You have placed 0 orders.</p>
    `;
        
    }
}
