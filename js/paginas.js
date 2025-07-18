// --- FUNCIÓN PARA ACTIVAR LA BÚSQUEDA Y NAVEGACIÓN ---
function activarHeader() {
  const nav = document.querySelector('.main-nav');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  // Funcionalidad para la navegación principal
  if (nav) {
    nav.addEventListener('click', (e) => {
      // Si se hace clic en un enlace de categoría
      if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const categoria = e.target.getAttribute('href').substring(1);
        // Redirigimos al index con la categoría como parámetro en la URL
        window.location.href = `index.html?categoria=${categoria}`;
      }
    });
  }

  // Funcionalidad para el botón de búsqueda
  if (searchButton && searchInput) {
    const buscarYRedirigir = () => {
        const termino = searchInput.value;
        if (termino) {
            // Redirigimos al index con el término de búsqueda en la URL
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

// --- FUNCIÓN PARA CARGAR HEADER Y FOOTER ---
function cargarComponentes() {
  const header = document.querySelector("header#header");
  if (header) {
    fetch("components/header.html")
      .then(r => r.text())
      .then(h => {
        header.innerHTML = h;
        // Activamos el header DESPUÉS de que se haya cargado
        activarHeader(); 
      });
  }

  const footer = document.querySelector("footer#footer");
  if (footer) {
    fetch("components/footer.html")
      .then(r => r.text()).then(f => footer.innerHTML = f);
  }
}


// --- INICIO ---
document.addEventListener("DOMContentLoaded", () => {
  cargarComponentes();
});