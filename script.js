// Clase que representa un producto con ID, nombre y precio
class Producto {
    constructor(id, nombre, precio) {
        // Inicializa las propiedades del producto
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Clase que representa un cliente con ID y nombre
class Cliente {
    constructor(id, nombre) {
        // Inicializa las propiedades del cliente
        this.id = id;
        this.nombre = nombre;
    }
}

// Clase que representa un pedido con ID, cliente, productos, fecha y prioridad
class Pedido {
    constructor(id, cliente, productos, fecha, prioridad) {
        // Inicializa las propiedades del pedido
        this.id = id;
        this.cliente = cliente;
        this.productos = productos;
        this.fecha = fecha;
        this.prioridad = prioridad;
        this.procesado = false;  // Inicialmente el pedido no está procesado
    }
    
    // Método para marcar el pedido como procesado
    marcarProcesado() {
        this.procesado = true;
    }
    
    // Método para eliminar un producto del pedido usando su ID
    eliminarProducto(productoId) {
        // Filtra la lista de productos para excluir el producto con el ID dado
        this.productos = this.productos.filter(producto => producto.id !== productoId);
    }
}

// Nodo que almacena un pedido en la lista enlazada
class Nodo {
    constructor(pedido) {
        // Inicializa las propiedades del nodo
        this.pedido = pedido;
        this.siguiente = null;  // Inicialmente el nodo no tiene siguiente
    }
}

// Clase que representa una lista enlazada de pedidos
class LinkedList {
    constructor() {
        // Inicializa la cabeza de la lista como nula
        this.cabeza = null;
    }

    // Método para agregar un pedido al final de la lista
    aggFinal(pedido) {
        const nuevoNodo = new Nodo(pedido);  // Crea un nuevo nodo con el pedido
        if (this.cabeza === null) {
            // Si la lista está vacía, el nuevo nodo se convierte en la cabeza
            this.cabeza = nuevoNodo;
        } else {
            // Si la lista no está vacía, recorre hasta el final y agrega el nuevo nodo allí
            let actual = this.cabeza;
            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    // Método para eliminar un pedido de la lista por su ID
    eliminarPedidoPorId(id) {
        if (this.cabeza === null) {
            // Si la lista está vacía, no hay nada que eliminar
            console.log("La lista está vacía");
            return;
        }

        if (this.cabeza.pedido.id === id) {
            // Si el pedido a eliminar es la cabeza, se actualiza la cabeza
            this.cabeza = this.cabeza.siguiente;
            console.log(`Pedido con ID ${id} eliminado`);
            return;
        }

        // Recorrer la lista buscando el nodo anterior al que contiene el pedido a eliminar
        let actual = this.cabeza;
        while (actual.siguiente !== null && actual.siguiente.pedido.id !== id) {
            actual = actual.siguiente;
        }

        if (actual.siguiente === null) {
            // Si no se encuentra el pedido, se notifica
            console.log(`Pedido con ID ${id} no encontrado`);
            return;
        }

        // Se elimina el nodo que contiene el pedido
        actual.siguiente = actual.siguiente.siguiente;
        console.log(`Pedido con ID ${id} eliminado`);
    }

    // Método para buscar un pedido por su ID en la lista
    buscarPedido(id) {
        let actual = this.cabeza;  // Empezar desde la cabeza de la lista
        while (actual !== null) {
            if (actual.pedido.id === id) {
                return actual.pedido;  // Retorna el pedido si se encuentra
            }
            actual = actual.siguiente;  // Avanza al siguiente nodo
        }
        return null;  // Retorna null si no se encuentra el pedido
    }

    // Método para ordenar la lista según un criterio específico
    ordenarCriterio(criterio) {
        if (this.cabeza === null || this.cabeza.siguiente === null) {
            return;  // Si la lista está vacía o tiene un solo nodo, no hay necesidad de ordenar
        }

        let listaOrdenada = null;
        let actual = this.cabeza;

        while (actual !== null) {
            const siguiente = actual.siguiente;  // Guarda el siguiente nodo

            // Inserta el nodo actual en la lista ordenada
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
            actual = siguiente;  // Avanza al siguiente nodo
        }
        this.cabeza = listaOrdenada;  // Actualiza la cabeza de la lista
    }

    // Método para mostrar la lista de pedidos en la consola
    mostrarLista() {
        let actual = this.cabeza;  // Empezar desde la cabeza de la lista
        while (actual !== null) {
            console.log(actual.pedido);  // Imprime el pedido actual
            actual = actual.siguiente;  // Avanza al siguiente nodo
        }
    }
}

// Función para registrar un nuevo pedido en la lista
function registrarPedido(lista, id, cliente, productos, fecha, prioridad) {
    const nuevoPedido = new Pedido(id, cliente, productos, fecha, prioridad);  // Crea un nuevo pedido
    lista.aggFinal(nuevoPedido);  // Agrega el nuevo pedido al final de la lista
}

// Función para consultar un pedido en la lista por su ID
function consultarPedido(lista, id) {
    return lista.buscarPedido(id);  // Retorna el pedido encontrado por ID
}

// Ejemplo de uso
const listaPedidos = new LinkedList();  // Crea una nueva lista de pedidos
const cliente1 = new Cliente(1, "Cliente 1");  // Crea un nuevo cliente
const producto1 = new Producto(1, "Producto 1", 100);  // Crea un nuevo producto
const producto2 = new Producto(2, "Producto 2", 200);  // Crea otro nuevo producto

// Registrar pedidos en la lista
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