// Llenar el carrito con los productos desde el API o el HTML
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();  
});



function loadProducts() {
    fetch('https://pinicrochet.netlify.app/store.html')  
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <p>${product.name}</p>
                    <p>Precio: $${product.price}</p>
                    <button class="add-to-cart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}">Agregar al carrito</button>
                `;
                document.getElementById('mi-carrito').appendChild(productCard);
            });

            // Agregar funcionalidad para cada botón "Agregar al carrito"
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productId = event.target.getAttribute('data-product-id');
                    const productName = event.target.getAttribute('data-product-name');
                    const productPrice = parseFloat(event.target.getAttribute('data-product-price'));

                    addToCart(productId, productName, productPrice);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Función para agregar un producto al carrito
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === id);

    if (productIndex !== -1) {
         cart[productIndex].quantity += 1;
    } else {
         cart.push({ id, name, price, quantity: 1 });
    }

   
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();  
}

//Actualizar el contador de productos en el carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, product) => acc + product.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Mostrar los productos en el carrito
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        cart.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-product');
            productElement.innerHTML = `
                <p>${product.name} - $${product.price} x ${product.quantity}</p>
                <button class="remove-from-cart" data-product-id="${product.id}">Eliminar</button>
            `;
            cartItemsList.appendChild(productElement);
        });
    }

    updateCartCount();
}

// Eliminar un producto del carrito
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-product-id');
        removeFromCart(productId);
    }
});

// eliminar un producto del carrito
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== id);  
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();  
}


const cartIcon = document.getElementById('cart-icon');
const cartList = document.getElementById('cart-list');
const closeList = document.querySelector('.close-btn');


cartIcon.addEventListener('click', () => {
    cartList.style.display = 'block';
    displayCart();  
});


closeList.addEventListener('click', () => {
    cartList.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === cartList) {
        cartList.style.display = 'none';
    }
});

// Modal de compra
const buyButton = document.querySelector('.buy-btn');  
const purchaseModal = document.getElementById('purchase-modal');  
const closeModal = document.querySelector('.close-btn');  
const addToCartBtn = document.getElementById('add-to-cart-btn');  
const productQuantityInput = document.getElementById('product-quantity');  


buyButton.addEventListener('click', () => {
    purchaseModal.style.display = 'block';
});


closeModal.addEventListener('click', () => {
    purchaseModal.style.display = 'none';
});

// Cerrar el modal si el usuario hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === purchaseModal) {
        purchaseModal.style.display = 'none';
    }
});

// Agregar producto al carrito con la cantidad seleccionada en el modal
addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(productQuantityInput.value);  
    if (quantity > 0) {
        const product = {
            id: 1,  
            name: 'Llama Manta Apego',
            price: 15000,
            quantity: quantity
        }; //--> continuar cargando los productos

        // Agregar el producto al carrito 
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += quantity;  
        } else {
            cart.push(product);  
        }

        localStorage.setItem('cart', JSON.stringify(cart));  

        
        purchaseModal.style.display = 'none';

        
        updateCartCount();
    }
});





updateCartCount();
