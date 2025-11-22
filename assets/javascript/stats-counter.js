// Animated Counter for Stats Section
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString('pt-BR');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString('pt-BR');
            }
        };

        updateCounter();
    };

    // Intersection Observer to trigger animation when section is visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => observer.observe(stat));
});
