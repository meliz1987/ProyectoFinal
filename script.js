document.addEventListener('DOMContentLoaded', () => {
    const carrito = []; 
    const productos = document.querySelectorAll('.product');
    const cartCount = document.getElementById('cart-count');

    
    let seccionCarrito = document.getElementById('mi-carrito');
    if (!seccionCarrito) {
        seccionCarrito = document.createElement('section');
        seccionCarrito.id = 'mi-carrito';
        document.body.appendChild(seccionCarrito); // Añádelo al final del body
    }

    
    function actualizarContador() {
        cartCount.textContent = carrito.length;
    }

    
    function renderizarCarrito() {
        seccionCarrito.innerHTML = `
            <h3>Mi Carrito</h3>
            <ul>
                ${carrito.map(item => `<li>${item.nombre} - $${item.precio}</li>`).join('')}
            </ul>
            <p>Total productos: ${carrito.length}</p>
            <p>Total precio: $${carrito.reduce((total, item) => total + item.precio, 0)}</p>
        `;
        actualizarContador();
    }

    // Agregar un producto al carrito
    function agregarAlCarrito(producto) {
        carrito.push(producto); 
        renderizarCarrito();   
    }

   
    productos.forEach(producto => {
        const nombre = producto.querySelector('h5').textContent;
        const precio = parseFloat(producto.querySelector('.price').textContent.replace('$', '').replace('.', ''));
        const boton = producto.querySelector('button:nth-of-type(2)'); 

        boton.addEventListener('click', () => {
            agregarAlCarrito({ nombre, precio });
        });
    });

    // Redirigir o hacer scroll al carrito al hacer clic en el ícono del carrito
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', (event) => {
      //  if (window.location.pathname.includes('store.html')) {
      //      event.preventDefault(); // No recarga la página si ya estoy en store.html
       //     seccionCarrito.scrollIntoView({ behavior: 'smooth' });
        //}
    });
});
