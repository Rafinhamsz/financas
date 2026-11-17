(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tema ---------- */
  var themeBtn = document.getElementById('themeBtn');

  function isDark() {
    return root.classList.contains('theme-dark');
  }

  function syncThemeBtn() {
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-label', isDark() ? 'Ativar tema claro' : 'Ativar tema escuro');
    themeBtn.title = isDark() ? 'Tema claro' : 'Tema escuro';
  }

  syncThemeBtn();

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = !isDark();
      root.classList.toggle('theme-dark', dark);
      try { localStorage.setItem('cofre_theme_v1', dark ? 'dark' : 'light'); } catch (e) {}
      syncThemeBtn();
    });
  }

  /* ---------- Menu no celular ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open) {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    mobileMenu.hidden = !open;
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () {
      setMenu(mobileMenu.hidden);
    });
    mobileMenu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileMenu.hidden) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener('click', function (event) {
      if (mobileMenu.hidden) return;
      if (event.target.closest('#mobileMenu, #menuBtn')) return;
      setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860 && !mobileMenu.hidden) setMenu(false);
    });
  }

  /* ---------- Tour de telas ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tour-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.tour-panel'));

  function activateTab(tab, focus) {
    if (!tab) return;
    tabs.forEach(function (item) {
      var selected = item === tab;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-selected', selected ? 'true' : 'false');
      item.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel) {
      var active = panel.id === tab.getAttribute('aria-controls');
      panel.hidden = !active;
      panel.classList.remove('is-entering');
      if (active) {
        // reinicia a animação de entrada
        void panel.offsetWidth;
        if (!reduceMotion) panel.classList.add('is-entering');
      }
    });
    if (focus) tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { activateTab(tab, false); });
    tab.addEventListener('keydown', function (event) {
      var next = null;
      var key = event.key;
      if (key === 'ArrowDown' || key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      else if (key === 'ArrowUp' || key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (key === 'Home') next = tabs[0];
      else if (key === 'End') next = tabs[tabs.length - 1];
      if (!next) return;
      event.preventDefault();
      activateTab(next, true);
    });
  });

  /* ---------- FAQ ---------- */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll('.faq-item'));

  faqItems.forEach(function (item) {
    var button = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    if (!button || !answer) return;

    if (answer.hidden) answer.hidden = false;
    var open = item.classList.contains('is-open');
    button.setAttribute('aria-expanded', open ? 'true' : 'false');
    answer.setAttribute('aria-hidden', open ? 'false' : 'true');

    button.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');

      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove('is-open');
        var otherBtn = other.querySelector('.faq-q');
        var otherAnswer = other.querySelector('.faq-a');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
      });

      item.classList.toggle('is-open', willOpen);
      button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      answer.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
    });
  });

  /* ---------- Revelação no scroll ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -36px 0px', threshold: 0.12 });

    revealItems.forEach(function (el) { observer.observe(el); });
  }
})();
