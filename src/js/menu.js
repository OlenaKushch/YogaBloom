(() => {
  const openMenuBtn = document.querySelector('[data-menu-open]');
  const closeMenuBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');

  if (!openMenuBtn || !closeMenuBtn || !menu) return;

  const menuLinks = menu.querySelectorAll('.nav-list-mob a');
  const mobileJoinBtns = menu.querySelectorAll('[data-menu-join]');
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      menu.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));

  const setMenuOpen = isOpen => {
    if (isOpen) {
      lastFocusedElement = document.activeElement;
    }

    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    openMenuBtn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
      const focusable = getFocusableElements();
      (focusable[0] || closeMenuBtn).focus();
    } else {
      lastFocusedElement?.focus();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menu.classList.contains('is-open'));
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
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
      openMenuBtn.focus();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = getFocusableElements();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
