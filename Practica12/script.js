class VentasAnalizer {
    constructor(ventas) {
        this.ventas = ventas;
    }

    encontrarMenorVenta() {
        let menorVenta = this.ventas[0][0];
        let mes = 0;
        let dia = 0;

        for (let fila = 0; fila < this.ventas.length; fila++) {
            for (let columna = 0; columna < this.ventas[fila].length; columna++) {
                if (this.ventas[fila][columna] < menorVenta) {
                    menorVenta = this.ventas[fila][columna];
                    mes = fila + 1;
                    dia = columna + 1;
                }
            }
        }

        return { venta: menorVenta, mes, dia };
    }

    encontrarMayorVenta() {
        let mayorVenta = this.ventas[0][0];
        let mes = 0;
        let dia = 0;

        for (let fila = 0; fila < this.ventas.length; fila++) {
            for (let columna = 0; columna < this.ventas[fila].length; columna++) {
                if (this.ventas[fila][columna] > mayorVenta) {
                    mayorVenta = this.ventas[fila][columna];
                    mes = fila + 1;
                    dia = columna + 1;
                }
            }
        }

        return { venta: mayorVenta, mes, dia };
    }

    calcularVentaTotal() {
        let total = 0;

        for (let fila = 0; fila < this.ventas.length; fila++) {
            for (let columna = 0; columna < this.ventas[fila].length; columna++) {
                total += this.ventas[fila][columna];
            }
        }

        return total;
    }

    calcularVentaPorDia() {
        const ventaPorDia = [0, 0, 0, 0, 0, 0, 0];

        for (let fila = 0; fila < this.ventas.length; fila++) {
            for (let columna = 0; columna < this.ventas[fila].length; columna++) {
                ventaPorDia[columna] += this.ventas[fila][columna];
            }
        }

        return ventaPorDia;
    }

    imprimirResultados() {
        const menorVentaInfo = this.encontrarMenorVenta();
        const mayorVentaInfo = this.encontrarMayorVenta();
        const ventaTotal = this.calcularVentaTotal();
        const ventaPorDia = this.calcularVentaPorDia();

        document.getElementById('menor-venta').textContent = `$${menorVentaInfo.venta} (Mes ${menorVentaInfo.mes}, Día ${menorVentaInfo.dia})`;
        document.getElementById('mayor-venta').textContent = `$${mayorVentaInfo.venta} (Mes ${mayorVentaInfo.mes}, Día ${mayorVentaInfo.dia})`;
        document.getElementById('venta-total').textContent = `$${ventaTotal}`;

        const listaVentaPorDia = document.getElementById('venta-por-dia');
        const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        for (let i = 0; i < ventaPorDia.length; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = `${diasSemana[i]}: $${ventaPorDia[i]}`;
            listaVentaPorDia.appendChild(listItem);
        }
    }

    llenarTablaVentas() {
        const tablaVentas = document.getElementById('ventas-table');

        for (let fila = 0; fila < this.ventas.length; fila++) {
            const filaTabla = document.createElement('tr');

            for (let columna = 0; columna < this.ventas[fila].length; columna++) {
                const celda = document.createElement('td');
                celda.textContent = `$${this.ventas[fila][columna]}`;
                filaTabla.appendChild(celda);
            }

            tablaVentas.appendChild(filaTabla);
        }
    }
}

const ventasAnalizer = new VentasAnalizer([
    [5, 16, 10, 12, 24],
    [40, 55, 10, 11, 18],
    [15, 41, 78, 14, 51],
    [35, 22, 81, 15, 12],
    [50, 12, 71, 10, 20],
    [70, 40, 60, 28, 22],
    [50, 50, 50, 36, 25],
    [40, 70, 40, 11, 20],
    [20, 20, 30, 12, 18],
    [10, 40, 32, 13, 16],
    [50, 3, 24, 15, 82],
    [40, 46, 15, 46, 22]
]);

ventasAnalizer.llenarTablaVentas();
ventasAnalizer.imprimirResultados();
