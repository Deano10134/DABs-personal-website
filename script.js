// Add a heading dynamically
const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";
document.querySelector("body").appendChild(h2);

// Ensure dark mode toggle button appears on all pages
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle button
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check localStorage for dark mode state
    const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light mode
    document.documentElement.setAttribute('data-theme', savedTheme);
    darkModeToggle.textContent = savedTheme === 'dark' ? "Light Mode" : "Dark Mode";

    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        disableDarkMode(); // Ensure light mode is enabled by default
    }

    // Toggle dark mode functionality
    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode(); // Switch to light mode
        } else {
            enableDarkMode(); // Switch to dark mode
        }
    });

    function updateDomElementsForTheme(isDarkMode) {
        const navbarIcon = document.querySelector('.navbar-toggler-icon');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navbarIcon) {
            navbarIcon.style.filter = isDarkMode ? "invert(1)" : "invert(0)"; // Adjust icon
        }
        if (menuToggle) {
            menuToggle.style.borderColor = isDarkMode ? "#f8f9fa" : "#007bff"; // Update border
        }
    }

    function enableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark'); // Set data-theme to dark
        localStorage.setItem('theme', 'dark'); // Save dark mode state
        darkModeToggle.textContent = "Light Mode";
        darkModeToggle.classList.add('light-mode');
        darkModeToggle.style.backgroundColor = "#007bff"; // Change background to blue
        document.body.classList.add('dark-mode'); // Add dark-mode class to body
        updateDomElementsForTheme(true);
    }

    function disableDarkMode() {
        document.documentElement.setAttribute('data-theme', 'light'); // Set data-theme to light
        localStorage.setItem('theme', 'light'); // Save light mode state
        darkModeToggle.textContent = "Dark Mode";
        darkModeToggle.classList.remove('light-mode');
        darkModeToggle.style.backgroundColor = "#000"; // Change background to black
        document.body.classList.remove('dark-mode'); // Remove dark-mode class from body
        updateDomElementsForTheme(false);
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
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode'); // Ensure light mode is applied by default
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

// Admin flag (for demonstration purposes, set to true if the user is an admin)
const isAdmin = true; // Consider fetching this value dynamically from a server or authentication system

// Handle comment submission
function submitComment() {
    const nameInput = document.getElementById('name');
    const commentInput = document.getElementById('comment');
    const commentsSection = document.getElementById('comments-section');

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
        alert('Please fill out both the name and comment fields.');
        return;
    }

    // Create a new comment element
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment', 'p-3', 'mb-3', 'bg-light', 'rounded');
    commentElement.innerHTML = `
        <strong>${name}</strong>
        <p>${comment}</p>
    `;

    // Add delete button if the user is an admin
    if (isAdmin) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
        deleteButton.style.float = 'right';
        deleteButton.addEventListener('click', () => {
            commentsSection.removeChild(commentElement);
        });
        commentElement.appendChild(deleteButton);
    }

    // Append the comment to the comments section
    commentsSection.appendChild(commentElement);

    // Clear the input fields
    nameInput.value = '';
    commentInput.value = '';
}
