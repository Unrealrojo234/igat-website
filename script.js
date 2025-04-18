document.addEventListener('DOMContentLoaded', function() {
    // ==================== NAVBAR FUNCTIONALITY ====================
    // Mobile menu toggle elements
    const menuToggle = document.querySelector('.menu-toggle');
    const menuClose = document.querySelector('.menu-close');
    const navList = document.querySelector('.nav-list');
    const navOverlay = document.querySelector('.nav-overlay');
    
    // Toggle mobile menu function
    function toggleMenu() {
        navList.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        
        // Update ARIA attributes for accessibility
        const isExpanded = navList.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        navList.setAttribute('aria-hidden', !isExpanded);
    }
    
    // Close mobile menu function
    function closeMenu() {
        navList.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.setAttribute('aria-hidden', 'true');
    }
    
    // Event listeners for menu toggle
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', toggleMenu);
        
        // Close button
        if (menuClose) {
            menuClose.addEventListener('click', closeMenu);
        }
        
        // Overlay click to close
        if (navOverlay) {
            navOverlay.addEventListener('click', closeMenu);
        }
        
        // Close when clicking on nav links (mobile)
        const navLinks = document.querySelectorAll('.nav-list a:not(.dropdown a)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
    }
    
    // Mobile dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Update ARIA attributes
                    const isExpanded = dropdown.classList.contains('active');
                    link.setAttribute('aria-expanded', isExpanded);
                }
            });
        }
    });

    // ==================== NAVBAR SCROLL BEHAVIOR ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                if (scrollTop > 100) {
                    navbar.classList.remove('scrolled-up');
                }
            } else {
                // Scrolling up
                if (scrollTop > 100) {
                    navbar.classList.add('scrolled-up');
                } else {
                    // At top of page
                    navbar.classList.remove('scrolled-up');
                }
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }


    // ==================== EXISTING CODE (optimized) ====================
    // Initialize tooltips only if elements exist
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    if (tooltipTriggerList.length > 0) {
        [...tooltipTriggerList].map(tooltipTriggerEl => 
            new bootstrap.Tooltip(tooltipTriggerEl)
        );
    }

    // Initialize offcanvas navbar with better event delegation
    document.addEventListener('click', function(e) {
        // Handle navbar toggler
        if (e.target.closest('.navbar-toggler')) {
            document.querySelector('.navbar-collapse').classList.toggle('show');
            return;
        }
        
        // Close navbar when clicking on nav links (mobile only)
        if (window.innerWidth < 992 && e.target.closest('.nav-link')) {
            document.querySelector('.navbar-collapse').classList.remove('show');
        }
        
        // Close navbar when clicking outside (mobile only)
        if (window.innerWidth < 992 && 
            !e.target.closest('.navbar') && 
            document.querySelector('.navbar-collapse.show')) {
            document.querySelector('.navbar-collapse').classList.remove('show');
        }
    });

    // Smooth scrolling for anchor links with offset adjustment
    document.addEventListener('click', function(e) {
        if (e.target.closest('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.closest('a').getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        }
    });

    // Enhanced form submission handling with fetch API example
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
                
                // Example using Fetch API (replace with your actual endpoint)
                const formData = new FormData(form);
                const response = await fetch('your-endpoint-url', {
                    method: 'POST',
                    body: formData
                });
                
                if (response.ok) {
                    const result = await response.json();
                    showAlert('success', 'Thank you! Your form has been submitted successfully.');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                showAlert('danger', 'There was a problem submitting your form. Please try again.');
                console.error('Form submission error:', error);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    });

    // Helper function for showing alerts
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        // Prepend to the form or to a designated alerts container
        const form = document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(alertDiv, form);
        } else {
            document.body.prepend(alertDiv);
        }
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }, 5000);
    }

    // Enhanced scroll-to-top button with intersection observer
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'btn btn-primary btn-scroll-top';
    Object.assign(scrollToTopBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        display: 'none',
        zIndex: '99',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        padding: '0',
        transition: 'opacity 0.3s ease'
    });
    document.body.appendChild(scrollToTopBtn);

    // Use IntersectionObserver for better performance than scroll event
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            scrollToTopBtn.style.display = entry.isIntersecting ? 'none' : 'block';
        });
    }, { threshold: 0.1 });

    observer.observe(document.querySelector('#top-observer-target') || document.body);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gallery filtering with animation
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                document.querySelector('.filter-buttons button.active')?.classList.remove('active');
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                const items = document.querySelectorAll('.gallery-item');
                
                items.forEach(item => {
                    const matchesFilter = filter === 'all' || item.dataset.category === filter;
                    item.style.opacity = '0';
                    
                    setTimeout(() => {
                        item.style.display = matchesFilter ? 'block' : 'none';
                        setTimeout(() => {
                            item.style.opacity = matchesFilter ? '1' : '0';
                        }, 50);
                    }, 200);
                });
            });
        });
    }

    // Add a small delay to ensure DOM is fully ready
    setTimeout(() => {
        // Initialize any animations or other effects that need complete DOM readiness
    }, 100);
});