// Sanctuary marketing site — minimal client JS.
// Dark-mode toggle, mobile nav, screenshot lightbox, install-tabs.
// No dependencies. Safe on every page; features that lack their target DOM no-op.

(function () {
  'use strict';

  // --- Dark mode ---------------------------------------------------------
  // Theme resolution: explicit user choice in localStorage wins; otherwise
  // defer to prefers-color-scheme. We write 'dark' or 'light' to the root.
  const STORAGE_KEY = 'sanctuary-theme';
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      const sunIcon = toggle.querySelector('[data-icon="sun"]');
      const moonIcon = toggle.querySelector('[data-icon="moon"]');
      if (sunIcon) sunIcon.style.display = theme === 'dark' ? 'inline' : 'none';
      if (moonIcon) moonIcon.style.display = theme === 'dark' ? 'none' : 'inline';
    }
  }

  function currentTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply as early as possible so subsequent DOM work sees the right classes.
  applyTheme(currentTheme());

  function bindThemeToggle() {
    const toggle = document.querySelector('[data-theme-toggle]');
    if (!toggle) return;
    applyTheme(currentTheme()); // refresh icon state once the button exists
    toggle.addEventListener('click', () => {
      const next = root.classList.contains('dark') ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
    // Respond to OS-level changes only if the user hasn't expressed a preference.
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? 'dark' : 'light');
    });
  }

  // --- Mobile nav --------------------------------------------------------
  function bindMobileNav() {
    const button = document.querySelector('[data-mobile-nav-toggle]');
    const panel = document.querySelector('[data-mobile-nav]');
    if (!button || !panel) return;
    button.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    panel.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        panel.classList.remove('open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Screenshot lightbox ----------------------------------------------
  function bindLightbox() {
    const thumbs = document.querySelectorAll('[data-lightbox-src]');
    if (thumbs.length === 0) return;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Screenshot preview');
    const img = document.createElement('img');
    img.alt = '';
    overlay.appendChild(img);
    document.body.appendChild(overlay);

    function open(src, alt) {
      img.src = src;
      img.alt = alt || '';
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        const src = thumb.getAttribute('data-lightbox-src');
        const alt = thumb.getAttribute('data-lightbox-alt') || thumb.getAttribute('alt') || '';
        open(src, alt);
      });
    });
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  // --- Install tabs ------------------------------------------------------
  function bindInstallTabs() {
    const tablist = document.querySelector('[data-install-tabs]');
    if (!tablist) return;
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"][data-install-panel]');

    function select(id) {
      tabs.forEach((t) => {
        const selected = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((p) => {
        p.classList.toggle('active', p.id === id);
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => select(tab.getAttribute('aria-controls')));
      tab.addEventListener('keydown', (e) => {
        const list = Array.from(tabs);
        const i = list.indexOf(tab);
        if (e.key === 'ArrowRight') list[(i + 1) % list.length].focus();
        else if (e.key === 'ArrowLeft') list[(i - 1 + list.length) % list.length].focus();
      });
    });
  }

  // --- Built-so-far timeline --------------------------------------------
  function bindTimeline() {
    const root = document.querySelector('[data-timeline]');
    if (!root) return;
    const points = Array.from(root.querySelectorAll('[data-timeline-point]'));
    const details = Array.from(root.querySelectorAll('[data-timeline-detail]'));
    if (points.length === 0) return;

    function select(id, { focus = false } = {}) {
      points.forEach((p) => {
        const sel = p.getAttribute('data-timeline-point') === id;
        p.setAttribute('aria-selected', sel ? 'true' : 'false');
        p.tabIndex = sel ? 0 : -1;
        if (sel && focus) p.focus();
      });
      details.forEach((d) => {
        if (d.getAttribute('data-timeline-detail') === id) d.setAttribute('data-active', '');
        else d.removeAttribute('data-active');
      });
    }

    points.forEach((p) => {
      p.addEventListener('click', () => select(p.getAttribute('data-timeline-point')));
      p.addEventListener('keydown', (e) => {
        const i = points.indexOf(p);
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const next = points[(i + 1) % points.length];
          select(next.getAttribute('data-timeline-point'), { focus: true });
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = points[(i - 1 + points.length) % points.length];
          select(prev.getAttribute('data-timeline-point'), { focus: true });
        } else if (e.key === 'Home') {
          e.preventDefault();
          select(points[0].getAttribute('data-timeline-point'), { focus: true });
        } else if (e.key === 'End') {
          e.preventDefault();
          select(points[points.length - 1].getAttribute('data-timeline-point'), { focus: true });
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            root.classList.add('is-revealed');
            io.disconnect();
          }
        });
      }, { threshold: 0.2 });
      io.observe(root);
    } else {
      root.classList.add('is-revealed');
    }
  }

  // --- Init --------------------------------------------------------------
  function init() {
    bindThemeToggle();
    bindMobileNav();
    bindLightbox();
    bindInstallTabs();
    bindTimeline();
    document.documentElement.classList.remove('no-fouc');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
