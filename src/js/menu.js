(() => {
  const openMenuBtn = document.querySelector('[data-menu-open]');
  const closeMenuBtn = document.querySelector('[data-menu-close]');
  const menu = document.querySelector('[data-menu]');

  if (!openMenuBtn || !closeMenuBtn || !menu) return;

  const menuLinks = menu.querySelectorAll('.nav-list-mob a');
  const mobileJoinBtns = menu.querySelectorAll('[data-menu-join]');

  const setMenuOpen = isOpen => {
    menu.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    openMenuBtn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
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
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      openMenuBtn.focus();
    }
  });
})();
