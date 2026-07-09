import { getFocusableElements, trapFocus } from './a11y.js';

(() => {
  const openMenuBtn = document.querySelector('[data-menu-open]');
  const closeMenuBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');

  if (!openMenuBtn || !closeMenuBtn || !menu) return;

  const menuLinks = menu.querySelectorAll('.nav-list-mob a');
  const mobileJoinBtns = menu.querySelectorAll('[data-menu-join]');
  let lastFocusedElement = null;

  const setMenuOpen = isOpen => {
    if (isOpen) {
      lastFocusedElement = document.activeElement;
    }

    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    openMenuBtn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      const focusable = getFocusableElements(menu);
      (focusable[0] || closeMenuBtn).focus();
    } else {
      lastFocusedElement?.focus();
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  openMenuBtn.addEventListener('click', () => {
    setMenuOpen(!menu.classList.contains('is-open'));
  });
  closeMenuBtn.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileJoinBtns.forEach(btn => {
    btn.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (!menu.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    trapFocus(event, menu);
  });
})();
