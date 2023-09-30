class EstadisticasCalificaciones {
    constructor() {
        this.table = document.querySelector('table');
        this.filas = this.table.querySelectorAll('tbody tr');
        this.promedioAlto = -Infinity;
        this.promedioBajo = Infinity;
        this.parcialesReprobados = 0;
        this.distribucion = {
            '0-4.9': 0,
            '5.0-5.9': 0,
            '6.0-6.9': 0,
            '7.0-7.9': 0,
            '8.0-8.9': 0,
            '9.0-10': 0
        };
    }

    calcularEstadisticas() {
        for (const fila of this.filas) {
            const celdas = fila.querySelectorAll('td');
            let suma = 0;

            for (let i = 1; i < celdas.length - 1; i++) {
                const calificacion = parseFloat(celdas[i].textContent);

                if (!isNaN(calificacion)) {
                    suma += calificacion;

                    if (calificacion < 7.0) {
                        this.parcialesReprobados++;
                    }
                }
            }

            const promedio = suma / (celdas.length - 2);
            celdas[celdas.length - 1].textContent = promedio.toFixed(2);

            this.promedioAlto = Math.max(this.promedioAlto, promedio);
            this.promedioBajo = Math.min(this.promedioBajo, promedio);

            if (promedio >= 0 && promedio <= 4.9) {
                this.distribucion['0-4.9']++;
            } else if (promedio >= 5.0 && promedio <= 5.9) {
                this.distribucion['5.0-5.9']++;
            } else if (promedio >= 6.0 && promedio <= 6.9) {
                this.distribucion['6.0-6.9']++;
            } else if (promedio >= 7.0 && promedio <= 7.9) {
                this.distribucion['7.0-7.9']++;
            } else if (promedio >= 8.0 && promedio <= 8.9) {
                this.distribucion['8.0-8.9']++;
            } else if (promedio >= 9.0 && promedio <= 10) {
                this.distribucion['9.0-10']++;
            }
        }
    }

    mostrarResultados() {
        document.getElementById('promedio-alto').textContent = this.promedioAlto.toFixed(2);
        document.getElementById('promedio-bajo').textContent = this.promedioBajo.toFixed(2);
        document.getElementById('parciales-reprobados').textContent = this.parcialesReprobados;

        const distribucionList = document.getElementById('distribucion');
        for (const rango in this.distribucion) {
            const li = document.createElement('li');
            li.textContent = `${rango}: ${this.distribucion[rango]} Alumnos`;
            distribucionList.appendChild(li);
        }
    }
}

const estadisticas = new EstadisticasCalificaciones();
estadisticas.calcularEstadisticas();
estadisticas.mostrarResultados();
