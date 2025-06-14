document.addEventListener("DOMContentLoaded", function () {
  // ==================== NAVBAR FUNCTIONALITY ====================
  // Mobile menu elements
  // ==================== NAVBAR FUNCTIONALITY ====================
  // Mobile menu elements
  const menuToggle = document.querySelector(".menu-toggle");
  const menuClose = document.querySelector(".menu-close");
  const navContainer = document.querySelector(".nav-container");
  const navOverlay = document.querySelector(".nav-overlay");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  // Toggle mobile menu
  function toggleMenu() {
    navContainer.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = navContainer.classList.contains("active")
      ? "hidden"
      : "";

    // Update ARIA attributes
    const isExpanded = navContainer.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isExpanded);
    document
      .getElementById("nav-list")
      .setAttribute("aria-hidden", !isExpanded);
  }

  // Close mobile menu
  function closeMenu() {
    navContainer.classList.remove("active");
    navOverlay.classList.remove("active");
    document.body.style.overflow = "";
    menuToggle.setAttribute("aria-expanded", "false");
    document.getElementById("nav-list").setAttribute("aria-hidden", "true");

    // Close any open dropdowns
    document.querySelectorAll(".dropdown.active").forEach((dropdown) => {
      dropdown.classList.remove("active");
      dropdown.querySelector("a").setAttribute("aria-expanded", "false");
    });
  }

  // Event listeners
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  // Modified overlay click handler
  if (navOverlay) {
    navOverlay.addEventListener("click", function (e) {
      // Only close if clicking directly on overlay (not bubbling from nav)
      if (e.target === navOverlay) {
        closeMenu();
      }
    });
  }

  // Add click handler to document to close when clicking outside
  document.addEventListener("click", function (e) {
    // If nav is open and click is outside nav container
    if (
      navContainer.classList.contains("active") &&
      !navContainer.contains(e.target) &&
      e.target !== menuToggle
    ) {
      closeMenu();

      // Allow the original click action to proceed
      return true;
    }
  });

  // Rest of your existing code remains the same...
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = this.parentElement;
        const isExpanding = !dropdown.classList.contains("active");

        document
          .querySelectorAll(".dropdown.active")
          .forEach((activeDropdown) => {
            if (activeDropdown !== dropdown) {
              activeDropdown.classList.remove("active");
              activeDropdown
                .querySelector("a")
                .setAttribute("aria-expanded", "false");
            }
          });

        dropdown.classList.toggle("active");
        this.setAttribute(
          "aria-expanded",
          dropdown.classList.contains("active")
        );

        if (isExpanding) {
          setTimeout(() => {
            dropdown.scrollIntoView({ block: "nearest", behavior: "smooth" });
          }, 100);
        }
      }
    });
  });

  document.querySelectorAll(".nav-item:not(.dropdown) > a").forEach((link) => {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        closeMenu();
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navContainer.classList.contains("active")) {
      closeMenu();
    }
  });

  // ==================== NAVBAR SCROLL BEHAVIOR ====================
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        if (scrollTop > 100) {
          navbar.classList.remove("scrolled-up");
        }
      } else {
        // Scrolling up
        if (scrollTop > 100) {
          navbar.classList.add("scrolled-up");
        } else {
          // At top of page
          navbar.classList.remove("scrolled-up");
        }
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // ==================== EXISTING CODE (optimized) ====================
  // Initialize tooltips only if elements exist
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  if (tooltipTriggerList.length > 0) {
    [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }

  // Initialize offcanvas navbar with better event delegation
  document.addEventListener("click", function (e) {
    // Handle navbar toggler
    if (e.target.closest(".navbar-toggler")) {
      document.querySelector(".navbar-collapse").classList.toggle("show");
      return;
    }

    // Close navbar when clicking on nav links (mobile only)
    if (window.innerWidth < 992 && e.target.closest(".nav-link")) {
      document.querySelector(".navbar-collapse").classList.remove("show");
    }

    // Close navbar when clicking outside (mobile only)
    if (
      window.innerWidth < 992 &&
      !e.target.closest(".navbar") &&
      document.querySelector(".navbar-collapse.show")
    ) {
      document.querySelector(".navbar-collapse").classList.remove("show");
    }
  });

  // Smooth scrolling for anchor links with offset adjustment
  document.addEventListener("click", function (e) {
    if (e.target.closest('a[href^="#"]')) {
      e.preventDefault();
      const targetId = e.target.closest("a").getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - navbarHeight,
          behavior: "smooth",
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

  // Enhanced scroll-to-top button with intersection observer
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "btn btn-primary btn-scroll-top";
  Object.assign(scrollToTopBtn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    display: "none",
    zIndex: "99",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    padding: "0",
    transition: "opacity 0.3s ease",
  });
  document.body.appendChild(scrollToTopBtn);

  // Use IntersectionObserver for better performance than scroll event
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        scrollToTopBtn.style.display = entry.isIntersecting ? "none" : "block";
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(
    document.querySelector("#top-observer-target") || document.body
  );

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Gallery filtering with animation
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Update active button
        document
          .querySelector(".filter-buttons button.active")
          ?.classList.remove("active");
        this.classList.add("active");

        const filter = this.dataset.filter;
        const items = document.querySelectorAll(".gallery-item");

        items.forEach((item) => {
          const matchesFilter =
            filter === "all" || item.dataset.category === filter;
          item.style.opacity = "0";

          setTimeout(() => {
            item.style.display = matchesFilter ? "block" : "none";
            setTimeout(() => {
              item.style.opacity = matchesFilter ? "1" : "0";
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
