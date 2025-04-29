document.addEventListener('DOMContentLoaded', () => {
    // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const shipItems = document.querySelectorAll('.ship-item');
    
    if (filterButtons.length && shipItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                // Show/hide ships based on filter
                shipItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Initialize gallery items with animation
    shipItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Staggered animation on page load
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Add image zoom effect on hover
    shipItems.forEach(item => {
        const image = item.querySelector('.ship-image img');
        
        if (image) {
            item.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
            });
        }
    });
});