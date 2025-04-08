const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    alert("Thank You I'll get back to you in 1-2 business days");
})