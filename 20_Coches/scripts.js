// Definimos el primer objeto coche con sus propiedades
const coche1 = {
    id: 1,  // Identificador único del coche
    marca: 'tesla',  // Marca del coche
    modelo: 'cybertruck',  // Modelo del coche
    revisiones: [2023, 2024],  // Años de revisiones
    propietario: {  
        nombre: 'Saul',  // Nombre del propietario
        carnet: false  // Indica si tiene carnet de conducir
    },
    km: 2345,  // Kilómetros recorridos
    consumo: 5,  // Consumo de combustible en litros por cada 100 km
    combustibleActual: 40,  // Litros actuales en el depósito
    combustibleMax: 50  // Capacidad máxima del depósito
}

// Definimos el segundo objeto coche con sus propiedades
const coche2 = {
    id: 2,  
    marca: 'honda',  
    modelo: 'civic type r',  
    revisiones: [2020, 2024],  
    propietario: {  
        nombre: 'Saul',  
        carnet: false  
    },
    km: 1234,  
    consumo: 8.5,  
    combustibleActual: 10,  
    combustibleMax: 60  
}

// Recuperamos los coches almacenados en localStorage o usamos los coches definidos
const coches = JSON.parse(localStorage.getItem('coches')) || [coche1, coche2];

// Definimos un objeto con las acciones disponibles para los coches
const acciones = {
    seleccionar: {
        'display': 'Seleccionar',  // Texto mostrado en el botón
        'fn': 'seleccionar'  // Nombre de la función que ejecuta la acción
    },
    formatear: {
        'display': 'Formatear',  
        'fn': 'formatear'  
    },
    eliminar: {
        'display': 'Eliminar',  
        'fn': 'borrar'  
    },
    editar: {
        'display': 'Editar',  
        'fn': 'cargarEnFormulario'  
    },
    mover: {
        'display': 'Mover',  
        'fn': 'mostrarFormMover'  
    },
    repostar: {
        'display': 'Repostar',  
        'fn': 'mostrarFormRepostar'  
    }
}

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function(event){
    const forms = document.getElementsByTagName('form');  // Obtiene todos los formularios
    forms[0].onsubmit = envioFormulario;  // Asigna la función para manejar el envío del primer formulario
    for(const coche of coches){  // Itera sobre los coches
        completarObjetoCoche(coche);  // Completa la funcionalidad de cada objeto coche
        coche.crearFila();  // Crea una fila en la tabla para cada coche
    }
    forms[1].onsubmit = onSubmitFormMover;  // Asigna la función para el formulario de mover
    forms[2].onsubmit = onSubmitFormRepostar;  // Asigna la función para el formulario de repostar
});

// Función que maneja el formulario de mover el coche
function onSubmitFormMover(event){
    event.preventDefault();  // Evita que el formulario se envíe normalmente
    const form = event.currentTarget;  // Obtiene el formulario que disparó el evento
    const id = parseInt(form.dataset.id);  // Obtiene el ID del coche desde el atributo dataset
    const coche = getCocheById(id);  // Busca el coche correspondiente
    const km = parseInt(form.elements.km.value);  // Obtiene los km ingresados en el formulario
    coche.mover(km);  // Llama al método mover del coche
    form.parentNode.classList.add('oculto');  // Oculta el formulario después de usarlo
}

// Función que maneja el formulario de repostar
function onSubmitFormRepostar(event){
    event.preventDefault();  
    const form = event.currentTarget;  
    const id = parseInt(form.dataset.id);  
    const coche = getCocheById(id);  
    const litros = parseInt(form.elements.litros.value);  
    coche.repostar(litros);  
    form.parentNode.classList.add('oculto');  
}

// Función que añade métodos a un objeto coche
function completarObjetoCoche(coche){
    // Método para crear una fila en la tabla con la información del coche
    coche.crearFila = function(){
        this.fila = document.createElement('tr');  // Crea una fila de tabla
        this.fila.dataset.id = this.id;  // Asigna el ID del coche a la fila

        // Crea las celdas de la tabla para las propiedades del coche
        this.elements = {
            marca: document.createElement('td'),
            modelo: document.createElement('td'),
            km: document.createElement('td'),
            consumo: document.createElement('td'),
            combustibleActual: document.createElement('td'),
            botones: document.createElement('td')
        };

        // Asigna valores a las celdas
        this.elements.marca.innerHTML = this.marca;
        this.elements.modelo.innerHTML = this.modelo;
        this.elements.km.innerHTML = this.km;
        this.elements.combustibleActual.innerHTML = this.combustibleActual;
        this.elements.consumo.innerHTML = this.consumo;

        // Crea botones para cada acción y los agrega a la celda de botones
        for(const accion in acciones){
            const btn = document.createElement('button');
            btn.innerHTML = acciones[accion].display;
            btn.dataset.accion = accion;
            btn.onclick = onClickAccion;
            this.elements.botones.appendChild(btn);
        }
        
        // Agrega las celdas a la fila
        this.fila.appendChild(this.elements.marca);
        this.fila.appendChild(this.elements.modelo);
        this.fila.appendChild(this.elements.km);
        this.fila.appendChild(this.elements.consumo);
        this.fila.appendChild(this.elements.combustibleActual);
        this.fila.appendChild(this.elements.botones);

        // Agrega la fila a la tabla
        const tabla = document.getElementById('tablaCoches');
        tabla.appendChild(this.fila);
    }

    // Método para eliminar el coche
    coche.borrar = function(){
        const index = coches.indexOf(this);
        if(index >= 0){
            coches.splice(index, 1);
            this.fila.remove();
        }
        guardar();
    }

    // Método para cambiar el formato de marca y modelo a mayúsculas
    coche.formatear = function(){
        const elementos = ['marca', 'modelo'];
        for(const e of elementos){
            this.elements[e].innerHTML = this.elements[e].innerHTML.toUpperCase();
        }
    }

    // Método para seleccionar un coche y deseleccionar los demás
    coche.seleccionar = function(){
        for(const coche of coches){
            if(coche.fila !== this.fila) coche.fila.classList.remove('seleccionado');
        }
        this.fila.classList.toggle('seleccionado');
    }

    // Métodos para actualizar las propiedades del coche y reflejarlo en la interfaz
    coche.setMarca = function(marca){
        this.marca = marca;
        this.elements.marca.innerHTML = marca;
    }

    coche.setModelo = function(modelo){
        this.modelo = modelo;
        this.elements.modelo.innerHTML = modelo;
    }

    coche.setKm = function(km){
        this.km = km;
        this.elements.km.innerHTML = km;
    }

    coche.setConsumo = function(consumo){
        this.consumo = consumo;
        this.elements.consumo.innerHTML = consumo;
    }

    coche.setCombustibleActual = function(combustible){
        this.combustibleActual = combustible;
        this.elements.combustibleActual.innerHTML = combustible;
    }

    coche.setCombustibleMax = function(combustibleMax){
        this.combustibleMax = combustibleMax;
    }
}

// Guarda los coches en localStorage
function guardar(){
    localStorage.setItem('coches', JSON.stringify(coches));
}


/*const coche1 = {
    id: 1,
    marca: 'tesla',
    modelo: 'cybertruck',
    revisiones: [2023, 2024],
    propietario: {
        nombre: 'Saul',
        carnet: false
    },
    km: 2345,
    consumo: 5,
    combustibleActual: 40,
    combustibleMax: 50
}

const coche2 = {
    id: 2,
    marca: 'honda',
    modelo: 'civic type r',
    revisiones: [2020, 2024],
    propietario: {
        nombre: 'Saul',
        carnet: false
    },
    km: 1234,
    consumo: 8.5,
    combustibleActual: 10,
    combustibleMax: 60
}

const coches = JSON.parse(localStorage.getItem('coches')) || [coche1, coche2];
const acciones = {
    seleccionar: {
        'display': 'Seleccionar',
        'fn': 'seleccionar'
    },
    formatear: {
        'display': 'Formatear',
        'fn': 'formatear'
    },
    eliminar: {
        'display': 'Eliminar',
        'fn': 'borrar'
    },
    editar: {
        'display': 'Editar',
        'fn': 'cargarEnFormulario'
    },
    mover: {
        'display': 'Mover',
        'fn': 'mostrarFormMover'
    },
    repostar: {
        'display': 'Repostar',
        'fn': 'mostrarFormRepostar'
    }
}

document.addEventListener('DOMContentLoaded', function(event){
    const forms = document.getElementsByTagName('form');
    forms[0].onsubmit = envioFormulario;
    for(const coche of coches){
        completarObjetoCoche(coche);
        coche.crearFila();
    }
    forms[1].onsubmit = onSubmitFormMover;
    forms[2].onsubmit = onSubmitFormRepostar;
});

function onSubmitFormMover(event){
    event.preventDefault();
    const form = event.currentTarget;
    const id = parseInt(form.dataset.id);
    const coche = getCocheById(id);
    const km = parseInt(form.elements.km.value);
    coche.mover(km);
    form.parentNode.classList.add('oculto');
}

function onSubmitFormRepostar(event){
    event.preventDefault();
    const form = event.currentTarget;
    const id = parseInt(form.dataset.id);
    const coche = getCocheById(id);
    const litros = parseInt(form.elements.litros.value);
    coche.repostar(litros);
    form.parentNode.classList.add('oculto');
}

function completarObjetoCoche(coche){
    coche.crearFila = function(){
        this.fila = document.createElement('tr');
        this.fila.dataset.id = this.id;
        this.elements = {
            marca: document.createElement('td'),
            modelo: document.createElement('td'),
            km: document.createElement('td'),
            consumo: document.createElement('td'),
            combustibleActual: document.createElement('td'),
            botones: document.createElement('td')
        };

        this.elements.marca.innerHTML = this.marca;
        this.elements.modelo.innerHTML = this.modelo;
        this.elements.km.innerHTML = this.km;
        this.elements.combustibleActual.innerHTML = this.combustibleActual;
        this.elements.consumo.innerHTML = this.consumo;
        for(const accion in acciones){
            const btn = document.createElement('button');
            btn.innerHTML = acciones[accion].display;
            btn.dataset.accion = accion;
            btn.onclick = onClickAccion;
            this.elements.botones.appendChild(btn);
        }
        
        this.fila.appendChild(this.elements.marca);
        this.fila.appendChild(this.elements.modelo);
        this.fila.appendChild(this.elements.km);
        this.fila.appendChild(this.elements.consumo);
        this.fila.appendChild(this.elements.combustibleActual);
        this.fila.appendChild(this.elements.botones);

        const tabla = document.getElementById('tablaCoches');
        tabla.appendChild(this.fila);
    }
    coche.borrar = function(){
        const index = coches.indexOf(this);
        if(index >= 0){
            coches.splice(index, 1);
            this.fila.remove();
        }
        guardar();
    }
    coche.formatear = function(){
        const elementos = ['marca', 'modelo'];
        for(const e of elementos){
            this.elements[e].innerHTML = this.elements[e].innerHTML.toUpperCase();
        }
    }
    coche.seleccionar = function(){
        for(const coche of coches){
            if(coche.fila !== this.fila) coche.fila.classList.remove('seleccionado');
        }
        this.fila.classList.toggle('seleccionado');
    }
    coche.setMarca = function(marca){
        this.marca = marca;
        this.elements.marca.innerHTML = marca;
    }
    coche.setModelo = function(modelo){
        this.modelo = modelo;
        this.elements.modelo.innerHTML = modelo;
    }
    coche.setKm = function(km){
        this.km = km;
        this.elements.km.innerHTML = km;
    }
    coche.setConsumo = function(consumo){
        this.consumo = consumo;
        this.elements.consumo.innerHTML = consumo;
    }
    coche.setCombustibleActual = function(combustible){
        this.combustibleActual = combustible;
        this.elements.combustibleActual.innerHTML = combustible;
    }
    coche.setCombustibleMax = function(combustibleMax){
        this.combustibleMax = combustibleMax;
    }
    coche.cargarEnFormulario = function(){
        const formulario = document.getElementsByTagName('form')[0];
        formulario.elements.marca.value = this.marca;
        formulario.elements.modelo.value = this.modelo;
        formulario.elements.km.value = this.km;
        formulario.elements.consumo.value = this.consumo;
        formulario.elements.combustibleActual.value = this.combustibleActual;
        formulario.elements.combustibleMax.value = this.combustibleMax;
        formulario.elements.submit.value = 'Guardar cambios';
        formulario.dataset.id = this.id;
    }
    coche.mostrarFormMover = function(){
        const container = document.getElementById('containerFormMover');
        const formulario = container.getElementsByTagName('form')[0];
        formulario.dataset.id = coche.id;
        const titulo = formulario.getElementsByTagName('h2')[0];
        titulo.innerHTML = `Mover ${coche.marca} ${coche.modelo}`.toUpperCase();
        const divMax = formulario.getElementsByTagName('div')[0];
        const maxKm = this.combustibleActual / this.consumo * 100;
        divMax.innerHTML = `Máximo kilómetros: ${maxKm}Km`;
        formulario.elements.km.setAttribute('max', maxKm);
        container.classList.remove('oculto');
    }
    coche.mostrarFormRepostar = function(){
        const container = document.getElementById('containerFormRepostar');
        const formulario = container.getElementsByTagName('form')[0];
        formulario.dataset.id = coche.id;
        const titulo = formulario.getElementsByTagName('h2')[0];
        titulo.innerHTML = `Repostar ${coche.marca} ${coche.modelo}`.toUpperCase();
        const divMax = formulario.getElementsByTagName('div')[0];
        const maxLitros = this.combustibleMax - this.combustibleActual;
        divMax.innerHTML = `Máximo litros: ${maxLitros}L`;
        formulario.elements.litros.setAttribute('max', maxLitros);
        container.classList.remove('oculto');
    }
    coche.mover = function(km){
        this.setKm(this.km + km);
        const gastado = this.consumo * km /100;
        this.setCombustibleActual(this.combustibleActual - gastado);
        guardar();
    }
    coche.repostar = function(litros){
        this.setCombustibleActual(this.combustibleActual + litros);
        guardar();
    }
}

function envioFormulario(event){
    event.preventDefault();
    const id = parseInt(event.currentTarget.dataset.id);
    const elements = event.currentTarget.elements;
    const marca = elements.marca.value.toLowerCase();
    const modelo = elements.modelo.value.toLowerCase();
    const km = parseInt(elements.km.value);
    const consumo = parseFloat(elements.consumo.value);
    const combustibleActual = parseFloat(elements.combustibleActual.value);
    const combustibleMax = parseFloat(elements.combustibleMax.value);
    event.currentTarget.reset();
    if(id === 0){
        // if(getCoche(marca, modelo)) return;
        const nuevoCoche = {
            id: getLastId() + 1,
            marca: marca,
            modelo: modelo,
            km: km,
            consumo: consumo,
            combustibleActual: combustibleActual,
            combustibleMax: combustibleMax
        }
        completarObjetoCoche(nuevoCoche);
        coches.push(nuevoCoche);
        nuevoCoche.crearFila();
        guardar();
        return;
    }
    const coche = getCocheById(id);
    coche.setMarca(marca);
    coche.setModelo(modelo);
    coche.setKm(km);
    coche.setConsumo(consumo);
    coche.setCombustibleActual(combustibleActual);
    coche.setCombustibleMax(combustibleMax);
    event.currentTarget.dataset.id = 0;
    elements.submit.value = 'Añadir';
    guardar();
}

function onClickAccion(event){
    const fila = event.currentTarget.parentNode.parentNode;
    const id = parseInt(fila.dataset.id);
    const coche = getCocheById(id);
    const accion = event.currentTarget.dataset.accion;
    coche[acciones[accion].fn]();
}

function getCoche(marca, modelo){
    for(const coche of coches){
        if(coche.marca === marca && coche.modelo === modelo){
            return coche;
        }
    }
}

function getCocheById(id){
    return coches.find(coche => coche.id === id);
}

function getLastId(){
    let id = 0;
    for(const coche of coches){
        if(coche.id > id){
            id = coche.id;
        }
    }
    return id;
}

function guardar(){
    localStorage.setItem('coches', JSON.stringify(coches));
}*/