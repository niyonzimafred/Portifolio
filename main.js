// Portfolio Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initBackToTop();
  initHeaderScroll();
  initProgressBars();
  updateActiveNav();
  initLazyLoad();
  initCardHovers();
  initProjectCardLinks();
  initContactForm();
  initBlogDetail();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const nav = document.getElementById("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  if (!mobileToggle || !nav) return;

  // Toggle menu on hamburger click
  mobileToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    nav.classList.toggle("active");
    mobileToggle.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Allow the default smooth scroll behavior
      nav.classList.remove("active");
      mobileToggle.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = mobileToggle.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnToggle && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Close menu when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Ignore if href is just "#"
      if (href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
      const targetPosition = target.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
}

// Scroll Animations (Fade in on scroll)
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animateElements = document.querySelectorAll(
    ".skill-card, .project-card, .blog-card, .testimonial-card, .testimonial-content-card, .about-content, .hero-content, .case-study-grid"
  );

  animateElements.forEach((el) => {
    observer.observe(el);
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.getElementById("backToTop");

  if (!backToTop) return;

  // Show/hide button on scroll
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  // Scroll to top on click
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById("header");

  if (!header) return;

  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 0) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    }

    lastScroll = currentScroll;
  });
}

// Animate Progress Bars
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = "0";

        setTimeout(() => {
          bar.style.width = width;
        }, 100);

        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  progressBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// Active Navigation Link on Scroll
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-list a");

  const scrollPosition = window.pageYOffset;
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", debounce(updateActiveNav, 100));

// Lazy Load Images
function initLazyLoad() {
  const images = document.querySelectorAll("img[data-src]");

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Card Hover Effects
function initCardHovers() {
  const cards = document.querySelectorAll(".project-card, .blog-card, .skill-card, .testimonial-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Project Card Link Navigation
function initProjectCardLinks() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card, index) => {
    card.style.cursor = "pointer";

    card.addEventListener("click", function () {
      const link = this.querySelector(".btn-link");
      if (link) {
        // Add click animation
        this.style.transform = "scale(0.98)";
        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);
      }
    });
  });
}

// Form Validation (if you add a contact form)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }

    // Email validation
    if (input.type === "email" && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add("error");
      }
    }
  });

  return isValid;
}

// Contact Form Handler
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    status.textContent = "";
    status.classList.remove("success", "error");

    const isValid = validateForm(form);

    if (!isValid) {
      status.textContent = "Please fill in all required fields correctly.";
      status.classList.add("error");
      return;
    }

    // Simulate successful submission
    form.reset();
    status.textContent = "Thank you! Your message has been sent.";
    status.classList.add("success");
  });
}

// Blog Detail Handler (for blog.html)
function initBlogDetail() {
  const blogCards = document.querySelectorAll(".blog-card[data-blog-id]");
  const detailSection = document.getElementById("blog-detail");
  const titleEl = document.getElementById("blogDetailTitle");
  const categoryEl = document.getElementById("blogDetailCategory");
  const metaEl = document.getElementById("blogDetailMeta");
  const imageEl = document.getElementById("blogDetailImage");
  const bodyEl = document.getElementById("blogDetailBody");
  const backLink = document.getElementById("backToBlogList");

  if (!blogCards.length || !detailSection || !titleEl || !categoryEl || !metaEl || !imageEl || !bodyEl) {
    return;
  }

  const articles = {
    "unemployed-graduate": {
      title: "What I Learned from Being an Unemployed Graduate",
      category: "Career Journey",
      meta: "Mar 12, 2025 · 5 min read",
      image: "./styles/image/project 3.jpeg",
      imageAlt: "Unemployed graduate reflective moment",
      paragraphs: [
        "Finishing university without a clear job opportunity in sight can feel like stepping off a cliff. For a while, I measured my value only by the number of applications sent and the replies I didn’t receive.",
        "That season forced me to slow down, reflect, and understand what I actually wanted to build. Instead of chasing every role, I doubled down on the skills and types of work that energized me the most.",
        "Looking back, that uncomfortable gap became a powerful filter: it sharpened my focus, clarified my values, and made me far more intentional about the roles and projects I say yes to today."
      ],
    },
    "same-outfit": {
      title: "Why Successful People Wear the Same Thing Every Day",
      category: "Personal Branding",
      meta: "Feb 3, 2025 · 3 min read",
      image: "./styles/image/project 2.jpeg",
      imageAlt: "Minimal wardrobe concept",
      paragraphs: [
        "From Steve Jobs’ black turtleneck to countless founders’ hoodies, repeating outfits is less about fashion and more about energy management.",
        "Every tiny decision you remove from your mornings creates a little extra space for strategy, creativity, and deep work. Wardrobe is just one lever, but it’s an easy one to experiment with.",
        "Consistency in how you present yourself can also become part of your personal brand—something people recognize instantly, before you even say a word."
      ],
    },
    "designing-with-data": {
      title: "Designing with Data: Turning Dashboards into Decisions",
      category: "UX & Data",
      meta: "Jan 10, 2025 · 6 min read",
      image: "./styles/image/PROJECT.jpeg",
      imageAlt: "Analytics dashboard design",
      paragraphs: [
        "Great dashboards don’t try to show everything—they focus on the questions that matter most to the people using them.",
        "By pairing strong visual hierarchy with clear storytelling, we can turn dense analytics into interfaces that feel simple, human, and immediately useful.",
        "The goal is not just to display data, but to support better, faster decisions for teams across the organization."
      ],
    },
    "facilitation-lessons": {
      title: "5 Facilitation Lessons from High-Stakes Workshops",
      category: "Facilitation",
      meta: "Dec 2, 2024 · 4 min read",
      image: "./styles/image/project 4.jpeg",
      imageAlt: "Team in a workshop",
      paragraphs: [
        "High‑stakes workshops are rarely about the slides—they’re about the energy in the room and the clarity of the outcomes.",
        "Setting expectations early, naming tensions openly, and designing moments for quiet reflection are small tactics that dramatically improve group outcomes.",
        "Facilitation is ultimately an act of service: your job is to help the group see options more clearly and move together with confidence."
      ],
    },
  };

  function openArticle(id) {
    const article = articles[id];
    if (!article) return;

    categoryEl.textContent = article.category;
    titleEl.textContent = article.title;
    metaEl.textContent = article.meta;
    imageEl.src = article.image;
    imageEl.alt = article.imageAlt;

    bodyEl.innerHTML = "";
    article.paragraphs.forEach((text) => {
      const p = document.createElement("p");
      p.textContent = text;
      bodyEl.appendChild(p);
    });

    detailSection.classList.remove("hidden");

    const headerOffset = document.querySelector(".header")?.offsetHeight || 0;
    const sectionTop = detailSection.offsetTop - headerOffset - 20;
    window.scrollTo({ top: sectionTop, behavior: "smooth" });
  }

  blogCards.forEach((card) => {
    const id = card.getAttribute("data-blog-id");
    if (!id) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", function (e) {
      // Avoid double-handling if link itself is clicked
      if (e.target.closest(".blog-read-more")) return;
      openArticle(id);
    });

    const readMore = card.querySelector(".blog-read-more");
    if (readMore) {
      readMore.addEventListener("click", function (e) {
        e.preventDefault();
        openArticle(id);
      });
    }
  });

  if (backLink) {
    backLink.addEventListener("click", function (e) {
      e.preventDefault();
      const blogListSection = document.getElementById("blog");
      if (!blogListSection) return;

      const headerOffset = document.querySelector(".header")?.offsetHeight || 0;
      const sectionTop = blogListSection.offsetTop - headerOffset - 20;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    });
  }
}

// Debounce Function for Performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle Function for Performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Loading State
function showLoading(element) {
  element.classList.add("loading");
}

function hideLoading(element) {
  element.classList.remove("loading");
}

// Utility: Get Element Height
function getElementHeight(element) {
  return element ? element.offsetHeight : 0;
}

// Utility: Check if Element is in Viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Connect Sections - Scroll to section with smooth transition
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const headerHeight = document.querySelector(".header")?.offsetHeight || 0;
  const targetPosition = section.offsetTop - headerHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });
}

// Export functions for use in other files
window.portfolioUtils = {
  validateForm,
  debounce,
  throttle,
  showLoading,
  hideLoading,
  isInViewport,
  getElementHeight,
  scrollToSection,
};
