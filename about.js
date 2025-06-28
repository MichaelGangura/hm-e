document.addEventListener('DOMContentLoaded', function () {
  const aboutSection = document.querySelector('.static-content');
  const track = aboutSection && aboutSection.querySelector('.logo-carousel-track');
  const carousel = aboutSection && aboutSection.querySelector('.logo-carousel');
  if (carousel && track) {
    // Клонуємо логотипи для безшовної анімації
    carousel.innerHTML += carousel.innerHTML;

    setTimeout(() => {
      const carouselWidth = carousel.scrollWidth / 2;
      let scroll = 0;
      const speed = 1; // px per frame

      let rafId = null;
      function loop() {
        scroll += speed;
        if (scroll >= carouselWidth) {
          scroll = 0;
        }
        track.scrollLeft = scroll;
        rafId = requestAnimationFrame(loop);
      }
      loop();
    }, 100);
  }
  const fadeText = document.querySelector('.fade-in-text');
  if (fadeText) {
    setTimeout(() => {
      fadeText.classList.add('visible');
    }, 300); // затримка для ефекту
  }
  // --- Додаємо обробник для "назад до галереї" ---
  const backToGallery = document.getElementById('back-to-gallery');
  if (backToGallery) {
    backToGallery.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('.static-content').style.display = 'none';
      document.getElementById('gallery-root').style.display = '';
      // Знімаємо клас active з бургер-кнопки і закриваємо меню
      const burgerBtn = document.getElementById('burger-menu-btn');
      if (burgerBtn) burgerBtn.classList.remove('active');
      const burgerMenu = document.getElementById('burger-menu');
      if (burgerMenu) burgerMenu.style.display = 'none';
      if (rafId) cancelAnimationFrame(rafId);
    });
  }
});