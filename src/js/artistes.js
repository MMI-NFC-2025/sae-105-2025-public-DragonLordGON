

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    const artistCards = document.querySelectorAll('.artist-card');
    const prevButton = document.querySelector('.carousel-arrow--prev');
    const nextButton = document.querySelector('.carousel-arrow--next');
    const dots = document.querySelectorAll('.carousel-dot');

    let currentIndex = 0;
    const totalCards = artistCards.length;


    function updateCarousel() {
        const translateX = -currentIndex * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        updateDots();
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('carousel-dot--active');
            } else {
                dot.classList.remove('carousel-dot--active');
            }
        });
    }


    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    }
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    }


    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }


    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            goToSlide(index);
        });
    });


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

                nextSlide();
            } else {

                prevSlide();
            }
        }
    }


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    
    updateCarousel();
});
