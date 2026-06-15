import { menuData } from '../data/content.js';

export function initMenu() {
  const container = document.getElementById('menu-grid');
  const tabs = document.querySelectorAll('.filter-tab');

  if (!container) return;

  const allItems = Object.entries(menuData).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  );

  container.innerHTML = allItems
    .map(
      (item) => `
    <article class="menu-item" data-category="${item.category}">
      <div class="menu-item-image">
        <img data-src="${item.image}" alt="${item.name}" width="90" height="90" loading="lazy" />
      </div>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <h4>${item.name}</h4>
          <span class="menu-item-dots" aria-hidden="true"></span>
          <span class="menu-item-price">$${item.price}</span>
        </div>
        <p class="menu-item-desc">${item.description}</p>
      </div>
    </article>
  `
    )
    .join('');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      const items = container.querySelectorAll('.menu-item');

      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !show);
        if (show) {
          item.style.animation = 'fadeInUp 0.4s ease forwards';
        }
      });
    });
  });
}
