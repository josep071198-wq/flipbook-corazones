const book = document.getElementById('book');
const pages = document.querySelectorAll('.page');
const audio = document.querySelector('audio');
const portada = document.querySelector('.cover');
const portadaMensaje = portada.querySelector('small');

let currentPage = 0;
let flipping = false;

// Actualiza la vista de las páginas
function updatePages() {
  pages.forEach((page, index) => {
    page.style.zIndex = pages.length - index;
    page.style.transform = index < currentPage ? 'rotateY(-180deg)' : 'rotateY(0deg)';
  });
}

// Función para voltear páginas automáticamente en bucle
function autoFlipPages() {
  if (flipping) return;
  flipping = true;

  // Ocultar mensaje de portada al primer clic
  if (portadaMensaje) portadaMensaje.style.display = 'none';

  // Reproducir música si aún no lo hace
  if (audio && audio.paused) {
    audio.play().catch(() => {});
  }

  const interval = 6000; // Tiempo entre páginas (ms)

  const flipNext = () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
    } else {
      currentPage = 0; // Volver a mostrar portada (pero sin el mensaje)
    }
    updatePages();
    setTimeout(flipNext, interval);
  };

  flipNext();
}

// Detectar clic en la portada
if (portada) {
  portada.style.cursor = 'pointer';
  portada.addEventListener('click', autoFlipPages);
}

// Estado inicial
updatePages();

 document.addEventListener('DOMContentLoaded', () => {
  const heartContainer = document.querySelector('.heart-container');

  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 2) + 's';
    heart.style.width = heart.style.height = (20 + Math.random() * 30) + 'px';
    heartContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  setInterval(createHeart, 300);
});