import './style.css'
import i18n from './i18n.js';

// Translation helper
const t = (key) => i18n.t(key);

// Update all translations on page
function updateTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
    
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = t(key);
    });
}

// Update language button text
function updateLangButton() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.textContent = i18n.language === 'tr' ? 'EN' : 'TR';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial translations
    updateTranslations();
    updateLangButton();

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
});
