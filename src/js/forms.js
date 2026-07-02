(() => {
  document.querySelectorAll('.footer-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
    });
  });
})();
