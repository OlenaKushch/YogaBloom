import { getFocusableElements, trapFocus } from './a11y.js';

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

  const openModal = (plan, price) => {
    lastFocusedElement = document.activeElement;

    if (planEl) planEl.textContent = plan;
    if (priceEl) priceEl.textContent = price;

    overlay.classList.add('is-open');
    overlay.removeAttribute('hidden');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const focusable = getFocusableElements(dialog);
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

    trapFocus(event, dialog);
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    closeModal();
  });
})();
