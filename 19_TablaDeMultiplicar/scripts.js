function generarTabla() {
    const numero = document.getElementById('num').value;

    // Esto sirve para limpiar la tabla del HTML antes de generar otra
    document.getElementById('resultado').innerHTML = '';

    for (let i = 1; i <= 10; i++) {
      document.getElementById('resultado').innerHTML += `${numero} * ${i} = ${numero * i}<br>`;
    }
  }