
// Toggle mobile navigation visibility.
 function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuButton || !mobileMenu) return;
 
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
 }
// Smooth-scroll internal anchor links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
 
        if (targetElement) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            window.scrollTo({ top: targetElement.offsetTop - 40, behavior: 'smooth' });
        }
    });
});
// Highlight the active nav link based on the visible section.
 function setupNavObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
 
    if (sections.length === 0 || navLinks.length === 0) return;
 
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
 
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`nav a[href="#${id}"]`);

            if (entry.isIntersecting && correspondingLink) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));
 }
// Reveal section content once it enters the viewport.
 function setupFadeInAnimations() {
    const fadeElements = document.querySelectorAll('#home .fade-in, #about .fade-in, #skills .fade-in');
 
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
 
    fadeElements.forEach(el => observer.observe(el));
 }
// Hero typewriter phrases.
const phrases = ["Creating incredible digital experiences.", "Developing modern interfaces.", "Turning ideas into reality.", "Designing unique visual experiences."];
let currentPhrase = 0;
const typewriterElement = document.querySelector('.typewriter');

const typeWriter = () => {
    if (!typewriterElement) return;
    let i = 0;
    const text = phrases[currentPhrase];
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary');
 
    const typing = setInterval(() => {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i++);
        } else {
            clearInterval(typing);
            setTimeout(deleteText, 2000);
        }
    }, 100);
};
 
const deleteText = () => {
    if (!typewriterElement) return;
    let text = typewriterElement.textContent;
 
    const deleting = setInterval(() => {
        if (text.length > 0) {
            typewriterElement.textContent = text.substring(0, text.length - 1);
            text = typewriterElement.textContent;
        } else {
            clearInterval(deleting);
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        }
    }, 50);
};
// Start typing after a short delay so initial layout is stable.
setTimeout(typeWriter, 2000);
// Animate circular skill indicators only when the skills section appears.
function setupSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
 
    const animateSkills = () => {
        const skillCircles = document.querySelectorAll('.circle-progress');
        const strokeDashOffsets = [
            283 * (1 - 0.95),
            283 * (1 - 0.85),
            283 * (1 - 0.90),
            283 * (1 - 0.95)
        ];
 
        skillCircles.forEach((circle, index) => {
            circle.style.strokeDashoffset = 283;
            setTimeout(() => {
                circle.style.strokeDashoffset = strokeDashOffsets[index];
            }, index * 200);
        });
    };
 
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
 
    observer.observe(skillsSection);
}
// Add subtle parallax movement to the avatar.
function setupParallaxEffect() {
    const avatarWrapper = document.getElementById('avatar-wrapper');
    const avatarDefault = document.getElementById('avatar-default');
    const hoverImage = document.getElementById('hover-image');
 
    if (avatarWrapper && avatarDefault && hoverImage) {
        avatarWrapper.addEventListener('mousemove', (e) => {
            const rect = avatarWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
 
            hoverImage.style.transform = `translateX(-50%) scale(1) translate(${x * 30}px, ${y * 30}px)`;
            avatarDefault.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
        });
 
        avatarWrapper.addEventListener('mouseleave', () => {
            hoverImage.style.transform = 'translateX(-50%) scale(0) translate(0px, 0px)';
            avatarDefault.style.transform = 'translate(0px, 0px)';
        });
    }
}
// Switch navbar style after scrolling.
function setupNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
 
    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('nav-transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('nav-transparent');
        }
    };
 
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
}
// Spawn shooting-star groups on a fixed cadence.
function setupShootingStars() {
    const starContainer = document.getElementById('shooting-star-container');
    if (!starContainer) return;
 
    const STAR_ANIMATION_DURATION_MS = 4000;
 
    const starConfig = [
        { initialTop: '10%', initialLeft: '50%', delay: '0s' },
        { initialTop: '-5%', initialLeft: '40%', delay: '0.1s' },
        { initialTop: '-5%', initialLeft: '60%', delay: '0.2s' }
    ];
 
    const createVStarGroup = () => {
        const starGroupElements = [];
        let removeGroupDelay = STAR_ANIMATION_DURATION_MS;
 
        starConfig.forEach(config => {
            const star = document.createElement('div');
            star.classList.add('shooting-star', 'animate-star-group');
            star.style.top = config.initialTop;
            star.style.left = config.initialLeft;
            star.style.animationDelay = config.delay;
            starContainer.appendChild(star);
            starGroupElements.push(star);
            removeGroupDelay = Math.max(removeGroupDelay, STAR_ANIMATION_DURATION_MS + Math.abs(parseFloat(config.delay) * 1000));
        });
 
        setTimeout(() => {
            starGroupElements.forEach(star => star.remove());
        }, removeGroupDelay + 1000);
    };
 
    const startAnimation = () => {
        createVStarGroup();
        setInterval(createVStarGroup, 10000);
    };
 
    setTimeout(startAnimation, 1000);
}

// Initialize jQuery background birds effect.
$(document).ready(function () {
    $("#BlackBirdsContainer").Background({
        birds: '',
        size: '30',
        interval: '40',
        velocity: '5',
        color: 'rgb(0, 0, 0, 1)'
    });
});
// Infinite-loop projects carousel with dots, swipe, and responsive card count.
function setupProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');
    const mobilePrevButton = document.getElementById('mobile-projects-prev');
    const mobileNextButton = document.getElementById('mobile-projects-next');
    const dotsContainer = document.getElementById('projects-dots');
    if (!carousel || !prevButton || !nextButton || !mobilePrevButton || !mobileNextButton) {
        console.warn("One or more carousel elements were not found, skipping initialization.");
        return;
    }
 
    let originalCards = Array.from(carousel.children);
    let isTransitioning = false;
    // Determine how many cards move per interaction by viewport size.
    const getCardsToScroll = () => {
        if (window.innerWidth <= 768) {
            return 1;
        }
        if (window.innerWidth <= 1024) {
            return 2;
        }
        return 3;
    };
 
    let totalPages = 0;
    // Rebuild pagination dots whenever layout changes.
    const createDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        totalPages = Math.ceil(originalCards.length / getCardsToScroll());
 
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            dotsContainer.appendChild(dot);
        }
    };
    const updateDots = () => {
        if (!dotsContainer) return;
        const cardsToScroll = getCardsToScroll();
        const currentPage = Math.round((currentIndex - cardsToScroll) / cardsToScroll);
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    };
    // Clone edge cards to create the seamless infinite loop.
    const cloneCards = () => {
        const cardsToClone = getCardsToScroll();
        Array.from(carousel.children).forEach(card => {
            if (card.classList.contains('clone')) {
                carousel.removeChild(card);
            }
        });
        for (let i = 0; i < cardsToClone; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        }
        for (let i = originalCards.length - 1; i >= originalCards.length - cardsToClone; i--) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.insertBefore(clone, carousel.firstChild);
        }
    };
 
    cloneCards();
    createDots();
 
    let allCards = Array.from(carousel.children);
    let cardWidth = allCards[0].offsetWidth + parseFloat(getComputedStyle(carousel).gap);
    let currentIndex = getCardsToScroll();
    const updateInitialPosition = () => {
        carousel.style.transition = 'none';
        const initialOffset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${initialOffset}px)`;
    };
 
 
    updateInitialPosition();
    const slide = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;
 
        carousel.style.transition = 'transform 0.5s ease-in-out';
        const cardsToScroll = getCardsToScroll();
        currentIndex += direction * cardsToScroll;

        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        updateDots();
    };
    const goToPage = (pageIndex) => {
        if (isTransitioning) return;
        const cardsToScroll = getCardsToScroll();
        const targetIndex = (pageIndex * cardsToScroll) + cardsToScroll;
        const direction = 0;
        currentIndex = targetIndex;
        slide(direction);
    };
 
    nextButton.addEventListener('click', () => slide(1));
    prevButton.addEventListener('click', () => slide(-1));
    mobileNextButton.addEventListener('click', () => slide(1));
    mobilePrevButton.addEventListener('click', () => slide(-1));
    let touchStartX = 0;
    let touchMoveX = 0;
    let isDragging = false;
    let dragThreshold = 10;
    carousel.addEventListener('click', (e) => {
        if (isDragging) e.preventDefault();
    }, true);
 
    // Touch handlers for mobile swipe.
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true;
        carousel.style.transition = 'none';
    };
 
    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        if (Math.abs(currentX - touchStartX) > 5) {
            e.preventDefault();
        }
 
        touchMoveX = e.touches[0].clientX;
        const deltaX = touchMoveX - touchStartX;
        const initialOffset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${initialOffset + deltaX}px)`;
    };
 
    const handleTouchEnd = () => {
        if (!isDragging) return;
        carousel.style.transition = 'transform 0.5s ease-in-out';

        const deltaX = touchMoveX - touchStartX;
        const swipeThreshold = 50;

        if (deltaX < -swipeThreshold && deltaX !== 0) {
            slide(1);
        } else if (deltaX > swipeThreshold) {
            slide(-1);
        } else {
            slide(0);
        }
        isDragging = false;
    };
 
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);
    // Snap back from clones to original cards after each loop jump.
    carousel.addEventListener('transitionend', () => {
        const cardsToScroll = getCardsToScroll();
        if (currentIndex >= originalCards.length + cardsToScroll) {
            carousel.style.transition = 'none';
            currentIndex = cardsToScroll;
            const offset = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${offset}px)`;
        }
        if (currentIndex < cardsToScroll) {
            carousel.style.transition = 'none';
            currentIndex = originalCards.length;
            const offset = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${offset}px)`;
        }
 
        isTransitioning = false;
        updateDots();
    });
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            createDots();
            cloneCards();
            allCards = Array.from(carousel.children);
            cardWidth = allCards[0].offsetWidth + parseFloat(getComputedStyle(carousel).gap);
            currentIndex = getCardsToScroll();
            updateInitialPosition();
            updateDots();
        }, 120);
    });
    setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
    updateDots();
}
// Custom dropdown behavior for subject selection.
function setupCustomSelect() {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    if (!selectWrapper) return;
 
    const trigger = document.getElementById('custom-select-trigger');
    const optionsContainer = document.getElementById('custom-select-options');
    const options = optionsContainer.querySelectorAll('.custom-option');
    const label = document.getElementById('custom-select-label');
 
    trigger.addEventListener('click', () => {
        optionsContainer.classList.toggle('hidden');
        trigger.classList.toggle('open');
    });
 
    options.forEach(option => {
        option.addEventListener('click', () => {
            label.textContent = option.textContent;
            label.classList.remove('text-gray-400');
            label.classList.add('text-white');
            optionsContainer.classList.add('hidden');
            trigger.classList.remove('open');
        });
    });
    window.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            optionsContainer.classList.add('hidden');
            trigger.classList.remove('open');
        }
    });
}
// Contact form validation and EmailJS submission.
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
 
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectTrigger = document.getElementById('custom-select-trigger');
    const subjectLabel = document.getElementById('custom-select-label');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');
 
    const initialSubjectText = 'Select the reason for contact';
 
    const showError = (input, message) => {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.innerText = message;
            errorElement.classList.remove('hidden');
        }
        const field = input.id === 'custom-select-trigger' ? input : formControl.querySelector('input, textarea');
        if(field) {
            field.classList.add('input-error');
        } else {
            subjectTrigger.classList.add('input-error');
        }
    };
 
    const hideErrors = () => {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));
 
        const formControls = contactForm.querySelectorAll('input, textarea, #custom-select-trigger');
        formControls.forEach(control => control.classList.remove('input-error'));
    };
 
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
 
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hideErrors();
        let isValid = true;
 
        if (nameInput.value.trim() === '') {
            showError(nameInput.parentElement, 'Please enter your name.');
            isValid = false;
        }

        if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
            showError(emailInput.parentElement, 'Please enter a valid email.');
            isValid = false;
        }
 
        if (subjectLabel.textContent === initialSubjectText) {
            showError(subjectTrigger, 'Please select a subject.');
            isValid = false;
        }
 
        if (messageInput.value.trim() === '') {
            showError(messageInput.parentElement, 'Please write your message.');
            isValid = false;
        }
 
        if (isValid) {
            if (!window.emailjs || typeof emailjs.send !== 'function') {
                alert('Email service is unavailable right now. Please try again later.');
                return;
            }

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectLabel.textContent;
            const message = messageInput.value.trim();

            // Template variables must match EmailJS template field names.
            const templateParams = {
                from_name: name,
                from_email: email,
                subject,
                message
            };

            emailjs
                .send('service_vql9kv9', 'template_4ugj04b', templateParams)
                .then(() => {
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                    subjectLabel.textContent = initialSubjectText;
                    subjectLabel.classList.add('text-gray-400');
                    subjectLabel.classList.remove('text-white');
                })
                .catch((error) => {
                    console.error('EmailJS send failed:', error);
                    alert('Failed to send message. Please try again.');
                });
        }
    });
}
 

// Initialize all interactive modules after DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
    if (window.emailjs) {
        emailjs.init({ publicKey: '--P_Ll_JY6WnYW61j' });
    } else {
        console.warn('EmailJS SDK not loaded. Contact form email sending is disabled.');
    }
    setupMobileMenu();
    setupNavObserver();
    setupFadeInAnimations();
    setupSkillsAnimation();
    setupParallaxEffect();
    setupNavbarScrollEffect();
    setupShootingStars();
    setupProjectsCarousel();
    setupCustomSelect();
    setupFormValidation();
});
