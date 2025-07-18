import { VanillaCart } from './vanilla-cart.js';

const formatoPesos = n => "$" + n.toLocaleString("es-CO");

function cargarComponentes() {
  const header = document.querySelector("header#header");
  if(header) {
    fetch("components/header.html")
      .then(r => r.text())
      .then(h => {
        header.innerHTML = h;
        // Llamamos a la nueva función aquí, después de cargar el header
        activarHeaderEnCarrito();
      });
  }
  
  const footer = document.querySelector("footer#footer");
  if(footer) {
    fetch("components/footer.html")
      .then(r => r.text()).then(f => footer.innerHTML = f);
  }
}

function dibujarCarrito() {
  const cont = document.getElementById("lista-carrito"); 
  const totalCont = document.getElementById("total-carrito");
  const cart = new VanillaCart();
  const data = cart.all();

  if (!cont) return;
  cont.innerHTML = "";

  if (data.length === 0) {
    cont.innerHTML = "<p>Tu carrito está vacío.</p>";
    if (totalCont) totalCont.textContent = "";
    return;
  }

  data.forEach((p, i) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "item-en-carrito"; 
    tarjeta.innerHTML = `
      <img src="assets/img/${p.imagen}" alt="${p.nombre}">
      <h4>${p.nombre}</h4>
      <p>${p.descripcion || ""}</p>
      <p><strong>Precio:</strong> ${formatoPesos(p.precio)}</p>
      <label>Cantidad:
        <input type="number" min="1" value="${p.cantidad || 1}" data-idx="${i}" class="cantidad">
      </label>
      <p><strong>Subtotal:</strong> ${formatoPesos(p.precio * (p.cantidad || 1))}</p>
      <button class="remove" data-idx="${i}">Eliminar</button>
    `;
    cont.appendChild(tarjeta);
  });

  if (totalCont) {
    totalCont.innerHTML = `
        <div class="linea-total">
            <span>Subtotal:</span>
            <span>${formatoPesos(cart.total())}</span>
        </div>
        <div class="linea-total">
            <span>Envío:</span>
            <span>A calcular</span>
        </div>
        <hr>
        <div class="linea-total grande">
            <span>Total:</span>
            <span>${formatoPesos(cart.total())}</span>
        </div>
    `;
  }
}

// LA NUEVA FUNCIÓN AHORA ESTÁ AFUERA, SEPARADA Y CORRECTA
function activarHeaderEnCarrito() {
  const nav = document.querySelector('.main-nav');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  // Funcionalidad para la navegación principal
  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.href.includes('#')) {
        e.preventDefault();
        const categoria = e.target.getAttribute('href').substring(1);
        // Redirigimos al index con la categoría como parámetro
        window.location.href = `index.html?categoria=${categoria}`;
      }
    });
  }

  // Funcionalidad para el botón de búsqueda
  if (searchButton && searchInput) {
    const buscarYRedirigir = () => {
        const termino = searchInput.value;
        if (termino) {
            // Redirigimos al index con el término de búsqueda
            window.location.href = `index.html?busqueda=${termino}`;
        }
    };
    searchButton.addEventListener('click', buscarYRedirigir);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarYRedirigir();
        }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarComponentes();
  dibujarCarrito();
});

document.addEventListener("input", e => {
  if (e.target.classList.contains("cantidad")) {
    const index = parseInt(e.target.dataset.idx);
    const nuevaCantidad = parseInt(e.target.value);
    const cart = new VanillaCart();
    cart.updateCantidad(index, nuevaCantidad);
    dibujarCarrito();
  }
});

document.addEventListener("click", e => {
  const cart = new VanillaCart();
  if (e.target.classList.contains("remove")) {
    cart.remove(parseInt(e.target.dataset.idx));
    dibujarCarrito();
  }
  if (e.target.id === "vaciar-carrito-btn") {
    cart.clear();
    dibujarCarrito();
  }
});