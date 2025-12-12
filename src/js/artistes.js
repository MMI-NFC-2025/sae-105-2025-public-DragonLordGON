// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const artistCards = document.querySelectorAll('.artist-card');
    const prevButton = document.querySelector('.carousel-arrow--prev');
    const nextButton = document.querySelector('.carousel-arrow--next');
    const dots = document.querySelectorAll('.carousel-dot');

    let currentIndex = 0;
    const totalCards = artistCards.length;

    // Update carousel position
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        updateDots();
    }

    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('carousel-dot--active');
            } else {
                dot.classList.remove('carousel-dot--active');
            }
        });
    }

    // Go to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }

    // Go to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    // Event listeners for arrows
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
        });
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Auto-advance carousel (optional - uncomment to enable)
    // let autoAdvanceInterval;
    // const autoAdvanceDelay = 5000; // 5 seconds

    // function startAutoAdvance() {
    //     autoAdvanceInterval = setInterval(nextSlide, autoAdvanceDelay);
    // }

    // function stopAutoAdvance() {
    //     clearInterval(autoAdvanceInterval);
    // }

    // // Start auto-advance
    // startAutoAdvance();

    // // Pause on hover
    // const carouselContainer = document.querySelector('.artistes-carousel__container');
    // carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
    // carouselContainer.addEventListener('mouseleave', startAutoAdvance);

    // // Pause on touch
    // carouselContainer.addEventListener('touchstart', stopAutoAdvance);

    // Initialize
    updateCarousel();
});
