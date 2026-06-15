import { initLoader } from './js/loader.js';

document.documentElement.classList.add('js-ready');
import { initNavbar } from './js/navbar.js';
import { initTheme } from './js/theme.js';
import { initScroll, initReveal, initLazyImages } from './js/scroll.js';
import { initMenu } from './js/menu.js';
import { initGallery } from './js/gallery.js';
import { initCarousel } from './js/carousel.js';
import { initReservation, initContact, initNewsletter } from './js/forms.js';
import { initParallax, initFilterTabs } from './js/effects.js';

initLoader();
initTheme();
initNavbar();
initScroll();
initMenu();
initGallery();
initCarousel();
initReservation();
initContact();
initNewsletter();
initParallax();
initFilterTabs();

window.addEventListener('load', () => {
  initReveal();
  initLazyImages();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
