const display = document.getElementById('display');
const botones = document.querySelectorAll('.boton');
const historialDiv = document.querySelector('.historial');

let operando1 = '';
let operando2 = '';
let operador = null;
let resultado = null;

function actualizarDisplay(valor) {
    display.value = valor;
}

function actualizarHistorial() {
    const operacion = `${operando1} ${operador} ${operando2} = ${resultado}`;
    const historialItem = document.createElement('div');
    historialItem.textContent = operacion;
    historialDiv.appendChild(historialItem); 
    historialItem.addEventListener('click', () => {
        actualizarDisplay(resultado);
    });
    historialDiv.appendChild(historialItem);
}

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const texto = boton.textContent.trim();

        if (!isNaN(texto)) {
            if (operador === null) {
                operando1 += texto;
                actualizarDisplay(operando1);
            } else {
                operando2 += texto;
                actualizarDisplay(operando2);
            }
        } else if (['+', '-', 'x', '/'].includes(texto)) {
            operador = texto;
        } else if (texto === 'CE') { 
            operando1 = '';
            operando2 = '';
            operador = null;
            resultado = null;
            actualizarDisplay('');
        } else if (texto === '=') { 
            if (operando1 !== '' && operando2 !== '' && operador !== null) {
                const num1 = parseFloat(operando1);
                const num2 = parseFloat(operando2);

                switch (operador) {
                    case '+':
                        resultado = num1 + num2;
                        break;
                    case '-':
                        resultado = num1 - num2;
                        break;
                    case 'x':
                        resultado = num1 * num2;
                        break;
                    case '/':
                        resultado = num1 / num2;
                        break;
                }

                actualizarDisplay(resultado);
                actualizarHistorial();
                operando1 = resultado.toString();
                operando2 = '';
                operador = null;
            }
        }
    });
});