import { productos } from './script.js'; // Importamos la lista de productos
import { VanillaCart } from './vanilla-cart.js'; // Importamos la clase del carrito

const carrito = new VanillaCart();

// --- FUNCIONES PARA ESTA PÁGINA ---
function activarHeader() {
  const nav = document.querySelector('.main-nav');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const categoria = e.target.getAttribute('href').substring(1);
        window.location.href = `index.html?categoria=${categoria}`;
      }
    });
  }
  if (searchButton && searchInput) {
    const buscarYRedirigir = () => {
        const termino = searchInput.value;
        if (termino) window.location.href = `index.html?busqueda=${termino}`;
    };
    searchButton.addEventListener('click', buscarYRedirigir);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscarYRedirigir();
    });
  }
}

function cargarComponentes() {
  const header = document.querySelector("header#header");
  if (header) {
    fetch("components/header.html")
      .then(r => r.text())
      .then(h => {
        header.innerHTML = h;
        activarHeader();
      });
  }
  const footer = document.querySelector("footer#footer");
  if (footer) {
    fetch("components/footer.html")
      .then(r => r.text()).then(f => footer.innerHTML = f);
  }
}

function mostrarAccesorios() {
    const grid = document.getElementById('grid-accesorios');
    if (!grid || !productos.accesorios) return;

    const listaAccesorios = productos.accesorios;
    listaAccesorios.forEach(p => {
        grid.innerHTML += `
        <div class="tarjeta">
            <img src="assets/img/${p.imagen}" alt="${p.nombre}">
            <h4>${p.nombre}</h4>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> $${p.precio.toLocaleString()}</p>
            <button class="add-to-cart"
            data-name="${p.nombre}" data-price="${p.precio}" data-img="${p.imagen}" data-desc="${p.descripcion}">
            Agregar 🛒
            </button>
        </div>`;
    });
}

// --- EVENTO PARA AÑADIR AL CARRITO (ESPECÍFICO PARA ESTA PÁGINA) ---
document.addEventListener("click", e => {
    if (e.target.classList.contains("add-to-cart")) {
      const btn = e.target;
      carrito.add({
          nombre: btn.dataset.name,
          descripcion: btn.dataset.desc,
          imagen: btn.dataset.img,
          precio: parseInt(btn.dataset.price),
          cantidad: 1
      });
      alert(`${btn.dataset.name} agregado al carrito 🛒`);
    }
});

// --- INICIO DE LA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    cargarComponentes();
    mostrarAccesorios();
});