/* ==========================================
   SLIDER.JS - TESTIMONIAL & CAROUSEL
   ========================================== */

class Slider {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = {
      auto: options.auto ?? true,
      autoDelay: options.autoDelay ?? 5000,
      speed: options.speed ?? 500,
      loop: options.loop ?? true,
      ...options
    };

    this.currentIndex = 0;
    this.slides = this.container.querySelectorAll('[data-slide]');
    this.totalSlides = this.slides.length;
    this.isTransitioning = false;

    if (this.totalSlides > 1) {
      this.init();
    }
  }

  init() {
    this.createIndicators();
    this.setupControls();
    this.updateSlide();

    if (this.options.auto) {
      this.startAutoPlay();
    }

    // Pause autoplay on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => {
      if (this.options.auto) this.startAutoPlay();
    });
  }

  createIndicators() {
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slider-indicators';

    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.className = 'indicator';
      indicator.setAttribute('data-slide-index', i);
      if (i === 0) indicator.classList.add('active');

      indicator.addEventListener('click', () => this.goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }

    this.container.appendChild(indicatorsContainer);
    this.indicators = indicatorsContainer.querySelectorAll('.indicator');
  }

  setupControls() {
    const prevBtn = this.container.querySelector('[data-slider-prev]');
    const nextBtn = this.container.querySelector('[data-slider-next]');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.prev());
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.next());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  updateSlide() {
    // Hide all slides
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active');
      if (index === this.currentIndex) {
        slide.classList.add('active');
        // Add animation
        slide.classList.remove('animate-fade-in');
        void slide.offsetWidth; // Trigger reflow
        slide.classList.add('animate-fade-in');
      }
    });

    // Update indicators
    this.indicators?.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });
  }

  next() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateSlide();

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.options.speed);
  }

  prev() {
    if (this.isTransitioning) return;

    this.isTransitioning = true;
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlide();

    setTimeout(() => {
      this.isTransitioning = false;
    }, this.options.speed);
  }

  goToSlide(index) {
    if (this.isTransitioning || index === this.currentIndex) return;

    this.currentIndex = index;
    this.updateSlide();
  }

  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => this.next(), this.options.autoDelay);
  }

  stopAutoPlay() {
    clearInterval(this.autoPlayTimer);
  }

  destroy() {
    this.stopAutoPlay();
    document.removeEventListener('keydown', this.keyHandler);
  }
}

// ==========================================
// GALLERY GRID
// ==========================================

class GalleryGrid {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.options = {
      cols: options.cols ?? 3,
      gap: options.gap ?? '1.5rem',
      ...options
    };

    this.init();
  }

  init() {
    this.container.style.display = 'grid';
    this.container.style.gridTemplateColumns = `repeat(auto-fit, minmax(280px, 1fr))`;
    this.container.style.gap = this.options.gap;

    // Add image loading animations
    this.container.querySelectorAll('img').forEach((img, index) => {
      img.classList.add('stagger-item');
      img.style.animationDelay = `${index * 0.1}s`;
    });
  }

  filter(category) {
    this.container.querySelectorAll('[data-category]').forEach(item => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.classList.remove('hidden');
        item.classList.add('animate-fade-in');
      } else {
        item.classList.add('hidden');
      }
    });
  }
}

// ==========================================
// IMAGE LIGHTBOX
// ==========================================

class Lightbox {
  constructor(imageSelector = '[data-lightbox]', options = {}) {
    this.images = document.querySelectorAll(imageSelector);
    this.options = {
      closeOnBackdropClick: options.closeOnBackdropClick ?? true,
      keyboard: options.keyboard ?? true,
      ...options
    };

    if (this.images.length > 0) {
      this.init();
    }
  }

  init() {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img class="lightbox-image" src="" alt="Lightbox Image" />
        <div class="lightbox-nav">
          <button class="lightbox-prev">&larr;</button>
          <button class="lightbox-next">&rarr;</button>
        </div>
      </div>
    `;

    document.body.appendChild(lightbox);

    this.lightbox = lightbox;
    this.currentIndex = 0;

    // Setup event listeners
    this.images.forEach((img, index) => {
      img.addEventListener('click', () => this.open(index));
    });

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    lightbox.querySelector('.lightbox-backdrop').addEventListener('click', () => {
      if (this.options.closeOnBackdropClick) this.close();
    });
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());

    if (this.options.keyboard) {
      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
        if (e.key === 'Escape') this.close();
      });
    }
  }

  open(index) {
    this.currentIndex = index;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateImage();
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  updateImage() {
    const img = this.images[this.currentIndex];
    const lightboxImg = this.lightbox.querySelector('.lightbox-image');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }
}

// ==========================================
// CAROUSEL WITH AUTOPLAY
// ==========================================

class Carousel {
  constructor(containerSelector, options = {}) {
    this.slider = new Slider(containerSelector, {
      auto: true,
      autoDelay: 4000,
      speed: 500,
      ...options
    });
  }
}

// ==========================================
// INITIALIZATION ON DOM READY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize testimonial slider
  const testimonialSlider = document.querySelector('[data-slider-testimonials]');
  if (testimonialSlider) {
    new Slider('[data-slider-testimonials]', {
      auto: true,
      autoDelay: 5000,
      loop: true
    });
  }

  // Initialize gallery if it exists
  const gallery = document.querySelector('[data-gallery]');
  if (gallery) {
    new GalleryGrid('[data-gallery]');
  }

  // Initialize lightbox
  new Lightbox('[data-lightbox]');
});

// ==========================================
// EXPORT FOR MODULAR USE
// ==========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Slider,
    Carousel,
    GalleryGrid,
    Lightbox
  };
}
