console.log (".-");

//************ Acción de agregar a favoritos *******************

// Seleccionar el pop-up
const popup = document.getElementById('favorite-popup');

// Función para mostrar el pop-up de agregado a favoritos
function showPopup(message) {
    popup.textContent = message; 
    popup.classList.remove('hidden'); 
    popup.classList.add('visible'); 

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        popup.classList.remove('visible'); 
        popup.classList.add('hidden'); 
    }, 3000);
}


//JSON productos que están en la web
const products = [
    {   id: 1,
        name:"Llama Manta Apego",
        description: "El primer amigo que un bebé puede tener",
        image: "images/llamamantaapego.png",
        price: 15000
    },
    {   id: 2,
        name:"Perro Pancho",
        description: "Adorable perro salchicha, tu futuro compañero de aventuras.",
        image: "images/perroPancho2.jpeg",
        price: 16200
    },
    {   id: 3,
        name:"South Park pack x4",
        description:"Estos irreverentes chicos te sacarán más de una sonrisa.",
        image: "images/southPark.png" ,
        price: 36000
    },
    {   id: 4,
        name:"Cabrita Baphomet",
        description:"Que la magia de esta mística cabrita te acompañe.",
        image: "images/baphomet.png" ,
        price: 10800
    },
    {   id: 5,
        name:"Carpinchos pack x2",
        image: "images/carpinchos.jpeg",
        description:"Porque sólo un carpincho no es suficiente.",
        price: 15000
    },
    {   id: 6,
        name:"Perrito This Is Fine",
        image: "images/thisisfinedog.jpeg",
        description: "Que no cunda el pánico, este perrito devenido en meme resuelve todo.",
        price: 15000
    },
    {   id: 7,
        name:"Zarigüeya",
        image: "images/zarigueya.jpeg",
        description:"A la grande le puse Cuca." ,
        price: 15000
    },
    {   id: 8,
        name:"Chems",
        image: "images/Chems1.jpeg",
        description:"Que no te de amsiedadt, este Chems puede ser tuyo." ,
        price: 13500
    },
    {   id: 9,
        name:"Gatito Fantasma",
        image: "images/gatito_fantasma.png",
        description:"Todo es mejor con gatitos, inclusive los sustos." ,
        price: 15000
    },
    {   id: 10,
        name:"Castor",
        image: "images/castor1.jpeg",
        description:"Arquitectos innatos de buenos momentos." ,
        price: 16500
    },

    {   id: 11,
        name:"Furby",
        image: "images/furby1.jpeg",
        description:"Los 90's volvieron con este amigazo" ,
        price: 18500
    }
    ];

//*********************** carga de productos desde el JSON*******************************

// Función para renderizar productos en un contenedor específico
function renderProducts(products, containerId) {
    let productsHTML = "";
    for (let index = 0; index < products.length; index++) {
        productsHTML += `
            <div class="product">
                <div class="icon-btn">
                    <i class="fa-regular fa-heart"></i>
                </div>
                <img src="${products[index].image}" alt="${products[index].name}">
                <h5>${products[index].name}</h5>
                <p>${products[index].description}</p>
                <h4 class="price">$${products[index].price}</h4>
                <p class="fees">6 cuotas sin interés</p>
                <div class="buttons-card">
                     <button class="buy-btn" data-id="${products[index].id}">Agregar al carrito</button>
                </div>
            </div>
        `;
    }

    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = productsHTML;

    // Asignar eventos a los botones de favoritos después de renderizar los productos
document.querySelectorAll('.icon-btn').forEach(button => {
    button.addEventListener('click', function () {
        const heartIcon = this.querySelector('i');

        if (this.classList.contains('favorited')) {
            this.classList.remove('favorited');
            heartIcon.classList.remove('fa-solid'); 
            heartIcon.classList.add('fa-regular'); 
            showPopup('Eliminado de Favoritos');
        } else {
            this.classList.add('favorited');
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid'); 
            showPopup('¡Agregado a Favoritos!');
        }
    });
});

        // Asignar eventos a los botones "Agregar al carrito"
        assignAddToCartEvents();
    } else {
        console.error(`Contenedor con id "${containerId}" no encontrado.`);
    }
}




//*********************** Inicialización  de visualizacion de ultimos productos -novedades*******************************

document.addEventListener("DOMContentLoaded", () => {
    const productContainerCart = document.getElementById("productContainerCart");

    if (productContainerCart) {
        const isIndexPage = document.body.classList.contains("index-page");

        if (isIndexPage) {
            const newestProducts = products.slice(-4); // Últimos 4 productos
            renderProducts(newestProducts, "productContainerCart");
        } else {
            renderProducts(products, "productContainerCart");
        }
    }
});

//*********************** Buscar productos dentro de la página *******************************
function searchProducts(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const searchInput = document.getElementById("searchInput").value.toLowerCase(); // Capturar el texto ingresado y convertirlo a minúsculas
    const productCards = document.querySelectorAll(".product"); // Seleccionar todas las tarjetas de productos

    productCards.forEach(card => {
        const productName = card.querySelector("h5").textContent.toLowerCase(); // Nombre del producto
        const productDescription = card.querySelector("p").textContent.toLowerCase(); // Descripción del producto

        // Mostrar la tarjeta si coincide con la búsqueda; ocultarla si no
        if (productName.includes(searchInput) || productDescription.includes(searchInput)) {
            card.style.display = "block"; // Mostrar la tarjeta
        } else {
            card.style.display = "none"; // Ocultar la tarjeta
        }
    });
}

// Agregar el evento al formulario de búsqueda
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    searchForm.addEventListener("submit", searchProducts);
});


//*********************** Módulo del carrito *******************************

// Variables globales

let totalToPay = 0; // Total acumulado
let cartItems = []; // Array para almacenar los productos del carrito

// Referencias al DOM
const CartList = document.querySelector("#cart-items-list");
const CartTotal = document.querySelector("#cart-total");
const CartCount = document.querySelector("#cart-count");
const CartPopup = document.getElementById("cart-popup"); // El pop-up flotante
const cartIcon = document.getElementById("cart-icon"); // Ícono del carrito
const closeCartBtn = document.getElementById("close-cart-btn"); // Botón cerrar carrito
const btnDelete = document.querySelector(".del-btn"); // Botón "Eliminar"
const btnCancel = document.querySelector(".cancel-btn"); // Botón "Cancelar"


// Funciones del carrito

// Actualizar contador del carrito
function updateCartCount() {
    CartCount.textContent = cartItems.length;
}

// Mostrar el carrito como pop-up
function showCartPopup() {
    CartPopup.classList.add("visible");
}

// Cerrar el carrito
function closeCartPopup() {
    CartPopup.classList.remove("visible");
}

// Agregar un producto al carrito
function addElemCart(product) {
    cartItems.push(product); // Añadir producto al array

    // Crear un nuevo elemento <li> en el carrito
    const elementLi = document.createElement("li");
    elementLi.textContent = `Producto: ${product.name} - $${product.price}`;
    CartList.appendChild(elementLi);

    // Actualizar total y contador
    totalToPay += product.price;
    CartTotal.textContent = `Total a pagar: $${totalToPay}`;
    updateCartCount();

    // Abrir automáticamente el carrito como pop-up 
    showCartPopup();
}

// Vaciar el carrito
function clearCart() {
    cartItems = []; // Vaciar el array
    CartList.innerHTML = ""; // Limpiar la lista del DOM
    totalToPay = 0; // Reiniciar total
    CartTotal.textContent = "Total a pagar: $0";
    updateCartCount();
}

// Función para cancelar: vacía el carrito y muestra mensaje
function cancelCart() {
    clearCart();
    alert("Se canceló el carrito. Todos los productos fueron eliminados.");
}

// Asignar eventos a los botones "Eliminar" y "Cancelar"
if (btnDelete) {
    btnDelete.addEventListener("click", clearCart);
}

if (btnCancel) {
    btnCancel.addEventListener("click", cancelCart);
}

// Asignar eventos a los botones "Agregar al carrito"
function assignAddToCartEvents() {
    const btnAddToCart = document.querySelectorAll(".buy-btn");
    btnAddToCart.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = parseInt(button.getAttribute("data-id"), 10); // Obtener el ID del producto
            const product = products.find(p => p.id === productId); // Buscar el producto por ID
            if (product) {
                addElemCart(product); // Agregar el producto correcto al carrito
            } else {
                console.error("Producto no encontrado.");
            }
        });
    });
}

//Eventos del pop-up 

// Mostrar el carrito al hacer clic en el ícono
cartIcon.addEventListener("click", showCartPopup);

// Cerrar el carrito al hacer clic en la "X"
closeCartBtn.addEventListener("click", closeCartPopup);

// Cerrar el carrito haciendo clic fuera del pop-up
window.addEventListener("click", (event) => {
    if (event.target === CartPopup) {
        closeCartPopup();
    }
});



