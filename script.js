// ========== MODAL FUNCIONALIDAD ==========

// === HAPPY HOURS MODAL ===
const happyModal = document.getElementById('happy-modal');
const openHappy = document.getElementById('open-happy');
const closeHappy = document.getElementById('close-happy');

if (happyModal && openHappy && closeHappy) {
  openHappy.addEventListener('click', (e) => {
    e.preventDefault();
    happyModal.classList.add('show');

    // Reiniciar animaciones de las tarjetas
    const cards = happyModal.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.animation = 'none';
      void card.offsetHeight; // Trigger reflow
      card.style.animation = `fadeUpCard 0.5s ease-out forwards`;
      card.style.animationDelay = `${0.3 + index * 0.2}s`;
    });
  });

  closeHappy.addEventListener('click', () => {
    happyModal.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (e.target === happyModal) {
      happyModal.classList.remove('show');
    }
  });
}

// === MENÚ MODAL ===
const menuModal = document.getElementById('menu-modal');
const openMenu = document.getElementById('open-menu');
const closeMenu = document.getElementById('close-menu');

if (menuModal && openMenu && closeMenu) {
  openMenu.addEventListener('click', (e) => {
    e.preventDefault();
    menuModal.classList.add('show');
  });

  closeMenu.addEventListener('click', () => {
    menuModal.classList.remove('show');
  });

  window.addEventListener('click', (e) => {
    if (e.target === menuModal) {
      menuModal.classList.remove('show');
    }
  });
}
