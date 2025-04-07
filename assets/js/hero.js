document.addEventListener('DOMContentLoaded', () => {
    // Video Modal Controls
    const playReelBtn = document.querySelector('.play-reel-btn');
    const videoModal = document.querySelector('.video-modal');
    const closeModal = document.querySelector('.close-modal');
    const showreel = document.getElementById('showreel');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open Video Modal
    playReelBtn.addEventListener('click', () => {
        videoModal.classList.add('active');
        showreel.play();
        // Add sound effect
        playSound('click');
    });

    // Close Video Modal
    const closeVideoModal = () => {
        videoModal.classList.remove('active');
        showreel.pause();
        showreel.currentTime = 0;
        // Add sound effect
        playSound('close');
    };

    closeModal.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', closeVideoModal);

    // Close modal with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Sound Effects
    const playSound = (type) => {
        const sound = new Audio();
        sound.volume = 0.2;
        
        switch(type) {
            case 'click':
                sound.src = 'assets/sounds/click.mp3';
                break;
            case 'close':
                sound.src = 'assets/sounds/close.mp3';
                break;
        }
        
        sound.play();
    };

    // Parallax Effect on Scroll
    let lastScrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const backgroundVideo = document.querySelector('.background-video');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const speed = 0.5;
        
        const translateY = (scrolled - lastScrollY) * speed;
        heroContent.style.transform = `translate(-50%, calc(-50% + ${translateY}px))`;
        backgroundVideo.style.transform = `translate(-50%, calc(-50% - ${translateY * 0.5}px))`;
        
        lastScrollY = scrolled;
    });

    // Interactive Cursor Effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .play-reel-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });
}); 