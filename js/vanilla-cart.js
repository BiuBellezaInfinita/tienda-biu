export class VanillaCart {
  constructor({ storageKey = "carrito" } = {}) {
    this.key = storageKey;
    this.data = JSON.parse(localStorage.getItem(this.key) || "[]");
  }

  #save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  }

  add(p) {
    const existente = this.data.find(item => item.nombre === p.nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      p.cantidad = 1;
      this.data.push(p);
    }
    this.#save();
  }

  all() { return this.data; }

  remove(index) {
    this.data.splice(index, 1);
    this.#save();
  }

  clear() {
    this.data = [];
    this.#save();
  }

  updateCantidad(index, nuevaCantidad) {
    if (nuevaCantidad <= 0) {
      this.remove(index);
    } else {
      this.data[index].cantidad = nuevaCantidad;
      this.#save();
    }
  }

  total() {
    return this.data.reduce((t, p) => t + (p.precio * (p.cantidad || 1)), 0);
  }
}
