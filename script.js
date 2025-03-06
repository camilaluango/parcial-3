class producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;

    }
}

class cliente {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

class pedido {
    constructor(id, cliente, productos, fecha, prioridad) {
        this.id = id;
        this.cliente = cliente;
        this.productos = productos;
        this.fecha = fecha;
        this.prioridad = prioridad;
        this.procesado = false;

    }
    marcarProcesado(){
        this.procesado = true;

    }
}


class nodo {
    constructor(pedido){
        this.pedido = pedido;
        this.siguiente = null;

    }
}

class linkedList {
    constructor(){
        this.cabeza = null;
    }

    aggFinal (pedido){
        const nuevoNodo = new nodo (pedido);
        if (this.cabeza === null) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;
            while (actual.siguiente !== null){
                actual = actual.siguiente;
            }
            actual.siguiente = nuevoNodo;
        }
    }
    
}
