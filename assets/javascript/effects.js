/**
 * Visual Effects for CodeImag.in
 * Adds scroll reveal, smooth scrolling, and interactive hover effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initTiltEffect();
    initSearchEffects();
});

/**
 * 1. Scroll Reveal Animation
 * Uses IntersectionObserver to fade in elements as they scroll into view.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.content-item, .hero-section, .footer-section, .hero-copy, .language-tags');

    // Add .reveal class to all target elements initially
    revealElements.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Offset slightly so it triggers before bottom
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

/**
 * 2. Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * 3. Tilt / Magnetic Effect for Cards
 * Adds a subtle 3D tilt effect to content cards on hover.
 */
function initTiltEffect() {
    const cards = document.querySelectorAll('.content-item, .hero-image-frame');

    cards.forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/**
 * 4. Search Bar Effects
 * Adds a dynamic focus ring effect.
 */
function initSearchEffects() {
    const searchBar = document.querySelector('.search-bar');
    if (!searchBar) return;

    // Create and append the focus ring element if it doesn't exist
    if (!searchBar.querySelector('.search-focus-ring')) {
        const ring = document.createElement('div');
        ring.className = 'search-focus-ring';
        searchBar.style.position = 'relative'; // Ensure parent is relative
        searchBar.prepend(ring);
    }
}
