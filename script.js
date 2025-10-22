/*
 * Dynamic carousel functionality
 *
 * This script populates the portfolio carousel based on the global
 * `portfolioItems` array defined in `portfolio-data.js`. Items are
 * automatically grouped into slides with up to four projects on each
 * slide. The script also creates navigation dots corresponding to
 * each slide and wires up previous/next button handlers. To add or
 * remove projects, edit the `portfolioItems` array and reload the
 * page – no HTML changes are required.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Fallback to an empty array if portfolioItems is not defined
  const items = Array.isArray(window.portfolioItems) ? window.portfolioItems : [];
  const slidesContainer = document.querySelector('.slides');
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentIndex = 0;

  // Number of items per slide. Set to 4 to satisfy the requirement.
  const ITEMS_PER_SLIDE = 4;

  // Helper to create DOM elements with classes and attributes
  function createElement(tag, className, attrs = {}) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  }

  // Group items into slides
  const slides = [];
  for (let i = 0; i < items.length; i += ITEMS_PER_SLIDE) {
    const group = items.slice(i, i + ITEMS_PER_SLIDE);
    slides.push(group);
  }

  // Generate slide markup
  slidesContainer.innerHTML = '';
  slides.forEach((group, slideIndex) => {
    const slideEl = createElement('div', 'slide' + (slideIndex === 0 ? ' active' : ''));
    group.forEach(item => {
      const itemEl = createElement('div', 'portfolio-item');
      // Video placeholder and image link
      const placeholder = createElement('div', 'video-placeholder');
      const link = createElement('a', '', { href: item.url, target: '_blank', rel: 'noopener' });
      const img = createElement('img', '', { src: item.image, alt: `${item.title} 썸네일` });
      link.appendChild(img);
      placeholder.appendChild(link);
      // Title and description
      const titleEl = createElement('h3');
      titleEl.innerHTML = item.title;
      const descEl = createElement('p');
      descEl.textContent = item.description;
      // Compose portfolio item
      itemEl.appendChild(placeholder);
      itemEl.appendChild(titleEl);
      itemEl.appendChild(descEl);
      slideEl.appendChild(itemEl);
    });
    slidesContainer.appendChild(slideEl);
  });

  // Generate navigation dots
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = createElement('button', 'dot' + (i === 0 ? ' active' : ''));
    dot.setAttribute('aria-label', `슬라이드 ${i + 1}로 이동`);
    dot.addEventListener('click', () => {
      showSlide(i);
    });
    dotsContainer.appendChild(dot);
  });

  // Show a specific slide and update dot states
  function showSlide(index) {
    const total = slidesContainer.children.length;
    // Normalize index for wrap-around
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    Array.from(slidesContainer.children).forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }

  // Hook up previous and next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentIndex + 1);
    });
  }
});