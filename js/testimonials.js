document.addEventListener('DOMContentLoaded', () => {
    // Testimonial slider functionality
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Function to show a specific slide
    const showSlide = (index) => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    };
    
    // Function to show the next slide
    const nextSlide = () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    };
    
    // Function to show the previous slide
    const prevSlide = () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    };
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize first slide
    showSlide(currentSlide);
});