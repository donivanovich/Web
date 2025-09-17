const CARGA_MAXIMA = 150000; //definir la carga maxima permitida en kg
const PRECIO_POR_KG = 250; //define el precio maximo de precio por kg


//ESTO SIRVE PARA AÑADIR LOS IDS DE LAS CARGAS PREDEFINIDAS
const carga = [
    {
        id: 1,
        nombre: 'La Copa del Rey del Betis',
        masa: 50,
        precio: 50 * PRECIO_POR_KG //CALCULA EL PRECIO EN BASE A LA MASA
    },
    {
        id: 2,
        nombre: 'Una de las 4 ruedas del RedBull',
        masa: 33,
        precio: 33 * PRECIO_POR_KG //CALCULA EL PRECIO EN BASE A LA MASA
    },
    {
        id: 3,
        nombre: 'Huesos de los jamones necesarios para aprobar',
        masa: 25000,
        precio: 25000 * PRECIO_POR_KG //CALCULA EL PRECIO EN BASE A LA MASA
    },
    {
        id: 4,
        nombre: 'Todas las excusas de Xavi',
        masa: 75000,
        precio: 75000 * PRECIO_POR_KG //CALCULA EL PRECIO EN BASE A LA MASA
    },
    {
        id: 5,
        nombre: 'Los alumnos que suspendieron por no gastarse el dinero en jamones',
        masa: 15000,
        precio: 15000 * PRECIO_POR_KG //CALCULA EL PRECIO EN BASE A LA MASA
    }
];


//ESTA ES LA FUNCION PARA MOSTRAR LAS CARGAS POR PANTALLA
function mostrarCargas() {  
    const contenedor = document.getElementById("contenedorCargas");  // Obtiene el div donde se mostrarán las cargas
    contenedor.innerHTML = "";  // Limpia el contenedor antes de agregar nuevas cargas

    carga.forEach((item) => {  // Recorre cada objeto dentro del array "carga"
        let divCarga = document.createElement("div");  // Crea un nuevo div para cada carga
        divCarga.classList.add("cargaItem");  // Le asigna la clase CSS "cargaItem" para los estilos
        
        //ESTO ES PARA CREAR LA CARGA COMO CONTENEDOR

        divCarga.innerHTML = `  
            <h3>${item.nombre}</h3>  <!-- Muestra el nombre de la carga en un título -->
            <div>
                <span><strong>Masa:</strong> ${item.masa} Kg</span>  <!-- Muestra la masa a la izquierda -->
                <span> | </span>  
                <span><strong>Precio:</strong> ${item.precio} $</span>  <!-- Muestra el precio a la derecha -->
            </div>
        `;

        contenedor.appendChild(divCarga);  // Agrega el div con la carga dentro del contenedor
    });
}

//EJECUTA LA FUNCION AL CARGAR LA PAGINA
document.addEventListener("DOMContentLoaded", mostrarCargas);

//AGREGAR UNA NUEVA CARGA AL DARLE AL BOTON
document.getElementById("añadirCarga").addEventListener("click", function () {
    // Obtener valores de los inputs
    const nombreInput = document.getElementById("nombre").value.trim();// OBTIENE Y LIMPIA EL NOMBRE INGRESADO
    const masaInput = document.getElementById("masa").value; //OBTIENE EL VALOR DE LA MASA INGRESADA

    // Validar que se ingrese un nombre válido
    if (nombreInput === "") { //ESTO ES LO QUE LO VALIDA
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    // Validar que se ingrese una masa válida
    if (masaInput === "" || isNaN(masaInput) || masaInput <= 0) {
        alert("Por favor, ingresa una masa válida.");
        return;
    }

    const masa = parseFloat(masaInput); //CONVIERTE LA MASA A NUMERO
    const precio = masa * PRECIO_POR_KG; //CALCULA EL PRECIO BASADO EN LA MASA * EL PRECIO POR KG

    // Crear nueva carga con ID único
    const nuevaCarga = {
        id: carga.length > 0 ? Math.max(...carga.map(c => c.id)) + 1 : 1, // Evita duplicados si se eliminan elementos
        nombre: nombreInput,
        masa: masa,
        precio: precio
    };

    // Agregar al array
    carga.push(nuevaCarga);

    // Mostrar la nueva carga en pantalla
    mostrarCargas();

    // Limpiar los inputs después de añadir
    document.getElementById("nombre").value = "";
    document.getElementById("masa").value = "";
});

function mostrarCargas() {  
    const contenedor = document.getElementById("contenedorCargas");
    contenedor.innerHTML = "";  

    carga.forEach((item) => {
        let divCarga = document.createElement("div");  
        divCarga.classList.add("cargaItem"); 
        
        divCarga.innerHTML = `  
            <div class="cargaHeader">
                <h3 class="nombreCarga">${item.nombre}</h3>
                <button class="btnEliminar" onclick="eliminarCarga(${item.id})">ELIMINAR</button>
            </div>
            <div class="cargaInfo">
                <span><strong>Masa:</strong> ${item.masa} Kg</span>
                <span> | </span>  
                <span><strong>Precio:</strong> ${item.precio} $</span>
            </div>
        `;

        contenedor.appendChild(divCarga);  
    });
}

// Función para eliminar carga por ID
function eliminarCarga(id) {
    // Filtra el array para que solo queden los elementos que NO tienen el ID dado
    const index = carga.findIndex(item => item.id === id);
    if (index !== -1) {
        carga.splice(index, 1);
        mostrarCargas(); // Refrescar la lista
    }
}