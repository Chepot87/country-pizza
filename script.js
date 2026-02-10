// ========== MODAL FUNCIONALIDAD ==========

// === HAPPY HOURS MODAL ===
const happyModal = document.getElementById('happy-modal');
const openHappy = document.getElementById('open-happy');
const closeHappy = document.getElementById('close-happy');

// === MENÚ MODAL ===
const menuModal = document.getElementById('menu-modal');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

// Función para abrir modal
function openModal(modal, hasCards = false) {
  modal.classList.add('show');
  document.body.classList.add('modal-open');

  if (hasCards) {
    const cards = modal.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animation = 'none';
      void card.offsetHeight; // Trigger reflow
      card.style.animation = `fadeUpCard 0.5s ease-out forwards`;
      card.style.animationDelay = `${0.3 + index * 0.2}s`;
    });
  }
}

// Función para cerrar modal
function closeModal(modal) {
  modal.classList.remove('show');
  document.body.classList.remove('modal-open');
}

// === EVENTOS: HAPPY HOURS ===
if (happyModal && openHappy && closeHappy) {
  openHappy.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(happyModal, true); // true = tiene cards animadas
  });

  closeHappy.addEventListener('click', () => {
    closeModal(happyModal);
  });
}

// === EVENTOS: MENÚ ===
if (menuModal && openMenu && closeMenu) {
  openMenu.addEventListener('click', (e) => {
    e.preventDefault();
    openModal(menuModal);
  });

  closeMenu.addEventListener('click', () => {
    closeModal(menuModal);
  });
}

// === CERRAR MODAL SI HACES CLICK FUERA DEL CONTENIDO ===
window.addEventListener('click', (e) => {
  if (e.target === happyModal) closeModal(happyModal);
  if (e.target === menuModal) closeModal(menuModal);
});

// === CERRAR MODAL CON ESCAPE ===
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (happyModal.classList.contains('show')) closeModal(happyModal);
    if (menuModal.classList.contains('show')) closeModal(menuModal);
  }
});


// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Aplicar a todas las secciones
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

// Efecto interactivo en el título (se mueve un poco con el mouse)
document.addEventListener('mousemove', (e) => {
    const title = document.querySelector('h1');
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    title.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
