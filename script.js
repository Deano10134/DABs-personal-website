document.addEventListener("DOMContentLoaded", function () {
    // Load Header and Footer Dynamically
    Promise.all([
        fetch("header.html").then(response => response.ok ? response.text() : ""),
        fetch("footer.html").then(response => response.ok ? response.text() : "")
    ]).then(([header, footer]) => {
        const headerPlaceholder = document.getElementById("header-placeholder");
        const footerPlaceholder = document.getElementById("footer-placeholder");

        if (headerPlaceholder) headerPlaceholder.innerHTML = header;
        if (footerPlaceholder) footerPlaceholder.innerHTML = footer;

        initializeEventListeners(); // Ensure event listeners run after header/footer load
    }).catch(error => console.error("Error loading header or footer:", error));
   });
    function initializeEventListeners() {
        setupDarkModeToggle(); // Initialize dark mode toggle properly
        setupMenuToggle(); // Fix mobile menu interactions
    }

    function setupDarkModeToggle() {
        const darkModeToggle = document.querySelector("#darkModeToggle");
        if (!darkModeToggle) return;
    
        // Retrieve saved theme from localStorage
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
        darkModeToggle.textContent = savedTheme === "dark" ? "Light Mode" : "Dark Mode";
    
        // Add toggle event
        darkModeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
    
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            darkModeToggle.textContent = newTheme === "dark" ? "Light Mode" : "Dark Mode";
        });
    }
    
    // Ensure theme is applied on page load
    document.addEventListener("DOMContentLoaded", () => {
        setupDarkModeToggle();
    });

    document.addEventListener("DOMContentLoaded", function () {
        const menuToggle = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");
    
        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", () => {
                navLinks.classList.toggle("show");
                const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
                menuToggle.setAttribute("aria-expanded", !isExpanded);
            });
    
            // Close menu when clicking outside
            document.addEventListener("click", (event) => {
                if (navLinks.classList.contains("show") &&
                    !menuToggle.contains(event.target) &&
                    !navLinks.contains(event.target)) {
                    navLinks.classList.remove("show");
                    menuToggle.setAttribute("aria-expanded", "false");
                }
            });
        }
    });
    
    
    
        const projectCards = document.querySelectorAll(".project");

        if (projectCards.length > 0) {
            projectCards.forEach((card) => {
                card.addEventListener("mouseover", () => {
                    card.style.transform = "scale(1.05)";
                    card.style.transition = "transform 0.3s ease";
                });
                card.addEventListener("mouseout", () => {
                    card.style.transform = "scale(1)";
                });
            });
        }       

// Validate and handle form submission
function validateAndSubmit() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const errorElement = document.getElementById("formError");
    errorElement.textContent = "";

    if (!name || !email || !message) {
        errorElement.textContent = "Please fill out all fields before submitting.";
        return false;
    }

    const subject = encodeURIComponent("New Message from Website");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    const mailtoLink = `mailto:deanbaberows@gmail.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
}

// Handle comment submission
const isAdmin = false; // Define admin status as a fallback

function submitComment() {
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const commentsSection = document.getElementById("comments-section");

    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
        alert("Please fill out both the name and comment fields.");
        return;
    }

    // Create a new comment element
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");
    commentElement.innerHTML = `<strong>${name}</strong><p>${comment}</p>`;

    // Add delete button if the user is an admin
    if (isAdmin) {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            commentsSection.removeChild(commentElement);
        });
        commentElement.appendChild(deleteButton);
    }

    commentsSection.appendChild(commentElement);
}
