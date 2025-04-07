document.addEventListener('DOMContentLoaded', function() {
    const numbers = document.querySelectorAll('.number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const updateCount = () => {
            count += increment;
            if (count < target) {
                element.textContent = Math.floor(count);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    numbers.forEach(number => observer.observe(number));
}); 