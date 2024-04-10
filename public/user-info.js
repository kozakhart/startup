var username = localStorage.getItem("userName");

var userNameSpan = document.getElementById("userName");

if (username) {
    userNameSpan.textContent = username;
}
async function getUser() {
    try {
        const response = await fetch('/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const user = await response.json();
        // Assuming you want to do something with 'user', like logging it or returning it
        console.log(user); // For demonstration
        return user; // Optional: Depends on what you want to do with this data
    } catch (error) {
        console.error('Error fetching user:', error);
    }
}



async function showPersonalInformation() {
    // Retrieve personal information from /users endpoint, returns json object

    const response = await getUser();
    const username = response.email;
    const name = response.name || '';
    const address = response.address || '';
    const phoneNumber = response.phoneNumber || '';

    //const username = localStorage.getItem("userName");
    
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


async function savePersonalInformation() {
    const name = document.getElementById("name").value || '';
    const address = document.getElementById("address").value || '';
    const phoneNumber = document.getElementById("phoneNumber").value || '';

    // Create an object for the body with only non-empty fields
    let body = {};
    if (name) body.name = name;
    if (address) body.address = address;
    if (phoneNumber) body.phoneNumber = phoneNumber;

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body) // Use the dynamically created body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        alert("Changes to your personal information saved successfully!");
    } catch (error) {
        console.error('Error saving personal information:', error);
    }
}


async function showOrderHistory() {
    try {
        // include username in the request
        // const response = await fetch('/orders');
        const response = await fetch('/user/orders', {
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
        // get object id

        for (const [i, order] of orders.entries()) {
            if (i >= 3) break;
            ordersHtml += `
                <div class="order" id="${order._id}">
                    <h2>Order ${order._id}</h2>
                    <p>Customer: ${order.customer}</p>
                    <p>Product: ${order.product}</p>
                    <p>Quantity: ${order.quantity}</p>
                    <button onclick="deleteOrder('${order._id}')">Delete</button>
                </div>
            `;
        }

        document.getElementById("accountContent").innerHTML = `
            <h1>Order History</h1>
            <p>You have placed ${orders.length} orders. Here are your most recent orders.</p>
            ${ordersHtml}
        `;
    } catch (error) {
        document.getElementById("accountContent").innerHTML = `
        <h1>Order History</h1>
        <p>You have placed 0 orders.</p>
    `;
        
    }
}

async function deleteOrder(orderId){
    const response = await fetch('/orders', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({orderId})
    });
    const data = await response.json();
    console.log(data);
    document.getElementById(orderId).remove();
    console.log(orderId)
    alert("Order deleted successfully!");
}
