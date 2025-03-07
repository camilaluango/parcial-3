class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Cliente {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class Pedido {
    constructor(id, cliente, productos, fecha, prioridad) {
        this.id = id;
        this.cliente = cliente;
        this.productos = productos;
        this.fecha = fecha;
        this.prioridad = prioridad;
        this.procesado = false;
    }
    marcarProcesado() {
        this.procesado = true;
    }
    
    // Método para eliminar un producto del pedido
    eliminarProducto(productoId) {
        this.productos = this.productos.filter(producto => producto.id !== productoId);
    }
}

class Nodo {
    constructor(pedido) {
        this.pedido = pedido;
        this.siguiente = null;
    }
}

class LinkedList {
    constructor() {
        this.cabeza = null;
    }

    aggFinal(pedido) {
        const nuevoNodo = new Nodo(pedido);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    eliminarPedidoPorId(id) {
        if (this.cabeza === null) {
            console.log("La lista está vacía");
            return;
        }

        if (this.cabeza.pedido.id === id) {
            this.cabeza = this.cabeza.siguiente;
            console.log(`Pedido con ID ${id} eliminado`);
            return;
        }

        let actual = this.cabeza;
        while (actual.siguiente !== null && actual.siguiente.pedido.id !== id) {
            actual = actual.siguiente;
        }

        if (actual.siguiente === null) {
            console.log(`Pedido con ID ${id} no encontrado`);
            return;
        }

        actual.siguiente = actual.siguiente.siguiente;
        console.log(`Pedido con ID ${id} eliminado`);
    }

    buscarPedido(id) {
        let actual = this.cabeza;
        while (actual !== null) {
            if (actual.pedido.id === id) {
                return actual.pedido;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    ordenarCriterio(criterio) {
        if (this.cabeza === null || this.cabeza.siguiente === null) {
            return;
        }

        let listaOrdenada = null;
        let actual = this.cabeza;

        while (actual !== null) {
            const siguiente = actual.siguiente;

            if (listaOrdenada === null || actual.pedido[criterio] < listaOrdenada.pedido[criterio]) {
                actual.siguiente = listaOrdenada;
                listaOrdenada = actual;
            } else {
                let temp = listaOrdenada;
                while (temp.siguiente !== null && temp.siguiente.pedido[criterio] < actual.pedido[criterio]) {
                    temp = temp.siguiente;
                }
                actual.siguiente = temp.siguiente;
                temp.siguiente = actual;
            }
            actual = siguiente;
        }
        this.cabeza = listaOrdenada;
    }

    mostrarLista() {
        let actual = this.cabeza;
        while (actual !== null) {
            console.log(actual.pedido);
            actual = actual.siguiente;
        }
    }
}

function registrarPedido(lista, id, cliente, productos, fecha, prioridad) {
    const nuevoPedido = new Pedido(id, cliente, productos, fecha, prioridad);
    lista.aggFinal(nuevoPedido);
}

function consultarPedido(lista, id) {
    return lista.buscarPedido(id);
}

// Ejemplo de uso
const listaPedidos = new LinkedList();
const cliente1 = new Cliente(1, "Cliente 1");
const producto1 = new Producto(1, "Producto 1", 100);
const producto2 = new Producto(2, "Producto 2", 200);

registrarPedido(listaPedidos, 1, cliente1, [producto1, producto2], new Date('2023-01-01'), "alta");
registrarPedido(listaPedidos, 2, cliente1, [producto2], new Date('2023-01-02'), "baja");
registrarPedido(listaPedidos, 3, cliente1, [producto1], new Date('2023-01-03'), "media");

// Consultar y mostrar un pedido específico
const pedidoConsultado = consultarPedido(listaPedidos, 1);
console.log("Pedido consultado:", pedidoConsultado);

// Eliminar un producto del pedido
pedidoConsultado.eliminarProducto(1);
console.log("Pedido después de eliminar un producto:", pedidoConsultado);

// Eliminar un campo (prioridad) del pedido
delete pedidoConsultado.prioridad;
console.log("Pedido después de eliminar prioridad:", pedidoConsultado);

// Eliminar un pedido de la lista
listaPedidos.eliminarPedidoPorId(2);
console.log("Lista de pedidos después de eliminar el pedido 2:");
listaPedidos.mostrarLista();

// Ordenar la lista por fecha
listaPedidos.ordenarCriterio("fecha");
console.log("Lista ordenada por fecha:");
listaPedidos.mostrarLista();


