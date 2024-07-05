function addToCart(productId) {
    const product = document.getElementById(productId).innerText;
    const price = document.getElementById(`price${productId.slice(-1)}`).innerText.replace('₱', '');
    const quantity = document.getElementById(`qty${productId.slice(-1)}`).value;

    const orderDetails = `${product} - Price: ₱${price} - Quantity: ${quantity}\n`;

    const currentOrders = document.getElementById('carts').value;
    document.getElementById('carts').value = currentOrders + orderDetails;

    // Calculate and update the total price
    calculateTotal();
}

function calculateTotal() {
    let total = 0;
    const carts = document.getElementById('carts').value;
    const lines = carts.split('\n');
    
    lines.forEach(line => {
        const parts = line.split(' - ');
        if(parts.length === 3) {
            const pricePart = parts[1].split(': ')[1].replace('₱', '');
            const quantityPart = parts[2].split(': ')[1];
            const price = parseFloat(pricePart);
            const quantity = parseInt(quantityPart);
            total += price * quantity;
        }
    });

    document.getElementById('total').value = total.toFixed(2);
    calculateChange(); // Calculate change whenever total is calculated
}

function calculateChange() {
    const total = parseFloat(document.getElementById('total').value);
    const cash = parseFloat(document.getElementById('cash').value);

    if (!isNaN(total) && !isNaN(cash) && cash >= total) {
        const change = cash - total;
        document.getElementById('change').value = change.toFixed(2);
    } else {
        document.getElementById('change').value = '';
    }
}

// Add an event listener to recalculate the change whenever cash tendered is entered
document.getElementById('cash').addEventListener('input', calculateChange);
