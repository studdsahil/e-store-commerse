
const addToCartButtons = document.querySelectorAll('.add-to-cart');
// const addToCartButtonsArray = Array.from(addToCartButtons);
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

const cartItems = [];
let cartTotal = 0;

// Function to add item to cart
function addToCart(event) {
  const button = event.target;
  const productId = button.getAttribute('data-product-id');
  const product = {
    id: productId,
    name: button.previousElementSibling.innerText,
    price: parseFloat(button.nextElementSibling.innerText.replace('$', ''))
  };

  // Check if item is already in cart
  const cartItem = cartItems.find(item => item.id === product.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    product.quantity = 1;
    cartItems.push(product);
  }

  // Update cart UI and total
  updateCart();
}

function updateCart() {
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = '';

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - Quantity: ${item.quantity}`;
    cartItemsList.appendChild(li);
  });

  cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  document.getElementById('cart-total').innerText = cartTotal.toFixed(2);
}

// Checkout button click event
document.getElementById('checkout').addEventListener('click', checkout);

// Function to handle checkout process
function checkout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
  } else {
    // Here you can integrate with a payment provider (e.g., Stripe) to handle the payment process
    alert(`Total amount: $${cartTotal.toFixed(2)}\nThank you for your purchase!`);
    cartItems.length = 0;
    updateCart();
  }
}
