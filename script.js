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
        document.documentElement.setAttribute('data-theme', 'dark'); // Set data-theme to dark
        localStorage.setItem('theme', 'dark');
        darkModeToggle.textContent = "Light Mode";
        document.body.classList.add('dark-mode'); // Add dark-mode class to body
    }

    function disableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'light'); // Set data-theme to light
        localStorage.setItem('theme', 'light');
        darkModeToggle.textContent = "Dark Mode";
        document.body.classList.remove('dark-mode'); // Remove dark-mode class from body
    }

    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOptions = document.querySelector('.menu-options');

    if (menuToggle && menuOptions) {
        menuToggle.addEventListener('click', () => {
            menuOptions.classList.toggle('show'); // Toggle visibility of menu options
            menuToggle.classList.toggle('active'); // Toggle active state of the button
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
            menuOptions.classList.remove('show'); // Hide menu options
            menuToggle.classList.remove('active'); // Remove active state from the button
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

    // Apply data-theme attribute for dark and light modes on page load
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode
    document.documentElement.setAttribute('data-theme', savedTheme);
    darkModeToggle.textContent = savedTheme === 'dark' ? "Light Mode" : "Dark Mode";

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
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