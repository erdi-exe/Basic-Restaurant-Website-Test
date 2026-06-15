import { galleryImages } from '../data/content.js';

export function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!grid) return;

  grid.innerHTML = galleryImages
    .map(
      (img, i) => `
    <div class="gallery-item reveal-scale stagger-${(i % 6) + 1}" data-index="${i}" role="button" tabindex="0" aria-label="View ${img.alt}">
      <img data-src="${img.src}" alt="${img.alt}" loading="lazy" />
      <div class="gallery-item-icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/></svg>
      </div>
    </div>
  `
    )
    .join('');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    if (lightboxImg) {
      lightboxImg.src = galleryImages[index].src;
      lightboxImg.alt = galleryImages[index].alt;
    }
    lightbox?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + galleryImages.length) % galleryImages.length;
    if (lightboxImg) {
      lightboxImg.style.opacity = '0';
      setTimeout(() => {
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxImg.alt = galleryImages[currentIndex].alt;
        lightboxImg.style.opacity = '1';
      }, 200);
    }
  }

  grid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => openLightbox(Number(item.dataset.index)));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(Number(item.dataset.index));
      }
    });
  });

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', () => navigate(-1));
  nextBtn?.addEventListener('click', () => navigate(1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}
