const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);

const form = document.querySelector('form');

form.addEventListener('submit', () => {
    alert("Thank You I'll get back to you in 1-2 business days");
})
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu-button');
    const navbar = document.getElementById('navbar');
  
    menuButton.addEventListener('click', function() {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
      menuButton.setAttribute('aria-expanded', !expanded);
      navbar.classList.toggle('open');
    });
  });
  