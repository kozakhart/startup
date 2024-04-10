async function makeOrder() {
  try {
    const response = await fetch('/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer: localStorage.getItem('userName'),
            product: 'Wunderbox',
            quantity: 1
        })
    });

    if (!response.ok) {
      console.error('Failed to make order:', response);
      // To display more detailed error information or response body
      const errorResponse = await response.text(); // or response.json() if the server responds with JSON
      console.error('Error response body:', errorResponse);
    } else {
      // Handle successful order creation
      console.log('Order made successfully');
      // Optionally process and use the response data
      const responseData = await response.json();
      alert("Order made successfully!");
      console.log('Response data:', responseData);
    }
  } catch (error) {
      console.error('Error making order:', error);
  }
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

async function loadOrders() {
    try {
      const response = await fetch('/orders');
      const orders = await response.json();
      displayOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  
    displayOrders(orders);
  }
  
  function displayOrders(orders) {
    const tableBodyEl = document.querySelector('#orders');
  
    if (orders.length) {
      for (const [i, order] of orders.entries()) {
        const positionTdEl = document.createElement('td');
        const customerTdEl = document.createElement('td');
        const productTdEl = document.createElement('td');
        const quantityTdEl = document.createElement('td');
        const dateTdEl = document.createElement('td');
    
        positionTdEl.textContent = i + 1;
        customerTdEl.textContent = order.customer;
        productTdEl.textContent = order.product;
        quantityTdEl.textContent = order.quantity;
        dateTdEl.textContent = order.timestamp;
    
        const rowEl = document.createElement('tr');
        rowEl.appendChild(positionTdEl);
        rowEl.appendChild(customerTdEl);
        rowEl.appendChild(productTdEl);
        rowEl.appendChild(quantityTdEl);
        rowEl.appendChild(dateTdEl);
    
        // Create a new td element for the delete button
        const deleteTdEl = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        // Add a class for styling if needed
        deleteButton.className = 'delete-btn';
        
        // Event listener for the delete button
        deleteButton.addEventListener('click', function() {
            // Remove the row when the button is clicked
            rowEl.remove();
            // Optional: Handle any additional cleanup, such as updating the backend or adjusting row indices
        });
    
        deleteTdEl.appendChild(deleteButton);
        rowEl.appendChild(deleteTdEl);
    
        tableBodyEl.appendChild(rowEl);
    }
    
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=5>No orders yet</td></tr>';
    }
  }
  
  loadOrders();
  
    

