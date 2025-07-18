import { VanillaCart } from './vanilla-cart.js';

export const productos = {
  rostro: [
    { nombre: "Base Líquida", descripcion: "Cobertura media", imagen: "rostro1.jpg", precio: 20000 },
    { nombre: "Corrector de Ojeras", descripcion: "Alta cobertura", imagen: "rostro2.jpg", precio: 15000 },
    { nombre: "Polvo Compacto", descripcion: "Efecto mate", imagen: "rostro3.jpg", precio: 18000 },
    { nombre: "Rubor en Crema", descripcion: "Tono durazno", imagen: "rostro4.jpg", precio: 16000 }
  ],
  ojos: [
    { nombre: "Sombra Paleta Nude", descripcion: "12 tonos tierra", imagen: "ojos1.jpg", precio: 25000 },
    { nombre: "Delineador Líquido", descripcion: "Punta fina, negro", imagen: "ojos2.jpg", precio: 14000 },
    { nombre: "Pestañina Volumen", descripcion: "A prueba de agua", imagen: "ojos3.jpg", precio: 19000 },
    { nombre: "Lápiz de Cejas", descripcion: "Tono café medio", imagen: "ojos4.jpg", precio: 12000 }
  ],
  labios: [
    { nombre: "Labial Mate Rojo", descripcion: "Larga duración", imagen: "labios1.jpg", precio: 20000 },
    { nombre: "Brillo Voluminizador", descripcion: "Efecto mentolado", imagen: "labios2.jpg", precio: 17000 },
    { nombre: "Delineador de Labios", descripcion: "Tono vino", imagen: "labios3.jpg", precio: 11000 },
    { nombre: "Tinta de Labios", descripcion: "Acabado natural", imagen: "labios4.jpg", precio: 22000 }
  ],
  uñas: [
    { nombre: "Esmalte Rosa Lila", descripcion: "Gel nivelador 15ml", imagen: "uñas1.jpg", precio: 22000 },
    { nombre: "Esmalte Rojo Clásico", descripcion: "Brillo intenso", imagen: "uñas2.jpg", precio: 9000 },
    { nombre: "Base Fortalecedora", descripcion: "Con calcio y vitaminas", imagen: "uñas3.jpg", precio: 13000 },
    { nombre: "Top Coat Brillo Gel", descripcion: "Secado rápido", imagen: "uñas4.jpg", precio: 13000 }
  ],
  pielCabello: [
    { nombre: "Crema Nutritiva", descripcion: "Hidratación 24h", imagen: "pielcabello1.jpg", precio: 25000 },
    { nombre: "Sérum Facial Vit-C", descripcion: "Antioxidante", imagen: "pielcabello2.jpg", precio: 35000 },
    { nombre: "Aceite para Puntas", descripcion: "Repara y da brillo", imagen: "pielcabello3.jpg", precio: 28000 },
    { nombre: "Mascarilla Capilar", descripcion: "Hidratación profunda", imagen: "pielcabello4.jpg", precio: 30000 }
  ],
  accesorios: [
    { nombre: "Brocha para Polvo", descripcion: "Cerdas suaves y densas", imagen: "accesorio1.jpg", precio: 15000 },
    { nombre: "Esponja de Maquillaje", descripcion: "Para base líquida", imagen: "accesorio2.jpg", precio: 8000 },
    { nombre: "Rizador de Pestañas", descripcion: "Acero inoxidable", imagen: "accesorio3.jpg", precio: 12000 },
    { nombre: "Set de Manicura", descripcion: "Incluye 5 herramientas", imagen: "accesorio4.jpg", precio: 25000 }
  ]
};

const testimonios = [
  { imagen: 'testimonio1.jpg' },
  { imagen: 'testimonio2.jpg' },
  { imagen: 'testimonio3.jpg' },
  { imagen: 'testimonio4.jpg' },
  { imagen: 'testimonio5.jpg' }
];

const carrito = new VanillaCart();
const productosPorCarga = 6;
let productosMostrados = productosPorCarga;
let productosActuales = Object.values(productos).flat();

function mostrarProductos(filtro) {
    const grid = document.getElementById("grid-productos");
    if (!grid) return;
    grid.innerHTML = ""; // Limpiamos la cuadrícula para el nuevo filtro

    // Reiniciamos el contador de productos
    productosMostrados = productosPorCarga;

    // Filtramos los productos según la categoría seleccionada
    let productosFiltrados;
    if (filtro === 'todos') {
        productosFiltrados = Object.values(productos).flat();
    } else {
        productosFiltrados = productos[filtro] || [];
    }
    productosActuales = productosFiltrados; // Actualizamos la lista actual

    // Mostramos solo los primeros X productos
    dibujarProductos(productosFiltrados.slice(0, productosPorCarga));
    
    // Y actualizamos el botón "Ver más"
    gestionarBotonVerMas();
}

function dibujarProductos(lista) {
    const grid = document.getElementById("grid-productos");
    if (!grid) return;

    lista.forEach(p => {
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

function gestionarBotonVerMas() {
    const btn = document.getElementById("btn-ver-mas");
    if (!btn) return;
    
    // Si la cantidad de productos actuales es menor o igual a los mostrados, ocultamos el botón
    if (productosActuales.length <= productosMostrados) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'block';
    }
}

function cargarMasProductos() {
    const grid = document.getElementById("grid-productos");
    if (!grid) return;
    
    const siguientesProductos = productosActuales.slice(productosMostrados, productosMostrados + productosPorCarga);
    dibujarProductos(siguientesProductos);
    productosMostrados += productosPorCarga;
    gestionarBotonVerMas();
}


function crearFiltros() {
  const cont = document.querySelector(".filtros-categoria");
  if (!cont) return;
  cont.innerHTML = `<button class="filtro-btn active" data-filtro="todos">Todos</button>`;
  Object.keys(productos).forEach(id => {
    const nombreCat = id === "pielCabello" ? "Piel y Cabello" : id.charAt(0).toUpperCase() + id.slice(1);
    cont.innerHTML += `<button class="filtro-btn" data-filtro="${id}">${nombreCat}</button>`;
  });
  cont.addEventListener('click', e => {
    if (e.target.classList.contains('filtro-btn')) {
      cont.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      const filtro = e.target.dataset.filtro;
      productosMostrados = productosPorCarga; // Reiniciamos el contador de productos
      mostrarProductos(filtro);
    }
  });
}

// El resto de tus funciones
function activarNavPrincipal() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;
  nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault(); 
      const categoria = e.target.getAttribute('href').substring(1);
      if (!categoria) return;
      const filtros = document.querySelector('.filtros-categoria');
      if (filtros) {
        filtros.querySelectorAll('.filtro-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.filtro === categoria);
        });
      }
      productosMostrados = productosPorCarga;
      mostrarProductos(categoria);
      const seccionProductos = document.querySelector('.productos-destacados');
      if (seccionProductos) {
        seccionProductos.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
}

function activarBusqueda() {
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  if (!searchButton || !searchInput) return;
  const buscar = () => {
    const termino = searchInput.value.toLowerCase();
    const todosLosProductos = Object.values(productos).flat();
    const productosEncontrados = todosLosProductos.filter(p => p.nombre.toLowerCase().includes(termino) || p.descripcion.toLowerCase().includes(termino));
    const grid = document.getElementById("grid-productos");
    if (!grid) return;
    grid.innerHTML = "";
    if (productosEncontrados.length > 0) {
      productosEncontrados.forEach(p => {
        grid.innerHTML += `
          <div class="tarjeta">
            <img src="assets/img/${p.imagen}" alt="${p.nombre}">
            <h4>${p.nombre}</h4>
            <p>${p.descripcion}</p>
            <p><strong>Precio:</strong> $${p.precio.toLocaleString()}</p>
            <button class="add-to-cart" data-name="${p.nombre}" data-price="${p.precio}" data-img="${p.imagen}" data-desc="${p.descripcion}">
              Agregar 🛒
            </button>
          </div>`;
      });
    } else {
      grid.innerHTML = `<p>No se encontraron productos para "${searchInput.value}"</p>`;
    }
    const filtros = document.querySelector('.filtros-categoria');
    if (filtros) {
      filtros.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
    }
    const botonCarga = document.getElementById("btn-ver-mas");
    if(botonCarga) botonCarga.style.display = 'none';
  };
  searchButton.addEventListener('click', buscar);
  searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') buscar();
  });
}

function cargarTestimonios() {
  const track = document.getElementById('track-testimonios');
  if (!track) return;
  testimonios.forEach(testimonio => {
    track.innerHTML += `
      <div class="slide-testimonio">
        <img src="assets/img/${testimonio.imagen}" alt="Testimonio de cliente">
      </div>
    `;
  });
}

function activarCarruselYZoom() {
    const track = document.getElementById('track-testimonios');
    const prevBtn = document.getElementById('prev-testimonio');
    const nextBtn = document.getElementById('next-testimonio');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImage = document.getElementById('lightbox-image');

    if (track && prevBtn && nextBtn) {
      const slides = track.querySelectorAll('.slide-testimonio');
      if (slides.length > 0) {
        const slideCount = slides.length;
        const slidesVisible = 3;
        const maxSteps = slideCount <= slidesVisible ? 0 : slideCount - slidesVisible;
        let currentIndex = 0;
        function updateCarousel() {
          const slideWidth = slides[0].offsetWidth;
          track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
        nextBtn.addEventListener('click', () => {
          currentIndex = (currentIndex < maxSteps) ? currentIndex + 1 : 0;
          updateCarousel();
        });
        prevBtn.addEventListener('click', () => {
          currentIndex = (currentIndex > 0) ? currentIndex - 1 : maxSteps;
          updateCarousel();
        });
      }
    }

    if (track && lightboxOverlay && lightboxImage) {
      track.addEventListener('click', e => {
        if (e.target.tagName === 'IMG' && e.target.closest('.slide-testimonio')) {
          lightboxImage.src = e.target.src;
          lightboxOverlay.classList.add('active');
        }
      });
      lightboxOverlay.addEventListener('click', () => {
        lightboxOverlay.classList.remove('active');
      });
    }
}

function activarCategoriasVisuales() {
  const grid = document.querySelector('.grid-categorias');
  if (!grid) return;

  grid.addEventListener('click', (e) => {
    const categoriaItem = e.target.closest('.categoria-item');
    
    if (categoriaItem && categoriaItem.dataset.categoria) {
      e.preventDefault();
      const categoria = categoriaItem.dataset.categoria;

      document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filtro === categoria);
      });

      productosMostrados = productosPorCarga;
      mostrarProductos(categoria);

      document.querySelector('.productos-destacados')?.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function cargarComponentes() {
  const header = document.querySelector("header#header");
  if (header) {
      fetch("components/header.html")
        .then(r => r.text())
        .then(h => {
          header.innerHTML = h;
          activarNavPrincipal(); 
          activarBusqueda();
        });
  }
  const footer = document.querySelector("footer#footer");
  if (footer) {
      fetch("components/footer.html")
        .then(r => r.text()).then(f => footer.innerHTML = f);
  }
}

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

// --- INICIO DE LA APP ---
document.addEventListener("DOMContentLoaded", () => {
  cargarComponentes();
  crearFiltros();
  
  // Asignamos el evento al botón de "Ver más"
  const btnVerMas = document.getElementById("btn-ver-mas");
  if (btnVerMas) {
      btnVerMas.addEventListener('click', cargarMasProductos);
  }

  const parametrosURL = new URLSearchParams(window.location.search);
  const categoriaURL = parametrosURL.get('categoria');
  const busquedaURL = parametrosURL.get('busqueda');

  if (categoriaURL) {
    mostrarProductos(categoriaURL);
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filtro === categoriaURL);
    });
  } else if (busquedaURL) {
    setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        if (searchInput && searchButton) {
            searchInput.value = busquedaURL;
            searchButton.click();
        }
    }, 200);
  } else {
    mostrarProductos('todos');
  }

  cargarTestimonios();
  activarCarruselYZoom();
  activarCategoriasVisuales();
});