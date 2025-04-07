document.addEventListener('DOMContentLoaded', () => {
    // Device Detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

    // Initialize AOS with device-specific settings
    AOS.init({
        duration: isMobile ? 600 : 1000,
        once: true,
        offset: isMobile ? 50 : 100,
        disable: window.innerWidth < 768
    });

    // Video Controls
    const videoContainer = document.querySelector('.video-container');
    const backgroundVideo = document.getElementById('bgVideo');
    const playButton = document.querySelector('.video-play-btn');
    const heroContent = document.querySelector('.hero-content');
    const overlay = document.querySelector('.overlay');

    if (playButton && backgroundVideo) {
        let isPlaying = false;
        let textTimeout;

        const hideContent = () => {
            heroContent.style.opacity = '0.5';
            overlay.style.opacity = '0';
            videoContainer.style.transform = 'scale(0.95)';
        };

        const showContent = () => {
            heroContent.style.opacity = '1';
            overlay.style.opacity = '1';
            videoContainer.style.transform = 'scale(1)';
        };

        playButton.addEventListener('click', () => {
            if (!isPlaying) {
                backgroundVideo.play();
                hideContent();
                playButton.style.opacity = '0';
                isPlaying = true;

                clearTimeout(textTimeout);
                textTimeout = setTimeout(() => {
                    showContent();
                    playButton.style.opacity = '1';
                }, 11000);
            }
        });

        backgroundVideo.addEventListener('ended', () => {
            isPlaying = false;
            showContent();
            playButton.style.opacity = '1';
            clearTimeout(textTimeout);
        });

        // Hover effect for video container
        videoContainer.addEventListener('mouseenter', () => {
            if (!isPlaying) {
                videoContainer.style.transform = 'scale(0.98)';
            }
        });

        videoContainer.addEventListener('mouseleave', () => {
            if (!isPlaying) {
                videoContainer.style.transform = 'scale(1)';
            }
        });

        // Pause video when out of viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && isPlaying) {
                    backgroundVideo.pause();
                    showContent();
                    playButton.style.opacity = '1';
                    isPlaying = false;
                    clearTimeout(textTimeout);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(videoContainer);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.padding = '20px 0';
        }
    });

    // Portfolio item hover effect
    const portfolioHexItems = document.querySelectorAll('.portfolio-item');
    portfolioHexItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Service items animation
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px)';
            item.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.number');
    const statsSection = document.querySelector('.about');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.ceil(count) + '+';
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCount();
        });
    };

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        observer.observe(statsSection);
    }

    // Video background parallax effect
    if (backgroundVideo) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            backgroundVideo.style.transform = `translate(-50%, ${-50 + scrolled * 0.1}%)`;
        });
    }

    // Mobile Menu Optimization
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuSpans = document.querySelectorAll('.mobile-menu-btn span');
    let isMenuOpen = false;

    if (mobileMenuBtn) {
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            
            // Animate menu button
            menuSpans[0].style.transform = isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
            menuSpans[1].style.opacity = isMenuOpen ? '0' : '1';
            menuSpans[2].style.transform = isMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : '';
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);

        // Close menu on link click
        document.querySelectorAll('.mobile-menu-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });
    }

    // Optimize video loading for mobile
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (isMobile) {
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'none');
        }

        // Pause videos when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Touch-friendly portfolio items
    const portfolioItems = document.querySelectorAll('.hex-item');
    if (isMobile || isTablet) {
        portfolioItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });

            item.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }

    // Optimize scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                
                // Update navbar
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }, 16);
        }
    }, { passive: true });

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Reset menu state
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Recalculate heights
        setTimeout(() => {
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.height = window.innerHeight + 'px';
            }
        }, 200);
    });

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                isMenuOpen = false;
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // Portfolio Video Controls
    const portfolioVideos = document.querySelectorAll('.portfolio-video');
    const playIcons = document.querySelectorAll('.play-icon');

    playIcons.forEach((icon, index) => {
        const video = portfolioVideos[index];
        let isPlaying = false;

        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Stop all other videos
            portfolioVideos.forEach((v, i) => {
                if (i !== index) {
                    v.pause();
                    playIcons[i].classList.remove('playing');
                }
            });

            if (!isPlaying) {
                video.play();
                icon.classList.add('playing');
                icon.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                icon.classList.remove('playing');
                icon.innerHTML = '<i class="fas fa-play"></i>';
            }
            isPlaying = !isPlaying;
        });

        // Pause video when out of viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && isPlaying) {
                    video.pause();
                    icon.classList.remove('playing');
                    icon.innerHTML = '<i class="fas fa-play"></i>';
                    isPlaying = false;
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        // Start video preview on hover
        const hexItem = icon.closest('.hex-item');
        hexItem.addEventListener('mouseenter', () => {
            if (!isPlaying) {
                video.play();
            }
        });

        hexItem.addEventListener('mouseleave', () => {
            if (!isPlaying) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
}); 