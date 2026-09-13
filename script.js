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

// ==========================================
// --- INTERACTIVE CV EXPERIENCES & ACTIONS ---
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Check if on the CV Page before initializing
    if (document.getElementById("cv-search") || document.querySelector(".timeline-interactive")) {
        initInteractiveCV();
    }
});

function initInteractiveCV() {
    console.log("Initializing Dean's Interactive CV Suite...");

    // 1. SECTION TABS FILTERING
    const tabButtons = document.querySelectorAll(".cv-tab-btn");
    const sections = {
        summary: document.getElementById("section-summary"),
        experience: document.getElementById("section-experience"),
        skills: document.getElementById("section-skills"),
        education: document.getElementById("section-education"),
        sandbox: document.getElementById("section-sandbox"),
        contact: document.getElementById("section-contact")
    };

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const activeSection = btn.getAttribute("data-section");
            
            // If show "all"
            if (activeSection === "all") {
                Object.values(sections).forEach(sec => {
                    if (sec) {
                        sec.style.display = "block";
                        sec.classList.remove("fade-in-active");
                        // force reflow
                        void sec.offsetWidth;
                        sec.classList.add("fade-in-active");
                    }
                });
                triggerProgressBars(); // Ensure bars animate
            } else {
                // Hide all sections, show only active
                Object.entries(sections).forEach(([key, sec]) => {
                    if (sec) {
                        if (key === activeSection || (activeSection === "education" && key === "contact") || (activeSection === "education" && key === "sandbox")) {
                            sec.style.display = "block";
                            sec.classList.remove("fade-in-active");
                            void sec.offsetWidth;
                            sec.classList.add("fade-in-active");
                        } else {
                            sec.style.display = "none";
                        }
                    }
                });

                if (activeSection === "skills") {
                    triggerProgressBars();
                }
            }
        });
    });


    // 2. FOCUS AREA FILTERING (Cloud & DevOps vs Web Dev)
    const filterButtons = document.querySelectorAll(".filter-btn");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const skillCards = document.querySelectorAll(".skill-card-interactive");
    const focusSections = document.querySelectorAll("[data-focus-area]");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedFocus = btn.getAttribute("data-focus");

            // Filter Timeline Items
            timelineItems.forEach(item => {
                const itemFocus = item.getAttribute("data-focus-area");
                if (selectedFocus === "all" || itemFocus === selectedFocus || itemFocus === "all") {
                    item.style.display = "flex";
                } else {
                    item.style.display = "none";
                }
            });

            // Filter Skills Card Grid
            skillCards.forEach(card => {
                const cardCat = card.getAttribute("data-category");
                if (selectedFocus === "all") {
                    card.style.display = "flex";
                } else if (selectedFocus === "cloud" && (cardCat === "cloud" || cardCat === "devops")) {
                    card.style.display = "flex";
                } else if (selectedFocus === "web" && cardCat === "web") {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });

            // Filter special text blocks
            focusSections.forEach(el => {
                const elFocus = el.getAttribute("data-focus-area");
                if (selectedFocus === "all" || elFocus.includes(selectedFocus)) {
                    el.style.display = "block";
                } else {
                    el.style.display = "none";
                }
            });

            // Re-trigger bar animations
            triggerProgressBars();
        });
    });


    // 3. LIVE SEARCH BOX
    const searchInput = document.getElementById("cv-search");
    const clearSearchBtn = document.getElementById("clear-search");
    const searchCount = document.getElementById("search-count");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            
            if (query === "") {
                clearSearch();
                return;
            }

            clearSearchBtn.style.display = "inline-flex";
            let matches = 0;

            // Search through Timeline Items
            timelineItems.forEach(item => {
                const keywords = (item.getAttribute("data-keywords") || "").toLowerCase();
                const text = item.textContent.toLowerCase();
                if (keywords.includes(query) || text.includes(query)) {
                    item.style.display = "flex";
                    item.classList.add("search-match");
                    // Expand the body if it is matched
                    const body = item.querySelector(".timeline-body-collapsible");
                    if (body) body.classList.add("active");
                    matches++;
                } else {
                    item.style.display = "none";
                    item.classList.remove("search-match");
                }
            });

            // Search through Skills Cards
            skillCards.forEach(card => {
                const keywords = (card.getAttribute("data-keywords") || "").toLowerCase();
                const title = card.querySelector("h4").textContent.toLowerCase();
                const desc = card.querySelector(".skill-card-desc").textContent.toLowerCase();
                if (keywords.includes(query) || title.includes(query) || desc.includes(query)) {
                    card.style.display = "flex";
                    card.classList.add("search-match");
                    matches++;
                } else {
                    card.style.display = "none";
                    card.classList.remove("search-match");
                }
            });

            // Search through special sections / headers
            const edCards = document.querySelectorAll(".education-card-interactive");
            edCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = "block";
                    card.classList.add("search-match");
                    matches++;
                } else {
                    card.style.display = "none";
                    card.classList.remove("search-match");
                }
            });

            // Update Matches Counter
            searchCount.textContent = `${matches} match${matches === 1 ? "" : "es"}`;
            searchCount.style.display = "inline-block";

            // When searching, force show all essential sections so users see matching elements
            Object.values(sections).forEach(sec => {
                if (sec) sec.style.display = "block";
            });

            triggerProgressBars();
        });

        clearSearchBtn.addEventListener("click", clearSearch);
    }

    function clearSearch() {
        if (searchInput) searchInput.value = "";
        if (clearSearchBtn) clearSearchBtn.style.display = "none";
        if (searchCount) {
            searchCount.textContent = "";
            searchCount.style.display = "none";
        }

        // Reset elements displays
        timelineItems.forEach(item => {
            item.style.display = "flex";
            item.classList.remove("search-match");
            // restore default timelines state
            const body = item.querySelector(".timeline-body-collapsible");
            if (body && !body.classList.contains("show-initially")) {
                body.classList.remove("active");
            }
        });

        skillCards.forEach(card => {
            card.style.display = "flex";
            card.classList.remove("search-match");
        });

        const edCards = document.querySelectorAll(".education-card-interactive");
        edCards.forEach(card => {
            card.style.display = "block";
            card.classList.remove("search-match");
        });

        // Reset section tabs active state
        const activeTab = document.querySelector(".cv-tab-btn.active");
        if (activeTab) {
            activeTab.click();
        }
    }


    // 4. TIMELINE ACCORDIONS
    window.toggleTimelineItem = function(headerElement) {
        const itemBody = headerElement.nextElementSibling;
        const chevron = headerElement.querySelector(".chevron");
        const timelineItem = headerElement.closest(".timeline-item");

        if (itemBody.classList.contains("active")) {
            itemBody.classList.remove("active");
            if (chevron) {
                chevron.classList.remove("rotate");
                chevron.innerHTML = "▼";
            }
            timelineItem.classList.remove("expanded-item");
        } else {
            itemBody.classList.add("active");
            if (chevron) {
                chevron.classList.add("rotate");
                chevron.innerHTML = "▲";
            }
            timelineItem.classList.add("expanded-item");
        }
    };


    // 5. GLOBAL EXPAND / COLLAPSE
    const toggleAllDetailsBtn = document.getElementById("toggle-all-details");
    const toggleDetailsText = document.getElementById("toggle-details-text");
    let allExpanded = false;

    if (toggleAllDetailsBtn) {
        // Initially set the first timeline item to active visually
        const initShow = document.querySelector(".show-initially");
        if (initShow) {
            initShow.classList.add("active");
            const header = initShow.previousElementSibling;
            if (header) {
                const chevron = header.querySelector(".chevron");
                if (chevron) {
                    chevron.innerHTML = "▲";
                    chevron.classList.add("rotate");
                }
            }
            initShow.closest(".timeline-item").classList.add("expanded-item");
        }

        toggleAllDetailsBtn.addEventListener("click", () => {
            allExpanded = !allExpanded;
            const bodies = document.querySelectorAll(".timeline-body-collapsible");
            
            bodies.forEach(body => {
                const header = body.previousElementSibling;
                const chevron = header ? header.querySelector(".chevron") : null;
                const tItem = body.closest(".timeline-item");

                if (allExpanded) {
                    body.classList.add("active");
                    if (chevron) {
                        chevron.innerHTML = "▲";
                        chevron.classList.add("rotate");
                    }
                    if (tItem) tItem.classList.add("expanded-item");
                } else {
                    body.classList.remove("active");
                    if (chevron) {
                        chevron.innerHTML = "▼";
                        chevron.classList.remove("rotate");
                    }
                    if (tItem) tItem.classList.remove("expanded-item");
                }
            });

            toggleDetailsText.textContent = allExpanded ? "Collapse All Sections" : "Expand All Sections";
            toggleAllDetailsBtn.querySelector("span").textContent = allExpanded ? "↕️" : "↕️";
        });
    }


    // 6. SKILL CARD CLICK RELATIONSHIPS
    skillCards.forEach(card => {
        card.addEventListener("click", () => {
            const skillId = card.getAttribute("data-skill-id");
            const wasSelected = card.classList.contains("selected-skill");

            // Reset all cards selection
            skillCards.forEach(c => c.classList.remove("selected-skill"));
            
            // Remove previous highlights on timeline tags
            const allRefs = document.querySelectorAll(".skill-bubble-ref");
            allRefs.forEach(r => r.classList.remove("connected-highlight"));

            if (!wasSelected) {
                card.classList.add("selected-skill");
                
                // Highlight matching skill bubbles in experience items!
                const matchedRefs = document.querySelectorAll(`.skill-bubble-ref[data-skill="${skillId}"]`);
                if (matchedRefs.length > 0) {
                    matchedRefs.forEach(ref => {
                        ref.classList.add("connected-highlight");
                        
                        // Let's also expand the matching timeline item so the highlight is visible!
                        const timelineItem = ref.closest(".timeline-item");
                        if (timelineItem) {
                            const body = timelineItem.querySelector(".timeline-body-collapsible");
                            const header = timelineItem.querySelector(".timeline-header");
                            if (body && !body.classList.contains("active")) {
                                toggleTimelineItem(header);
                            }
                            
                            // Smoothly scroll the highlighted timeline item into view
                            timelineItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                    });
                    
                    showToast(`Highlighted instances of ${card.querySelector("h4").textContent} in Work Experience!`);
                } else {
                    showToast(`Selected skill: ${card.querySelector("h4").textContent}`);
                }
            }
        });
    });


    // 7. TOAST NOTIFICATION UTILITY
    window.showToast = function(message) {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = "cv-toast fade-in-active";
        toast.innerHTML = `
            <span class="toast-text">ℹ️ ${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">×</button>
        `;

        container.appendChild(toast);

        // Remove toast automatically after speed-bump duration
        setTimeout(() => {
            toast.classList.add("toast-fade-out");
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 3000);
    };


    // 8. CLIPBOARD COPIER
    const copyButtons = document.querySelectorAll("[data-copy]");
    copyButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // Avoid triggering any card click handlers
            const textToCopy = btn.getAttribute("data-copy");
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast(`Copied to Clipboard: "${textToCopy}"`);
                
                // Visual feedback checkmark
                const originalText = btn.textContent;
                btn.textContent = "✔";
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error("Clipboard copy failed: ", err);
                showToast("Failed to copy automatically. Please copy manually.");
            });
        });
    });
    
    // Make the header email copiable on click
    const clickableEmail = document.getElementById("clickable-email");
    if (clickableEmail) {
        clickableEmail.addEventListener("click", () => {
            const email = clickableEmail.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                showToast(`Copied Email: "${email}" to clipboard!`);
            });
        });
    }

    // 9. ANIMATED PROFICIENCY BARS ON SCROLL / TAB TRIGGER
    function triggerProgressBars() {
        const progressBars = document.querySelectorAll(".skill-progress");
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute("data-width");
            // SetTimeout to let browser render grid display changes first
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 80);
        });
    }

    // Connect to progress bars animation on scroll
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entries[0].intersectionRatio > 0) {
                    triggerProgressBars();
                    observer.disconnect(); // Runs only once
                }
            });
        }, { threshold: 0.1 });

        const skillsSection = document.getElementById("section-skills");
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    } else {
        // Fallback
        setTimeout(triggerProgressBars, 500);
    }


    // 10. TECHNICAL SANDBOX DEV SIMULATOR
    const generateBtn = document.getElementById("generate-deployment-btn");
    const consoleOutput = document.getElementById("sandbox-console-output");

    if (generateBtn && consoleOutput) {
        generateBtn.addEventListener("click", () => {
            const appType = document.getElementById("sandbox-app-type").value;
            const platform = document.getElementById("sandbox-cloud-platform").value;
            
            generateBtn.disabled = true;
            generateBtn.textContent = "⚙️ Simulating DevOps pipeline...";
            consoleOutput.textContent = "";

            let logs = [];

            if (platform === "azure-terraform") {
                logs = [
                    "🚀 [DevOps Pipeline] Initiating Azure Cloud Deployment Workflow...",
                    "🔍 [Terraform] Scanning resource configuration tree...",
                    "📂 [Git Hub] Fetching production-ready source code models...",
                    "📦 [Docker] Creating base build container workspace...",
                ];

                if (appType === "react-app") {
                    logs.push(
                        "📄 [Configuration Generated] main.tf layout:",
                        "=========================================",
                        "provider \"azurerm\" {\n  features {}\n}",
                        "resource \"azurerm_resource_group\" \"rg\" {\n  name     = \"dean-portfolio-rg\"\n  location = \"UK South\"\n}",
                        "resource \"azurerm_static_web_app\" \"react_spa\" {\n  name                = \"dean-react-web-spa\"\n  resource_group_name = azurerm_resource_group.rg.name\n  location            = \"UK South\"\n  sku_tier            = \"Free\"\n}",
                        "=========================================",
                        "⏳ [Terraform Plan] 2 resources to add, 0 to alter, 0 to destroy.",
                        "⚡ [Terraform Apply] Provisioning Static Web App Instance...",
                        "🔗 [Azure SWA] Edge routing setup completed! URL: https://dean-react-web-spa.azurestaticapps.net",
                        "🏆 [Success] React SPA deployment fully orchestrated!"
                    );
                } else if (appType === "node-api") {
                    logs.push(
                        "📄 [Configuration Generated] node-deploy.tf layout:",
                        "=========================================",
                        "resource \"azurerm_linux_web_app\" \"express_api\" {\n  name                = \"baberowski-express-api\"\n  resource_group_name = azurerm_resource_group.rg.name\n  location            = \"UK South\"\n  service_plan_id     = azurerm_service_plan.plan.id\n  site_config {\n    always_on = false\n    application_stack {\n      node_version = \"18-lts\"\n    }\n  }\n}",
                        "=========================================",
                        "⏳ [Terraform Plan] 3 resources to add, 0 to alter.",
                        "⚡ [Terraform Apply] Establishing Linux Service Plan S1 and App instance...",
                        "📡 [Backend Hub] Binding environment variables & secrets configs...",
                        "🏆 [Success] Express.js endpoints responsive. Health Check: 200 OK!"
                    );
                } else if (appType === "openai-integration") {
                    logs.push(
                        "📄 [Configuration Generated] azure-openai-orchestrate.tf layout:",
                        "=========================================",
                        "resource \"azurerm_cognitive_account\" \"openai\" {\n  name                  = \"dean-cognitive-openai\"\n  location              = \"UK South\"\n  resource_group_name   = azurerm_resource_group.rg.name\n  kind                  = \"CognitiveServices\"\n  sku_name              = \"S0\"\n}",
                        "resource \"azurerm_cognitive_deployment\" \"gpt4\" {\n  name                 = \"gpt-4o-interactive\"\n  cognitive_account_id = azurerm_cognitive_account.openai.id\n  model {\n    format  = \"OpenAI\"\n    name    = \"gpt-4o\"\n    version = \"2024-05-13\"\n  }\n  scale {\n    type = \"Standard\"\n  }\n}",
                        "=========================================",
                        "⏳ [Terraform Plan] Cognitive Account and GPT-4o Model to add.",
                        "⚡ [Terraform Apply] Spawning Cognitive Endpoint... Configuring Private Link...",
                        "🔑 [Secure Integration] Initializing Azure Key Vault secret credentials store...",
                        "🏆 [Success] Azure OpenAI model deployed! API accessible to Web App service."
                    );
                }
            } else if (platform === "aws-systems") {
                logs = [
                    "🚀 [DevOps Pipeline] Initiating AWS Systems Deployment Workflow...",
                    "🔍 [AWS S3] Assessing static resource configurations...",
                    "📂 [Git Hub] Fetching production-ready source code models...",
                ];

                if (appType === "react-app") {
                    logs.push(
                        "📦 [AWS CLI] Compiling production build directory...",
                        "⚡ [AWS S3] Uploading static assets to s3://dean-baberowski-portfolio...",
                        "📡 [AWS CloudFront] Generating CloudFront CDN distribution...",
                        "🔒 [AWS ACM] Certifying SSL dynamic certificates for custom domain...",
                        "🏆 [Success] S3 + CloudFront React SPA Edge distribution fully operational!"
                    );
                } else if (appType === "node-api") {
                    logs.push(
                        "📦 [Docker] Creating base build container workspace node:18-alpine...",
                        "🐳 [Docker Build] tag: dean-express-api:latest successfully built.",
                        "🔐 [AWS ECR] Pushing application cluster image package...",
                        "⚡ [AWS ECS] Launching ECS Fargate task service instances...",
                        "📡 [AWS ALB] Binding Elastic Application Load Balancer target routing rules...",
                        "🏆 [Success] AWS Fargate Cluster online & auto-scaled. Endpoints verified!"
                    );
                } else if (appType === "openai-integration") {
                    logs.push(
                        "📦 [AWS Lambda] Packaging Python API serverless orchestrator...",
                        "⚡ [AWS API Gateway] Declaring secure HTTPS routes with Cognito authorization...",
                        "🔑 [AWS Systems Manager] Retreiving locked API secrets and tokens securely...",
                        "📡 [Integration Logs] Initializing proxy router to Azure OpenAI REST models...",
                        "🏆 [Success] AWS Serverless Proxy Integration active. Dynamic AI inference ready!"
                    );
                }
            }

            // Print typewriter simulation
            let lineIndex = 0;
            function printLine() {
                if (lineIndex < logs.length) {
                    consoleOutput.textContent += logs[lineIndex] + "\n";
                    consoleOutput.scrollTop = consoleOutput.scrollHeight;
                    lineIndex++;
                    setTimeout(printLine, 120);
                } else {
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = "🛠️ Simulate Deployment Orchestration";
                }
            }
            printLine();
        });
    }

    // 11. BEFORE PRINT SETUP HACKS
    window.addEventListener("beforeprint", () => {
        // Expand all accordions so content prints properly
        const bodies = document.querySelectorAll(".timeline-body-collapsible");
        bodies.forEach(body => {
            body.classList.add("active");
            const header = body.previousElementSibling;
            if (header) {
                const chevron = header.querySelector(".chevron");
                if (chevron) {
                    chevron.innerHTML = "▲";
                }
            }
        });
        
        // Ensure all sections are displayed
        Object.values(sections).forEach(sec => {
            if (sec) sec.style.display = "block";
        });
        
        // Draw progress bars
        triggerProgressBars();
    });
}

