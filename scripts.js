console.log (".-");

//accion de agregar a favoritos

// Seleccionar el pop-up
const popup = document.getElementById('favorite-popup');

// Función para mostrar el pop-up de agregado a fav
function showPopup(message) {
    popup.textContent = message; 
    popup.classList.remove('hidden'); 
    popup.classList.add('visible'); 

    // Ocultar automáticamente despues de 5 segundos
    setTimeout(() => {
        popup.classList.remove('visible'); 
        popup.classList.add('hidden'); 
    }, 5000);
}

// Botones de favoritos-funcion de dar like 
document.querySelectorAll('.icon-btn').forEach(button => {
    button.addEventListener('click', function () {
        const heartIcon = this.querySelector('i'); 

     
        if (this.classList.contains('favorited')) {
            this.classList.remove('favorited');
            heartIcon.classList.remove('fa-solid'); 
            heartIcon.classList.add('fa-regular'); 
        } else {
            this.classList.add('favorited');
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid'); 

                showPopup('¡Agregado a Favoritos!');
        }
    });
});



const products = [
    {   id: 1,
        name:"Llama Manta Apego",
        price: 15000
    },
    {   id: 2,
        name:"Perro Pancho",
        price: 16200
    },
    {   id: 3,
        name:"South Park pack x4",
        price: 36000
    },
    {   id: 4,
        name:"Cabrita Baphomet",
        price: 10800
    },
    {   id: 5,
        name:"Carpinchos pack x2",
        price: 15000
    },
    {   id: 6,
        name:"Perrito This Is Fine",
        price: 15000
    },
    {   id: 7,
        name:"Zarigüeya",
        price: 15000
    },
    {   id: 8,
        name:"Chems",
        price: 13500
    },
    {   id: 9,
        name:"Gatito Fantasma",
        price: 15000
    },
    {   id: 10,
        name:"Castor",
        price: 16500
    }
    ]

    console.log(products[1].name) //imprime el nombre del producto segun el id asignado

   
    

