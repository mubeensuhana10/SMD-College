/* ==========================================
   MAIN.JS - CORE FUNCTIONALITY
   ========================================== */

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Optionally unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with scroll-fade-in class
document.querySelectorAll('.scroll-fade-in').forEach(el => {
  observer.observe(el);
});

// ==========================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ==========================================

function updateActiveNav() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || (currentPath.endsWith('/') && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateActiveNav);

// ==========================================
// SMOOTH PAGE TRANSITIONS
// ==========================================

window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-exit');
  document.body.classList.add('page-enter');
});

// ==========================================
// DYNAMIC YEAR IN FOOTER
// ==========================================

function updateYear() {
  const yearElements = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
}

document.addEventListener('DOMContentLoaded', updateYear);

// ==========================================
// FORM VALIDATION
// ==========================================

class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validate()) {
      this.submitForm();
    }
  }

  validate() {
    const inputs = this.form.querySelectorAll('.form-control');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
        this.showError(input);
      } else {
        this.clearError(input);
      }
    });

    return isValid;
  }

  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;

    if (!value && input.hasAttribute('required')) {
      return false;
    }

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

    if (type === 'tel') {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(value.replace(/\D/g, ''));
    }

    return true;
  }

  showError(input) {
    input.classList.add('is-invalid');
    const errorMsg = input.getAttribute('data-error');
    if (errorMsg && !input.nextElementSibling?.classList.contains('error-message')) {
      const error = document.createElement('small');
      error.className = 'error-message';
      error.style.color = 'var(--danger)';
      error.style.display = 'block';
      error.style.marginTop = '0.25rem';
      error.textContent = errorMsg;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
  }

  clearError(input) {
    input.classList.remove('is-invalid');
    const errorMsg = input.parentNode.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  submitForm() {
    // Here you would typically send the form data to a server
    // For now, we'll show a success message
    const submitBtn = this.form.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate sending form data (replace with actual API call)
    setTimeout(() => {
      alert('Thank you! Your inquiry has been received. We will contact you shortly.');
      this.form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================

class ScrollToTop {
  constructor(buttonSelector = '.scroll-to-top') {
    this.button = document.querySelector(buttonSelector);
    if (this.button) {
      window.addEventListener('scroll', () => this.toggle());
      this.button.addEventListener('click', () => this.scroll());
    }
  }

  toggle() {
    if (window.pageYOffset > 300) {
      this.button.classList.add('visible');
    } else {
      this.button.classList.remove('visible');
    }
  }

  scroll() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

// ==========================================
// COUNTER ANIMATION
// ==========================================

class CounterAnimation {
  constructor(elementSelector) {
    this.elements = document.querySelectorAll(elementSelector);
    this.observeCounters();
  }

  observeCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    });

    this.elements.forEach(el => counterObserver.observe(el));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    let current = 0;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================

function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
  }
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize scroll to top
  new ScrollToTop('.scroll-to-top');

  // Initialize counter animations
  new CounterAnimation('.counter');

  // Initialize lazy loading
  initLazyLoading();
});

// ==========================================
// EXPORT FOR MODULAR USE
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FormValidator,
    ScrollToTop,
    CounterAnimation
  };
}
