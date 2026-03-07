// ==========================================================================
// COUNTRY PIZZA - script.js
// Modals + reveal on scroll + hero title tilt
// ==========================================================================

// ==========================================================================
// 1) ELEMENTOS
// ==========================================================================
const body = document.body;

// Happy Hours modal
const happyModal = document.getElementById("happy-modal");
const openHappy = document.getElementById("open-happy");
const closeHappy = document.getElementById("close-happy");

// Menú modal
const menuModal = document.getElementById("menu-modal");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");

// Hero title
const heroTitle = document.getElementById("hero-title");

// ==========================================================================
// 2) FUNCIONES DE MODAL
// ==========================================================================
function openModal(modal, animateCards = false) {
  if (!modal) return;

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");

  if (animateCards) {
    const cards = modal.querySelectorAll(".card");

    cards.forEach((card, index) => {
      card.style.animation = "none";
      void card.offsetHeight; // fuerza reflow
      card.style.animation = "fadeUpCard 0.5s ease-out forwards";
      card.style.animationDelay = `${0.3 + index * 0.2}s`;
    });
  }
}

function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

function bindModal({ modal, openBtn, closeBtn, animateCards = false }) {
  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    openModal(modal, animateCards);
  });

  closeBtn.addEventListener("click", () => {
    closeModal(modal);
  });
}

// ==========================================================================
// 3) INICIALIZAR MODALS
// ==========================================================================
bindModal({
  modal: happyModal,
  openBtn: openHappy,
  closeBtn: closeHappy,
  animateCards: true,
});

bindModal({
  modal: menuModal,
  openBtn: openMenu,
  closeBtn: closeMenu,
});

// Cerrar modal haciendo click fuera del contenido
window.addEventListener("click", (e) => {
  if (happyModal && e.target === happyModal) closeModal(happyModal);
  if (menuModal && e.target === menuModal) closeModal(menuModal);
});

// Cerrar modal con Escape
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  if (happyModal?.classList.contains("show")) closeModal(happyModal);
  if (menuModal?.classList.contains("show")) closeModal(menuModal);
});

// ==========================================================================
// 4) REVEAL AL HACER SCROLL
// Se anima una vez y luego se queda quieto
// ==========================================================================
const revealSections = document.querySelectorAll("section:not(#hero)");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealSections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
    revealObserver.observe(section);
  });
} else {
  // fallback para navegadores viejos
  revealSections.forEach((section) => {
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
  });
}

// ==========================================================================
// 5) EFECTO INTERACTIVO EN EL TÍTULO DEL HERO
// Usa CSS variables --rx y --ry
// ==========================================================================
if (heroTitle) {
  document.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    heroTitle.style.setProperty("--rx", `${x}deg`);
    heroTitle.style.setProperty("--ry", `${y}deg`);
  });

  document.addEventListener("mouseleave", () => {
    heroTitle.style.setProperty("--rx", "0deg");
    heroTitle.style.setProperty("--ry", "0deg");
  });

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < 40) {
        heroTitle.style.setProperty("--rx", "0deg");
        heroTitle.style.setProperty("--ry", "0deg");
      }
    },
    { passive: true }
  );
}