document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.header__menu-toggle');
  const menu = document.getElementById('mobileMenu');
  const menuClose = document.querySelector('.menu__close');
  const menuLinks = document.querySelectorAll('.menu__link');
  const body = document.body;

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menu.classList.add('is-active');
      body.classList.add('menu-open');
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', function() {
      menu.classList.remove('is-active');
      body.classList.remove('menu-open');
    });
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      menu.classList.remove('is-active');
      body.classList.remove('menu-open');
    });
  });

  menu.addEventListener('click', function(e) {
    if (e.target === menu) {
      menu.classList.remove('is-active');
      body.classList.remove('menu-open');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu.classList.contains('is-active')) {
      menu.classList.remove('is-active');
      body.classList.remove('menu-open');
    }
  });

  // Smooth scroll for buttons
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.textContent.includes('Voir le programme')) {
        document.querySelector('.discovery-section').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
