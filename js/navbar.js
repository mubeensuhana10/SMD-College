/* ==========================================
   NAVBAR.JS - NAVIGATION FUNCTIONALITY
   ========================================== */

class Navbar {
  constructor() {
    this.navbar = document.querySelector('nav');
    this.toggleBtn = document.querySelector('.mobile-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.announceBar = document.querySelector('.announce-bar');
    this.lastScroll = 0;

    this.init();
  }

  init() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when a link is clicked
    this.navMenu?.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Handle scroll events
    window.addEventListener('scroll', () => this.handleScroll());

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('nav') && !e.target.closest('.mobile-toggle')) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    if (this.navMenu) {
      this.navMenu.classList.toggle('active');
      this.toggleBtn.classList.toggle('active');
    }
  }

  closeMenu() {
    if (this.navMenu) {
      this.navMenu.classList.remove('active');
      this.toggleBtn?.classList.remove('active');
    }
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      this.navbar?.classList.add('scrolled');
    } else {
      this.navbar?.classList.remove('scrolled');
    }

    // Hide/show navbar on scroll down/up
    if (currentScroll <= 0) {
      this.navbar?.classList.remove('hidden');
      return;
    }

    if (currentScroll > this.lastScroll && currentScroll > 500) {
      // Scrolling down
      this.navbar?.classList.add('hidden');
    } else {
      // Scrolling up
      this.navbar?.classList.remove('hidden');
    }

    this.lastScroll = currentScroll;
  }
}

// ==========================================
// BREADCRUMB NAVIGATION
// ==========================================

class Breadcrumb {
  constructor(containerSelector = '.breadcrumb') {
    this.container = document.querySelector(containerSelector);
    if (this.container) {
      this.generate();
    }
  }

  generate() {
    const path = window.location.pathname;
    const pages = {
      '/': 'Home',
      '/index.html': 'Home',
      '/about.html': 'About',
      '/courses.html': 'Courses',
      '/admissions.html': 'Admissions',
      '/facilities.html': 'Facilities',
      '/campus-life.html': 'Campus Life',
      '/contact.html': 'Contact'
    };

    let html = '<a href="index.html">Home</a>';

    // Find current page
    for (const [route, label] of Object.entries(pages)) {
      if (path.includes(route) && route !== '/' && route !== '/index.html') {
        html += ` <span class="separator">/</span> <span class="current">${label}</span>`;
        break;
      }
    }

    this.container.innerHTML = html;
  }
}

// ==========================================
// ACTIVE LINK HIGHLIGHTING
// ==========================================

function updateActiveLinks() {
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPage = href.split('/').pop();

    if (linkPage === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ==========================================
// DROPDOWN MENU SUPPORT (if needed)
// ==========================================

class DropdownMenu {
  constructor() {
    this.setupDropdowns();
  }

  setupDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const menu = toggle.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
          menu.classList.toggle('active');
        }
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.remove('active');
        });
      }
    });
  }
}

// ==========================================
// STICKY NAVBAR
// ==========================================

class StickyNavbar {
  constructor(navSelector = 'nav') {
    this.nav = document.querySelector(navSelector);
    this.scrollThreshold = 10;

    if (this.nav) {
      window.addEventListener('scroll', () => this.update());
    }
  }

  update() {
    if (window.pageYOffset > this.scrollThreshold) {
      this.nav.classList.add('sticky');
    } else {
      this.nav.classList.remove('sticky');
    }
  }
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navbar
  new Navbar();

  // Initialize breadcrumb
  new Breadcrumb();

  // Update active links
  updateActiveLinks();

  // Initialize sticky navbar
  new StickyNavbar();

  // Initialize dropdowns if they exist
  if (document.querySelector('.dropdown')) {
    new DropdownMenu();
  }
});

// ==========================================
// EXPORT FOR MODULAR USE
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navbar,
    Breadcrumb,
    StickyNavbar,
    DropdownMenu
  };
}
