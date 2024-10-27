
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');


function updateCartUI() {
    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} - $${item.price} (x${item.quantity})`;
        cartItemsElement.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2);
    cartCountElement.innerText = cart.length;
}


function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}


document.getElementById('empty-cart').addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
});


document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    const form = `
        <h2>Datos de Compra</h2>
        <label>Nombre:</label><input type="text" id="name"><br>
        <label>Dirección:</label><input type="text" id="address"><br>
        <label>Método de Pago:</label>
        <select id="payment-method">
            <option value="tarjeta">Tarjeta de Crédito</option>
            <option value="paypal">PayPal</option>
        </select><br><br>
        <button id="confirm-purchase">Confirmar Compra</button>
    `;
    
    cartItemsElement.innerHTML = form;
    document.getElementById('confirm-purchase').addEventListener('click', completePurchase);
});


function completePurchase() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (!name || !address || !paymentMethod) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    alert(`Gracias por tu compra, ${name}! El total es de $${cartTotalElement.innerText}. Tu pedido será enviado a ${address}.`);
    localStorage.removeItem('cart');
    cart = [];
    updateCartUI();
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            id: productElement.dataset.id,
            name: productElement.dataset.name,
            price: parseFloat(productElement.dataset.price),
        };
        addToCart(product);
    });
});


updateCartUI();
