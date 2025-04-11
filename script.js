// Add a heading dynamically
const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);

// Ensure dark mode toggle button appears on all pages
document.addEventListener('DOMContentLoaded', () => {
    // Create dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.textContent = "Dark Mode";
    darkModeToggle.style.position = "fixed";
    darkModeToggle.style.bottom = "20px";
    darkModeToggle.style.right = "20px";
    darkModeToggle.style.padding = "10px 15px";
    darkModeToggle.style.backgroundColor = "#007bff";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "5px";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    // Check localStorage for dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    // Toggle dark mode functionality
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        document.body.classList.add('dark-mode');
        const elementsToToggle = document.querySelectorAll('.navbar, footer, section, .project, .skills, .socials');
        elementsToToggle.forEach(element => {
            element.classList.add('dark-mode');
            if (element.classList.contains('navbar')) {
                element.classList.remove('bg-light');
                element.classList.add('bg-dark');
            }
            if (element.tagName === 'FOOTER') {
                element.classList.add('bg-dark', 'text-light');
                element.classList.remove('bg-light', 'text-dark');
            }
        });
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = "Light Mode";
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode');
        const elementsToToggle = document.querySelectorAll('.navbar, footer, section, .project, .skills, .socials');
        elementsToToggle.forEach(element => {
            element.classList.remove('dark-mode');
            if (element.classList.contains('navbar')) {
                element.classList.remove('bg-dark');
                element.classList.add('bg-light');
            }
            if (element.tagName === 'FOOTER') {
                element.classList.add('bg-light', 'text-dark');
                element.classList.remove('bg-dark', 'text-light');
            }
        });
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = "Dark Mode";
    }

    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOptions = document.querySelector('.menu-options');

    if (menuToggle && menuOptions) {
        menuToggle.addEventListener('click', () => {
            menuOptions.classList.toggle('show');
        });
    }

    // Add Bootstrap form validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});

// Animate project cards on hover
const projectCards = document.querySelectorAll('.project');
projectCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = "scale(1.05)";
        card.style.transition = "transform 0.3s ease";
    });
    card.addEventListener('mouseout', () => {
        card.style.transform = "scale(1)";
    });
});

// Validate and handle form submission
function validateAndSubmit() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields before submitting.');
        return false;
    }

    // Construct the mailto link
    const subject = encodeURIComponent('New Message from Website');
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    const mailtoLink = `mailto:deanbaberows@gmail.com?subject=${subject}&body=${body}`;

    // Open the email client
    window.location.href = mailtoLink;

    return false;
}