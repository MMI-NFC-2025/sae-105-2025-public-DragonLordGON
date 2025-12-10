// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.header__menu-toggle');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      console.log('Menu toggled');
      // Ajouter votre logique de menu ici
    });
  }

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
