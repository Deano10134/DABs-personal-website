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
    darkModeToggle.style.backgroundColor = "#000";
    darkModeToggle.style.color = "#fff";
    darkModeToggle.style.border = "none";
    darkModeToggle.style.borderRadius = "5px";
    darkModeToggle.style.cursor = "pointer";
    document.body.appendChild(darkModeToggle);

    // Check localStorage for dark mode state
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
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
        document.body.classList.add('dark-mode'); // Apply dark mode to <body>
        document.querySelectorAll('.form-control, .btn-success, .bg-light, .shadow-sm').forEach(el => {
            el.classList.add('dark-mode');
        });
        darkModeToggle.style.backgroundColor = "#007bff";
        darkModeToggle.style.color = "#fff";
        localStorage.setItem('darkMode', 'enabled');
        darkModeToggle.textContent = "Light Mode";
    }

    function disableDarkMode() {
        document.body.classList.remove('dark-mode'); // Remove dark mode from <body>
        document.querySelectorAll('.form-control, .btn-success, .bg-light, .shadow-sm').forEach(el => {
            el.classList.remove('dark-mode');
        });
        darkModeToggle.style.backgroundColor = "#000";
        darkModeToggle.style.color = "#fff";
        localStorage.setItem('darkMode', 'disabled');
        darkModeToggle.textContent = "Dark Mode";
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOptions = document.querySelector('.menu-options');

    if (menuToggle && menuOptions) {
        menuToggle.addEventListener('click', () => {
            menuOptions.classList.toggle('show');
            menuToggle.classList.toggle('active');
        });
    } else {
        console.warn('Menu toggle or menu options not found in the DOM.');
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        if (
            menuOptions &&
            menuOptions.classList.contains('show') &&
            !menuToggle.contains(event.target) &&
            !menuOptions.contains(event.target)
        ) {
            menuOptions.classList.remove('show');
            menuToggle.classList.remove('active');
        }
    });

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