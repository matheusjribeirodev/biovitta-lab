/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== CLOSE MENU ON OUTSIDE CLICK ====================*/
document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        // Check if click is outside the menu and toggle button
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show-menu');
        }
    }
});

/*==================== CLOSE MENU ON SCROLL ====================*/
window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

/*==================== ACCORDION SERVICES ====================*/
const servicesHeader = document.querySelectorAll('.services__header')

function toggleServices(){
    const itemClass = this.parentNode.className
    console.log(itemClass)

    for(i = 0; i < servicesHeader.length; i++){
        servicesHeader[i].parentNode.className = 'services__content services__close'
    }
    if(itemClass === 'services__content services__close'){
        this.parentNode.className = 'services__content services__open'
    }
}

servicesHeader.forEach((el) =>{
    el.addEventListener('click', toggleServices)
})

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    let activeSectionId = null;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id')

        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight){
            activeSectionId = sectionId;
        }
    })

    // Remove active class from all links first
    document.querySelectorAll('.nav__link').forEach(link => {
        link.classList.remove('active-link');
    });

    // Add active class to current section link
    if(activeSectionId) {
        const activeLink = document.querySelector(`.nav__link[href="#${activeSectionId}"]`);
        if(activeLink) {
            activeLink.classList.add('active-link');
        }
    }
}
window.addEventListener('scroll', scrollActive)

// Call scrollActive on page load
document.addEventListener('DOMContentLoaded', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
// Initialize ScrollReveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

// Animate elements
sr.reveal(`.home__data, .home__img,
           .about__data, .about__img,
           .services__content, .reviews__content, .units__content,
           .contact__content, .footer__content`, {
    interval: 200
});

/*==================== FORM VALIDATION ====================*/
// Form removed - no longer needed

/*==================== SMOOTH SCROLLING ====================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*==================== COUNTER ANIMATION ====================*/
function animateCounters() {
    const counters = document.querySelectorAll('.about__info-title');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                counter.textContent = counter.textContent.replace(/\d+/, target);
                clearInterval(timer);
            } else {
                const value = Math.floor(current);
                counter.textContent = counter.textContent.replace(/\d+/, value);
            }
        }, 30);
    });
}

// Trigger counter animation when about section is visible
const aboutSection = document.querySelector('#about');
if(aboutSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(aboutSection);
}

/*==================== LOAD MORE SERVICES ====================*/
const servicesContainer = document.querySelector('.services__container');
const loadMoreBtn = document.createElement('button');

// Additional services data
const additionalServices = [
    {
        icon: 'fas fa-baby',
        title: 'Pediatria',
        description: 'Exames especializados para acompanhamento da saúde infantil.'
    },
    {
        icon: 'fas fa-female',
        title: 'Ginecologia',
        description: 'Análises específicas para saúde da mulher.'
    },
    {
        icon: 'fas fa-procedures',
        title: 'Exames de Imagem',
        description: 'Ultrassonografia e outros exames de diagnóstico por imagem.'
    }
];

/*==================== WHATSAPP INTEGRATION ====================*/
function openWhatsApp(message = '') {
    const phone = '5535991521273';
    const defaultMessage = 'Olá! Gostaria de agendar um exame no Laboratório Biovitta.';
    const finalMessage = message || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank');
}

// Add WhatsApp functionality to buttons
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp buttons in units section
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const unitElement = this.closest('.units__content');
            if (unitElement) {
                const unitName = unitElement.querySelector('.units__title').textContent;
                openWhatsApp(`Olá! Gostaria de agendar um exame na ${unitName}.`);
            } else {
                openWhatsApp();
            }
        });
    });
    
    // WhatsApp floating button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            openWhatsApp();
        });
    }
    
    // Schedule exam buttons
    const scheduleButtons = document.querySelectorAll('a[href="#contact"]');
    scheduleButtons.forEach(button => {
        if(button.textContent.includes('Agendar')) {
            button.addEventListener('click', function(e) {
                // Don't prevent default, let it scroll to contact
                // But also provide WhatsApp option
                setTimeout(() => {
                    const whatsappOption = document.createElement('div');
                    whatsappOption.innerHTML = `
                        <div style="
                            position: fixed;
                            bottom: 120px;
                            right: 20px;
                            background: #25D366;
                            color: white;
                            padding: 1rem;
                            border-radius: 10px;
                            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                            z-index: 1000;
                            cursor: pointer;
                            font-family: var(--body-font);
                            max-width: 250px;
                            animation: bounce 2s infinite;
                        " onclick="openWhatsApp(); this.parentNode.remove();">
                            <i class="fab fa-whatsapp" style="margin-right: 0.5rem;"></i>
                            Ou agende pelo WhatsApp!
                        </div>
                    `;
                    document.body.appendChild(whatsappOption);
                    
                    // Remove after 5 seconds
                    setTimeout(() => {
                        if(whatsappOption.parentNode) {
                            whatsappOption.parentNode.removeChild(whatsappOption);
                        }
                    }, 5000);
                }, 2000);
            });
        }
    });
});

/*==================== LOADING ANIMATION ====================*/
window.addEventListener('load', () => {
    // Add loaded class to body for animations
    document.body.classList.add('loaded');
    
    // Initialize animations
    const homeElements = document.querySelectorAll('.home__circle, .molecule, .floating-element');
    homeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

/*==================== THEME TOGGLE (OPTIONAL) ====================*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton?.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

// We validate if the user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    if(themeButton) {
        themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
    }
}

// Activate / deactivate the theme manually with the button
if(themeButton) {
    themeButton.addEventListener('click', () => {
        // Add or remove the dark / icon theme
        document.body.classList.toggle(darkTheme);
        themeButton.classList.toggle(iconTheme);
        // We save the theme and the current icon that the user chose
        localStorage.setItem('selected-theme', getCurrentTheme());
        localStorage.setItem('selected-icon', getCurrentIcon());
    });
}

/*==================== PRELOAD CRITICAL RESOURCES ====================*/
document.addEventListener('DOMContentLoaded', function() {
    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add ScrollReveal library if not already included
if (typeof ScrollReveal === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js';
    script.onload = function() {
        // Re-initialize ScrollReveal animations
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2000,
            delay: 200,
            reset: true
        });

        sr.reveal('.home__data, .about__img, .services__content, .units__content', {});
        sr.reveal('.home__img', {delay: 400});
        sr.reveal('.home__social', {delay: 600});
        sr.reveal('.about__data, .contact__information', {origin: 'left'});
        sr.reveal('.about__img, .contact__form', {origin: 'right'});
        sr.reveal('.services__content', {interval: 100});
        sr.reveal('.units__content', {interval: 100});
    };
    document.head.appendChild(script);
}

/*=============== WHATSAPP FLOAT BUTTON ===============*/
const whatsappFloat = document.querySelector('.whatsapp-float');

// Show/hide button on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.visibility = 'visible';
    } else {
        whatsappFloat.style.opacity = '0';
        whatsappFloat.style.visibility = 'hidden';
    }
});

/*=============== THEME SYSTEM PREFERENCE ===============*/
// Check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(scrollHeader));
window.addEventListener('scroll', debounce(scrollActive));

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all service and unit cards
document.querySelectorAll('.services__content, .units__content').forEach(el => {
    observer.observe(el);
});

/*=============== FORM VALIDATION (if needed in future) ===============*/
// This can be used if contact forms are added later
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}