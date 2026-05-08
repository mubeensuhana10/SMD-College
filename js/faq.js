/* ==========================================
   FAQ.JS - ACCORDION FUNCTIONALITY
   ========================================== */

class Accordion {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = {
      allowMultiple: options.allowMultiple ?? false,
      closeOthers: options.closeOthers ?? true,
      speed: options.speed ?? 300,
      ...options
    };

    this.items = this.container.querySelectorAll('[data-accordion-item]');
    this.init();
  }

  init() {
    this.items.forEach((item, index) => {
      const trigger = item.querySelector('[data-accordion-trigger]');
      const content = item.querySelector('[data-accordion-content]');

      if (!trigger || !content) return;

      // Set initial state
      trigger.setAttribute('aria-expanded', 'false');
      content.style.maxHeight = '0px';
      content.style.overflow = 'hidden';
      content.style.transition = `max-height ${this.options.speed}ms ease`;

      trigger.addEventListener('click', () => this.toggle(item));
    });
  }

  toggle(item) {
    const isOpen = item.classList.contains('active');

    if (isOpen) {
      this.close(item);
    } else {
      // Close others if needed
      if (this.options.closeOthers && !this.options.allowMultiple) {
        this.items.forEach(i => {
          if (i !== item && i.classList.contains('active')) {
            this.close(i);
          }
        });
      }
      this.open(item);
    }
  }

  open(item) {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const content = item.querySelector('[data-accordion-content]');

    if (!trigger || !content) return;

    item.classList.add('active');
    trigger.classList.add('active');
    trigger.setAttribute('aria-expanded', 'true');

    // Animate content
    content.style.maxHeight = content.scrollHeight + 'px';

    // Add animation class
    trigger.classList.remove('animate-fade-in-down');
    void trigger.offsetWidth; // Trigger reflow
    trigger.classList.add('animate-fade-in-down');
  }

  close(item) {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const content = item.querySelector('[data-accordion-content]');

    if (!trigger || !content) return;

    item.classList.remove('active');
    trigger.classList.remove('active');
    trigger.setAttribute('aria-expanded', 'false');

    // Collapse content
    content.style.maxHeight = '0px';
  }

  openAll() {
    if (this.options.allowMultiple) {
      this.items.forEach(item => this.open(item));
    }
  }

  closeAll() {
    this.items.forEach(item => this.close(item));
  }
}

// ==========================================
// FAQ SECTION
// ==========================================

class FAQ {
  constructor(containerSelector = '[data-faq]') {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    // Initialize accordion
    this.accordion = new Accordion(containerSelector, {
      allowMultiple: false,
      closeOthers: true
    });

    // Setup search if available
    this.setupSearch();
  }

  setupSearch() {
    const searchInput = document.querySelector('[data-faq-search]');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => this.filterFAQs(e.target.value));
  }

  filterFAQs(query) {
    const items = this.container.querySelectorAll('[data-accordion-item]');
    const lowerQuery = query.toLowerCase();

    items.forEach(item => {
      const question = item.querySelector('[data-accordion-trigger]')?.textContent.toLowerCase();
      const answer = item.querySelector('[data-accordion-content]')?.textContent.toLowerCase();

      const matches = question?.includes(lowerQuery) || answer?.includes(lowerQuery);

      if (matches) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
}

// ==========================================
// TABS COMPONENT
// ==========================================

class Tabs {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = {
      speed: options.speed ?? 300,
      ...options
    };

    this.tabs = this.container.querySelectorAll('[data-tab]');
    this.panels = this.container.querySelectorAll('[data-tab-panel]');

    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', () => this.selectTab(tab));
    });
  }

  selectTab(tab) {
    const tabId = tab.getAttribute('data-tab');

    // Deactivate all tabs and panels
    this.tabs.forEach(t => t.classList.remove('active'));
    this.panels.forEach(p => p.classList.remove('active'));

    // Activate selected tab and panel
    tab.classList.add('active');
    const panel = this.container.querySelector(`[data-tab-panel="${tabId}"]`);
    if (panel) {
      panel.classList.add('active');
      panel.classList.add('animate-fade-in');
    }
  }
}

// ==========================================
// TOGGLE SWITCH
// ==========================================

class ToggleSwitch {
  constructor(switchSelector, onToggle = null) {
    this.switches = document.querySelectorAll(switchSelector);

    this.switches.forEach(switchEl => {
      switchEl.addEventListener('change', (e) => {
        if (onToggle) onToggle(e.target.checked, switchEl);
      });
    });
  }
}

// ==========================================
// MODAL DIALOG
// ==========================================

class Modal {
  constructor(triggerSelector, modalSelector, options = {}) {
    this.trigger = document.querySelector(triggerSelector);
    this.modal = document.querySelector(modalSelector);

    if (!this.trigger || !this.modal) return;

    this.options = {
      closeOnBackdrop: options.closeOnBackdrop ?? true,
      closeOnEscape: options.closeOnEscape ?? true,
      ...options
    };

    this.init();
  }

  init() {
    this.trigger.addEventListener('click', () => this.open());

    const closeBtn = this.modal.querySelector('[data-modal-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    if (this.options.closeOnBackdrop) {
      const backdrop = this.modal.querySelector('[data-modal-backdrop]');
      if (backdrop) {
        backdrop.addEventListener('click', () => this.close());
      }
    }

    if (this.options.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.modal.classList.contains('active')) {
          this.close();
        }
      });
    }
  }

  open() {
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ==========================================
// COLLAPSIBLE SECTION
// ==========================================

class Collapsible {
  constructor(triggerSelector, targetSelector) {
    this.triggers = document.querySelectorAll(triggerSelector);

    this.triggers.forEach(trigger => {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      trigger.addEventListener('click', () => {
        target.classList.toggle('collapsed');
        trigger.classList.toggle('active');
      });
    });
  }
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize FAQs
  const faqContainer = document.querySelector('[data-faq]');
  if (faqContainer) {
    new FAQ('[data-faq]');
  }

  // Initialize all accordions
  document.querySelectorAll('[data-accordion]').forEach(accordion => {
    new Accordion(null, { allowMultiple: false });
  });

  // Initialize tabs
  document.querySelectorAll('[data-tabs]').forEach(tabs => {
    new Tabs(tabs.getAttribute('data-tabs'));
  });

  // Add styles for lightbox if they don't exist
  if (!document.querySelector('style[data-lightbox-styles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-lightbox-styles', 'true');
    style.textContent = `
      .lightbox {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }

      .lightbox.active {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .lightbox-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(4px);
      }

      .lightbox-content {
        position: relative;
        z-index: 1001;
        max-width: 90%;
        max-height: 90vh;
      }

      .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        border-radius: 0.5rem;
      }

      .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        color: white;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .lightbox-close:hover {
        transform: scale(1.1);
      }

      .lightbox-nav {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        display: flex;
        justify-content: space-between;
        pointer-events: none;
      }

      .lightbox-prev,
      .lightbox-next {
        pointer-events: all;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.3s ease;
      }

      .lightbox-prev:hover,
      .lightbox-next:hover {
        background: rgba(255, 255, 255, 0.4);
      }

      @media (max-width: 640px) {
        .lightbox-close {
          top: -30px;
          font-size: 1.5rem;
        }

        .lightbox-image {
          max-height: 70vh;
        }
      }
    `;
    document.head.appendChild(style);
  }
});

// ==========================================
// EXPORT FOR MODULAR USE
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Accordion,
    FAQ,
    Tabs,
    ToggleSwitch,
    Modal,
    Collapsible
  };
}
