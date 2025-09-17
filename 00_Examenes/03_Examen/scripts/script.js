const tutoriasBase = [
    {
        id: 1,
        fecha: '2025-04-02T09:33',
        estado: 0,
        alumno: 1,
        comentarios: ''
    },
    {
        id: 2,
        fecha: '2025-04-02T11:11',
        estado: 0,
        alumno: 2,
        comentarios: ''
    }
];

const alumnos = [
    {
        id: 1,
        nombre: 'Alice'
    },
    {
        id: 2,
        nombre: 'Bob'
    },
    {
        id: 2,
        nombre: 'Tim Berners-Lee'
    }
];

document.addEventListener('DOMContentLoaded', function(event){
    const form = document.getElementsByTagName('form')[0];
    form.onsubmit = envioFormulario;
});

function envioFormulario(event){
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const alumno = elements.alumno.value;
    const fecha = elements.fecha.value;
    event.currentTarget.reset();
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${alumno}</td>
        <td>${fecha}</td>
        <td id="completar" class="rojo">Pendiente</td>
        <td>
            <button>Completar</button>
            <button>Eliminar</button>
        </td>
    `;

    const tabla = document.getElementById('tablaAlumnos');
    tabla.appendChild(tr);

    btnCompletar = tr.getElementsByTagName('button')[0];
    btnCompletar.onclick = onClickCompletar;

    btnEliminar = tr.getElementsByTagName('button')[1];
    btnEliminar.onclick = e => e.currentTarget.parentNode.parentNode.remove();
}

function onClickCompletar(event){
    
}
