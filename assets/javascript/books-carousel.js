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

      // Render all books (no carousel logic needed for bookshelf)
      books.forEach((book, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.dataset.index = index;

        const img = document.createElement('img');
        img.src = book.cover;
        img.alt = book.title;
        img.className = 'book-cover';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'book-info';

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
        // Shortlink style button
        link.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 16 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          Amazon ↗
        `;
        link.className = 'book-link';

        infoDiv.appendChild(title);
        infoDiv.appendChild(desc);
        infoDiv.appendChild(link);

        slide.appendChild(img);
        slide.appendChild(infoDiv);
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

      // Scroll logic
      const scrollAmount = 304; // Card width (280px) + gap (24px)

      prevBtn.addEventListener('click', () => {
        slidesWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        slidesWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    })
    .catch(err => console.error('Failed to load books data:', err));
})();
