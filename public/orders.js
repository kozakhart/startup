async function makeOrder() {
  try {
      const response = await fetch('/api/orders', {
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
          throw new Error('Failed to make order');
      }
      updateTotalOrderCount();
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
      const response = await fetch('/api/orders');
      orders = await response.json();
    } catch {
      const ordersText = localStorage.getItem('orders');
      if (ordersText) {
        orders = JSON.parse(ordersText);
      }
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
  
        tableBodyEl.appendChild(rowEl);
      }
    } else {
      tableBodyEl.innerHTML = '<tr><td colSpan=5>No orders yet</td></tr>';
    }
  }
  
  loadOrders();
  
    

