// Books Carousel
// This script loads books data from assets/data/books.json and renders a simple carousel.
// It creates a slide for each book with cover image, title, description and a purchase link.

(function () {
    const carouselContainer = document.getElementById('booksCarousel');
    if (!carouselContainer) return;

    fetch('assets/data/books.json')
        .then(response => response.json())
        .then(books => {
            if (!Array.isArray(books) || books.length === 0) return;
            // Create slides container
            const slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'carousel-slides';
            carouselContainer.appendChild(slidesWrapper);

            books.forEach((book, index) => {
                const slide = document.createElement('div');
                slide.className = 'carousel-slide';
                slide.dataset.index = index;

                const img = document.createElement('img');
                img.src = book.cover;
                img.alt = book.title;
                img.className = 'book-cover';

                const title = document.createElement('h3');
                title.textContent = book.title;
                title.className = 'book-title';

                const desc = document.createElement('p');
                desc.textContent = book.description;
                desc.className = 'book-description';

                const link = document.createElement('a');
                link.href = book.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.textContent = 'Comprar';
                link.className = 'book-link';

                slide.appendChild(img);
                slide.appendChild(title);
                slide.appendChild(desc);
                slide.appendChild(link);
                slidesWrapper.appendChild(slide);
            });

            // Navigation arrows
            const prevBtn = document.createElement('button');
            prevBtn.className = 'carousel-nav prev';
            prevBtn.innerHTML = '&#9664;';
            const nextBtn = document.createElement('button');
            nextBtn.className = 'carousel-nav next';
            nextBtn.innerHTML = '&#9654;';
            carouselContainer.appendChild(prevBtn);
            carouselContainer.appendChild(nextBtn);

            let currentIndex = 0;
            const slides = slidesWrapper.children;
            const total = slides.length;

            function showSlide(index) {
                // wrap around
                currentIndex = (index + total) % total;
                for (let i = 0; i < total; i++) {
                    slides[i].style.display = i === currentIndex ? 'block' : 'none';
                }
            }

            prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
            nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));

            // Initialize first slide
            showSlide(0);
        })
        .catch(err => console.error('Failed to load books data:', err));
})();
