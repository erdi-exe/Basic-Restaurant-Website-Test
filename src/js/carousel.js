import { testimonials } from '../data/content.js';

function starSVG() {
  return '<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
}

export function initCarousel() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!track) return;

  track.innerHTML = testimonials
    .map(
      (t) => `
    <div class="testimonial-slide">
      <div class="testimonial-card">
        <div class="stars testimonial-stars" aria-label="${t.rating} out of 5 stars">
          ${starSVG().repeat(t.rating)}
        </div>
        <blockquote class="testimonial-text">${t.text}</blockquote>
        <div class="testimonial-author">
          <div class="testimonial-avatar">
            <img data-src="${t.avatar}" alt="${t.name}" width="56" height="56" loading="lazy" />
          </div>
          <div class="testimonial-author-info">
            <h4>${t.name}</h4>
            <p>${t.role}</p>
          </div>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  let current = 0;
  let autoplayInterval;

  function goTo(index) {
    current = (index + testimonials.length) % testimonials.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dotsContainer?.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-selected', i === current);
    });
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = testimonials
      .map((_, i) => `<button class="carousel-dot${i === 0 ? ' active' : ''}" aria-label="Go to testimonial ${i + 1}" aria-selected="${i === 0}"></button>`)
      .join('');

    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        resetAutoplay();
      });
    });
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAutoplay(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAutoplay(); });

  function startAutoplay() {
    autoplayInterval = setInterval(() => goTo(current + 1), 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAutoplay();
    }
  }, { passive: true });

  startAutoplay();

  track.closest('.testimonials-slider')?.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  track.closest('.testimonials-slider')?.addEventListener('mouseleave', startAutoplay);
}
