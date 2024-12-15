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

    //almacenamiento de carrito
    let cart = [];

    

    //for que cargara los productos de JSON en store.html
    let productsHTML = "";
    for (let index = 0; index < products.length; index ++){
        productsHTML += `
  <div class="product">
					<div class= "icon-btn">
						<i class="fa-regular fa-heart"></i>
					</div>
						<img src=${products[index].image} alt =${products[index].name}> 
						<h5>${products[index].name}</h5>
                        <p>${products[index].description}</p>
						<h4 class="price">$ ${products[index].price}</h4>
				<p class="fees">6 cuotas sin interés</p>
				<div class="buttons-card">
				<button class="buy-btn">Agregar al carrito</button>
		</div>
				</div>
 `;

    }
 
console.log (productsHTML);

 const productContainerCart = document.getElementById("productContainerCart");
 productContainerCart.innerHTML= productsHTML

// Modulo favoritos -eventos a los botones de favoritos después de carga de productos
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



 //***********************Modulo de carrito*******************************

 