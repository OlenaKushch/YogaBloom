(() => {
  const overlay = document.querySelector('[data-modal]');
  if (!overlay) return;

  const planEl = overlay.querySelector('[data-modal-plan]');
  const priceEl = overlay.querySelector('[data-modal-price]');
  const closeBtn = overlay.querySelector('[data-modal-close]');
  const form = overlay.querySelector('[data-modal-form]');
  const dialog = overlay.querySelector('.modal');
  const openBtns = document.querySelectorAll('[data-modal-open]');

  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => !el.hasAttribute('disabled'));

  const openModal = (plan, price) => {
    lastFocusedElement = document.activeElement;

    if (planEl) planEl.textContent = plan;
    if (priceEl) priceEl.textContent = price;

    overlay.classList.add('is-open');
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const focusable = getFocusableElements();
    (focusable[0] || closeBtn)?.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('hidden', '');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    lastFocusedElement?.focus();
  };

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(btn.dataset.plan || '', btn.dataset.price || '');
    });
  });

  closeBtn?.addEventListener('click', closeModal);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeModal();
  });

  document.addEventListener('keydown', event => {
    if (!overlay.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeModal();
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

  form?.addEventListener('submit', event => {
    event.preventDefault();
    closeModal();
  });
})();
