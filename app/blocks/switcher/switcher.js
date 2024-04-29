app.switcherHandlers = {
  name: 'switcherHandlers',
  description: 'Additional block switching handling',
  init() {
    this.switcherHandling();
  },
  switcherHandling() {
    const companies = document.querySelectorAll('.company');

    companies.forEach((el) => {
      const switcherBtn = el.querySelector('.switcher__btn');
      const additional = el.querySelector('.additional');

      switcherBtn.addEventListener('click', () => {
        if (switcherBtn.classList.contains('is-active')) {
          additional.classList.remove('is-active');
          switcherBtn.classList.remove('is-active');
          switcherBtn.innerHTML = 'More info';
        } else {
          switcherBtn.innerHTML = 'Hide info';
          switcherBtn.classList.add('is-active');
          additional.classList.add('is-active');
        }
      });
    });
  },
};
