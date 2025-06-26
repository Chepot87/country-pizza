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
