export function initLoader() {
  const loader = document.getElementById('loader');
  const transition = document.getElementById('page-transition');

  function hideLoader() {
    if (loader) loader.classList.add('hidden');
    document.body.classList.remove('loading');

    if (transition) {
      transition.classList.add('active');
      setTimeout(() => transition.classList.remove('active'), 1000);
    }
  }

  document.body.classList.add('loading');

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1200);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1200));
  }

  // Safety: never block the page longer than 3s
  setTimeout(hideLoader, 3000);
}
