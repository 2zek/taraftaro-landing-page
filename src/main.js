import './style.css'
import i18n from './i18n.js';

import socialLinks from './data/social.json';
import stats from './data/stats.json';

// Translation helper
const t = (key) => i18n.t(key);

// Update all translations on page
function updateTranslations() {
    document.documentElement.lang = i18n.language;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });

    // Update Page Title
    document.title = t('metaTitle');
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

// Render dynamic elements (Year, Social Links, Stats)
function renderDynamicElements() {
    // 1. Dynamic Year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Social Links from JSON
    const socialContainer = document.getElementById('social-links');
    if (socialContainer) {
        socialContainer.innerHTML = socialLinks.map(link => `
            <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
               class="w-12 h-12 rounded-2xl glass flex items-center justify-center text-mode-secondary hover:text-primary hover:scale-110 transition-all border border-primary/5 hover:border-primary/20"
               aria-label="${link.label}">
                <i class="${link.icon} text-xl"></i>
            </a>
        `).join('');
    }

    // 3. Stats from JSON
    const statsContainer = document.getElementById('hero-stats');
    if (statsContainer) {
        statsContainer.innerHTML = stats.map(stat => `
            <div class="text-center lg:text-left">
                <div class="text-4xl font-black text-mode mb-1">${stat.value}</div>
                <div class="text-sm font-bold text-mode-muted" data-i18n="${stat.labelKey}">${t(stat.labelKey)}</div>
            </div>
        `).join('');
    }
}

// Update language button text
function updateLangButton() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = i18n.language === 'tr' ? 'EN' : 'TR';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial renders
    updateTranslations();
    updateLangButton();
    renderDynamicElements();

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-sun');
    const moonIcon = document.getElementById('theme-moon');
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
            if (moonIcon) moonIcon.classList.toggle('hidden', isDark);
        });
    }

    // Language Toggle Logic
    const langToggleBtn = document.getElementById('lang-toggle');
    
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const newLang = i18n.language === 'tr' ? 'en' : 'tr';
            i18n.changeLanguage(newLang);
            localStorage.setItem('language', newLang);
            updateTranslations();
            updateLangButton();
        });
    }

    // Mobile Menu Logic
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    // Scroll Reveal Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Trigger reveal for elements already in view
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    const handleScroll = () => {
        // Root navbar stays transparent as requested
        // Only internal elements like .glass-dark handle their own background
        
        // Active Link Tracking
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('nav-active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Showcase Slider Logic
    const slider = document.getElementById('showcase-slider');
    const dotsContainer = document.getElementById('slider-dots');
    
    if (slider && dotsContainer) {
        let currentSlide = 0;
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        let sliderInterval;

        // Create Dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        function resetInterval() {
            clearInterval(sliderInterval);
            sliderInterval = setInterval(nextSlide, 4000);
        }

        sliderInterval = setInterval(nextSlide, 4000);
    }
});
