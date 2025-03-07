# Sistema de Gestión de Pedidos

## Descripción del Proyecto
Este proyecto implementa un sistema de gestión de pedidos utilizando una estructura de datos de lista enlazada en JavaScript. El sistema incluye la creación y gestión de productos, clientes y pedidos, permitiendo agregar, eliminar, buscar y ordenar pedidos.

## Análisis del Problema
El problema principal que se aborda en este proyecto es la gestión eficiente de pedidos para un negocio. La solución implementada permite:

- Agregar nuevos pedidos a una lista.
- Eliminar pedidos existentes de la lista.
- Buscar pedidos por su identificador.
- Eliminar productos específicos de un pedido.
- Ordenar los pedidos según criterios específicos (por ejemplo, la fecha).
- Marcar pedidos como procesados.

## Diseño del Sistema
El sistema se ha diseñado utilizando clases para representar los distintos elementos del sistema: `Producto`, `Cliente`, `Pedido`, `Nodo` y `LinkedList`.

### Clases Principales

#### Clase `Producto`
La clase `Producto` define los productos que se pueden agregar a los pedidos. Cada producto tiene un `id`, un `nombre` y un `precio`.

```javascript
class Producto {
    constructor(id, nombre, precio) {
        if (!id || !nombre || !precio) {
            throw new Error("Todos los campos son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}
```
#### Clase `Cliente`
La clase `Cliente` define los clientes que realizan los pedidos. Cada cliente tiene un id y un nombre

```javascript
class Cliente {
    constructor(id, nombre) {
        if (!id || !nombre) {
            throw new Error("Todos los campos son obligatorios");
        }
        this.id = id;
        this.nombre = nombre;
    }
}
```
#### Clase `Pedido`
La clase `Pedido` define los pedidos realizados por los clientes. Cada pedido tiene un id, un cliente, una lista de productos, una fecha, una prioridad y un estado procesado.

```javascript
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
    
    eliminarProducto(productoId) {
        const index = this.productos.findIndex(producto => producto.id === productoId);
        if (index === -1) {
            console.log(`Producto con ID ${productoId} no encontrado`);
            return;
        }
        this.productos.splice(index, 1);
    }
}
```
#### Clase `Nodo`
La clase `Nodo` define un nodo de la lista enlazada que contiene un pedido y un puntero al siguiente nodo.

```javascript
class Nodo {
    constructor(pedido) {
        this.pedido = pedido;
        this.siguiente = null;
    }
}
```
#### Clase `LinkedList`
La clase `LinkedList` define la lista enlazada de pedidos, con métodos para agregar, eliminar, buscar y ordenar pedidos.

```javascript
class LinkedList {
    constructor() {
        this.cabeza = null;
    }

    aggFinal(pedido) {
        const nuevoNodo = new Nodo(pedido);
        if (!this.cabeza) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente) {
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }

    eliminarPedidoPorId(id) {
        if (!this.cabeza) {
            console.log("La lista está vacía");
            return;
        }

        if (this.cabeza.pedido.id === id) {
            this.cabeza = this.cabeza.siguiente;
            console.log(`Pedido con ID ${id} eliminado`);
            return;
        }

        let actual = this.cabeza;
        while (actual.siguiente && actual.siguiente.pedido.id !== id) {
            actual = actual.siguiente;
        }

        if (!actual.siguiente) {
            console.log(`Pedido con ID ${id} no encontrado`);
            return;
        }

        actual.siguiente = actual.siguiente.siguiente;
        console.log(`Pedido con ID ${id} eliminado`);
    }

    buscarPedido(id) {
        let actual = this.cabeza;
        while (actual) {
            if (actual.pedido.id === id) {
                return actual.pedido;
            }
            actual = actual.siguiente;
        }
        return null;
    }

    ordenarCriterio(criterio) {
        if (!this.cabeza || !this.cabeza.siguiente) {
            return;
        }

        let listaOrdenada = null;
        let actual = this.cabeza;

        while (actual) {
            const siguiente = actual.siguiente;

            if (!listaOrdenada || actual.pedido[criterio] < listaOrdenada.pedido[criterio]) {
                actual.siguiente = listaOrdenada;
                listaOrdenada = actual;
            } else {
                let temp = listaOrdenada;
                while (temp.siguiente && temp.siguiente.pedido[criterio] < actual.pedido[criterio]) {
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
        while (actual) {
            console.log(actual.pedido);
            actual = actual.siguiente;
        }
    }
}
```

#### Funciones Auxiliares
##### Registrar un Pedido
La función `registrarPedido` agrega un nuevo pedido a la lista enlazada.

```javascript
function registrarPedido(lista, id, cliente, productos, fecha, prioridad) {
    const nuevoPedido = new Pedido(id, cliente, productos, fecha, prioridad);
    lista.aggFinal(nuevoPedido);
}
```
#### Consultar un Pedido
La función `consultarPedido` busca y retorna un pedido por su identificador.

```javascript
function consultarPedido(lista, id) {
    return lista.buscarPedido(id);
}
```
### Ejemplo de Uso
Un ejemplo de cómo usar las clases y funciones definidas para gestionar pedidos.

```javascript
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
```

