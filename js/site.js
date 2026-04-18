(function () {
  var root = document.documentElement;

  try {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('no-motion');
    }
  } catch (_) { /* ignore */ }

  function revealBody() { root.classList.remove('no-fouc'); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealBody, { once: true });
  } else {
    revealBody();
  }
})();
