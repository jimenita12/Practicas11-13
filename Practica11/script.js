class MatrizOperaciones {
    constructor(filas, columnas) {
        this.matriz = Array.from({ length: filas }, () => Array(columnas));
    }

    llenarMatriz() {
        for (let fila = 0; fila < this.matriz.length; fila++) {
            for (let columna = 0; columna < this.matriz[fila].length; columna++) {
                this.matriz[fila][columna] = Math.floor(Math.random() * 100) + 1;
            }
        }
    }

    calcularResultados() {
        const sumaPorFila = [];
        const promedioPorFila = [];
        const sumaPorColumna = [];
        const promedioPorColumna = [];

        for (let fila = 0; fila < this.matriz.length; fila++) {
            let sumaFila = 0;
            for (let columna = 0; columna < this.matriz[fila].length; columna++) {
                sumaFila += this.matriz[fila][columna];
                sumaPorColumna[columna] = (sumaPorColumna[columna] || 0) + this.matriz[fila][columna];
            }
            sumaPorFila.push(sumaFila);
            promedioPorFila.push(sumaFila / this.matriz[fila].length);
        }

        for (let columna = 0; columna < this.matriz[0].length; columna++) {
            promedioPorColumna.push(sumaPorColumna[columna] / this.matriz.length);
        }

        return {
            sumaPorFila,
            promedioPorFila,
            sumaPorColumna,
            promedioPorColumna,
        };
    }

    crearTablaMatriz() {
        const tabla = document.createElement('table');

        for (let fila = 0; fila < this.matriz.length; fila++) {
            const filaTabla = document.createElement('tr');

            for (let columna = 0; columna < this.matriz[fila].length; columna++) {
                const celda = document.createElement('td');
                celda.textContent = this.matriz[fila][columna];
                filaTabla.appendChild(celda);
            }

            tabla.appendChild(filaTabla);
        }

        return tabla;
    }

    crearTablaResultadosFila() {
        const resultados = this.calcularResultados();
        const tabla = document.createElement('table');
        const cabecera = document.createElement('tr');
        cabecera.innerHTML = '<th>A</th><th>B</th>';
        tabla.appendChild(cabecera);

        for (let fila = 0; fila < resultados.sumaPorFila.length; fila++) {
            const filaHTML = document.createElement('tr');
            filaHTML.innerHTML = `<td>${resultados.sumaPorFila[fila]}</td><td>${resultados.promedioPorFila[fila].toFixed(2)}</td>`;
            tabla.appendChild(filaHTML);
        }

        return tabla;
    }

    crearTablaResultadosColumna() {
        const resultados = this.calcularResultados();
        const tabla = document.createElement('table');
        const filaSuma = document.createElement('tr');
       const filaPromedio = document.createElement('tr');

        const cabeceraSuma = document.createElement('th');
        cabeceraSuma.textContent = 'C';
        filaSuma.appendChild(cabeceraSuma);

        const cabeceraPromedio = document.createElement('th');
        cabeceraPromedio.textContent = 'D';
        filaPromedio.appendChild(cabeceraPromedio);

        for (let fila = 0; fila < resultados.sumaPorColumna.length; fila++) {
            const celdaSuma = document.createElement('td');
            celdaSuma.textContent = resultados.sumaPorColumna[fila];
            filaSuma.appendChild(celdaSuma);

            const celdaPromedio = document.createElement('td');
            celdaPromedio.textContent = resultados.promedioPorColumna[fila].toFixed(2);
            filaPromedio.appendChild(celdaPromedio);
        }

        tabla.appendChild(filaSuma);
        tabla.appendChild(filaPromedio);

        return tabla;
    }
}

const matrizOperaciones = new MatrizOperaciones(5, 10);
matrizOperaciones.llenarMatriz();

const matrizContainer = document.querySelector('.matriz-container');
matrizContainer.appendChild(matrizOperaciones.crearTablaMatriz());

const tablaResultadosFila = document.getElementById('tablaResultadosFila');
tablaResultadosFila.appendChild(matrizOperaciones.crearTablaResultadosFila());

const tablaResultadosColumna = document.getElementById('tablaResultadosColumna');
tablaResultadosColumna.appendChild(matrizOperaciones.crearTablaResultadosColumna());
