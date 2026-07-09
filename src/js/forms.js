(() => {
  document.querySelectorAll('.footer-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      form.reset();
    });
  });
})();
