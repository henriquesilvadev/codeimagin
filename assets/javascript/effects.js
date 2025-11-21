/**
 * Visual Effects for CodeImag.in
 * Adds scroll reveal, smooth scrolling, and interactive hover effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initSmoothScroll();
    initTiltEffect();
    initSearchEffects();
    initCodeBlockEnhancements();
});

/**
 * 5. Code Block Enhancements
 * Adds Maximize and Copy buttons to code blocks.
 */
function initCodeBlockEnhancements() {
    // Observer to handle dynamically added code blocks (e.g., from search results)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Check if the node itself is a code block or contains one
                    if (node.matches('.code-block')) {
                        enhanceCodeBlock(node);
                    } else if (node.querySelectorAll) {
                        node.querySelectorAll('.code-block').forEach(enhanceCodeBlock);
                    }
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Enhance existing blocks
    document.querySelectorAll('.code-block').forEach(enhanceCodeBlock);
}

function enhanceCodeBlock(codeBlock) {
    // Prevent double enhancement
    if (codeBlock.closest('.code-block-wrapper')) return;

    // Create Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block-wrapper';

    // Create Toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';

    // Copy Button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-btn';
    copyBtn.title = 'Copiar código';
    copyBtn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
    <span>Copiar</span>
  `;

    // Maximize Button
    const maxBtn = document.createElement('button');
    maxBtn.className = 'code-btn';
    maxBtn.title = 'Expandir';
    maxBtn.innerHTML = `
    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    <span>Expandir</span>
  `;

    // Assemble Toolbar
    toolbar.appendChild(copyBtn);
    toolbar.appendChild(maxBtn);

    // Wrap the code block
    codeBlock.parentNode.insertBefore(wrapper, codeBlock);
    wrapper.appendChild(toolbar);
    wrapper.appendChild(codeBlock);

    // Placeholder for fullscreen toggle
    const placeholder = document.createElement('div');
    placeholder.style.display = 'none';
    wrapper.parentNode.insertBefore(placeholder, wrapper);

    // --- FEEDBACK SYSTEM ---
    const language = codeBlock.dataset.language || 'unknown';
    const feedbackContainer = document.createElement('div');
    feedbackContainer.className = 'code-feedback';

    const feedbackTypes = [
        { type: 'like', icon: 'M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-2.99-.01z', label: 'Curti' },
        { type: 'dislike', icon: 'M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l2.99.01L3 15c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17-.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z', label: 'Não curti' },
        { type: 'love', icon: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z', label: 'Amei' }
    ];

    feedbackTypes.forEach(({ type, icon, label }) => {
        const btn = document.createElement('button');
        btn.className = 'feedback-btn';
        btn.title = label;

        // Load count from localStorage
        const storageKey = `feedback-${language}-${type}`;
        let count = parseInt(localStorage.getItem(storageKey) || '0', 10);

        btn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="${icon}"/></svg>
      <span class="feedback-count">${count > 0 ? count : ''}</span>
    `;

        btn.addEventListener('click', () => {
            count++;
            localStorage.setItem(storageKey, count);
            btn.querySelector('.feedback-count').textContent = count;

            // Simple animation effect
            btn.classList.add('active');
            setTimeout(() => btn.classList.remove('active'), 300);
        });

        feedbackContainer.appendChild(btn);
    });

    wrapper.appendChild(feedbackContainer);

    // --- EVENT LISTENERS (Copy & Maximize) ---
    copyBtn.addEventListener('click', () => {
        const code = codeBlock.textContent;
        navigator.clipboard.writeText(code).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `<span>Copiado!</span>`;
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    maxBtn.addEventListener('click', () => {
        wrapper.classList.toggle('fullscreen');
        const isFullscreen = wrapper.classList.contains('fullscreen');

        if (isFullscreen) {
            placeholder.style.display = 'block';
            document.body.appendChild(wrapper);
            document.body.style.overflow = 'hidden';
            maxBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg><span>Fechar</span>`;
        } else {
            placeholder.parentNode.insertBefore(wrapper, placeholder);
            placeholder.style.display = 'none';
            document.body.style.overflow = '';
            maxBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg><span>Expandir</span>`;
        }
    });
}


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
