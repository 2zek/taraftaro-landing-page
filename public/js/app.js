/* =============================================
   TARAFTARO — MAIN JAVASCRIPT
   Scroll reveal, navbar, slider, FAQ accordion,
   mobile menu — zero dependencies
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────
     1. NAVBAR — scroll + active link
  ──────────────────────────────────────────── */
  const navbar     = document.getElementById('navbar');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks   = document.querySelectorAll('.navbar-links a[href^="#"]');
  const sections   = document.querySelectorAll('section[id]');

  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    navbar.classList.toggle('scrolled', scrolled);

    // Mobile menu top senkronizasyonu
    if (mobileMenu) {
      mobileMenu.style.top = scrolled ? '4.5rem' : '7.875rem';
    }

    // Active section highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY + 120 >= sec.offsetTop) current = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ────────────────────────────────────────────
     2. MOBILE MENU
  ──────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ────────────────────────────────────────────
     3. SCROLL REVEAL
  ──────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ────────────────────────────────────────────
     4. SINGLE PHONE SLIDING SCREENSHOTS SHOWCASE
  ──────────────────────────────────────────── */
  const showcaseTrack  = document.getElementById('showcase-track');
  const coverflowTabs  = document.querySelectorAll('.coverflow-tab');
  const btnPrev        = document.getElementById('showcase-prev');
  const btnNext        = document.getElementById('showcase-next');
  const captionText    = document.getElementById('caption-text');

  if (showcaseTrack) {
    const slides = Array.from(showcaseTrack.querySelectorAll('.showcase-slide'));
    const total  = slides.length;
    let activeIndex = 0;
    let autoTimer = null;

    function updateShowcase(index) {
      activeIndex = (index + total) % total;

      slides.forEach((slide, i) => {
        slide.className = 'showcase-slide'; // Reset all classes

        const diff = (i - activeIndex + total) % total;

        if (diff === 0) {
          slide.classList.add('active');
        } else if (diff === 1) {
          slide.classList.add('next');
        } else if (diff === 2) {
          slide.classList.add('far-next');
        } else if (diff === total - 1) {
          slide.classList.add('prev');
        } else if (diff === total - 2) {
          slide.classList.add('far-prev');
        } else {
          slide.classList.add('hidden');
        }
      });

      // Update active tab
      coverflowTabs.forEach((tab, i) => {
        const isSel = i === activeIndex;
        tab.classList.toggle('active', isSel);
        tab.setAttribute('aria-selected', isSel ? 'true' : 'false');
      });

      // Update caption
      const activeSlide = slides[activeIndex];
      if (activeSlide && captionText) {
        captionText.textContent = activeSlide.getAttribute('data-caption') || '';
      }
    }

    // Tab Clicks
    coverflowTabs.forEach((tab, i) => {
      tab.addEventListener('click', () => {
        updateShowcase(i);
        restartTimer();
      });
    });

    // Slide Clicks (Click side screenshot to slide into center phone)
    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (i !== activeIndex) {
          updateShowcase(i);
          restartTimer();
        }
      });
    });

    // Prev / Next buttons
    btnPrev?.addEventListener('click', () => {
      updateShowcase(activeIndex - 1);
      restartTimer();
    });

    btnNext?.addEventListener('click', () => {
      updateShowcase(activeIndex + 1);
      restartTimer();
    });

    // Prevent native browser image drag
    showcaseTrack.querySelectorAll('img').forEach(img => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Mouse Drag + Touch Swipe Support
    let startX = 0;
    let isDragging = false;

    // Mouse Drag Events (Desktop)
    showcaseTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      showcaseTrack.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      showcaseTrack.style.cursor = 'grab';
      const diffX = e.clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) updateShowcase(activeIndex - 1);
        else updateShowcase(activeIndex + 1);
        restartTimer();
      }
    });

    // Touch Swipe Events (Mobile)
    showcaseTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    showcaseTrack.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - startX;
      if (Math.abs(diffX) > 40) {
        if (diffX > 0) updateShowcase(activeIndex - 1);
        else updateShowcase(activeIndex + 1);
        restartTimer();
      }
    }, { passive: true });

    // Auto Play
    function startTimer() {
      stopTimer();
      autoTimer = setInterval(() => {
        updateShowcase(activeIndex + 1);
      }, 4500);
    }

    function stopTimer() {
      if (autoTimer) clearInterval(autoTimer);
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    showcaseTrack.addEventListener('mouseenter', stopTimer);
    showcaseTrack.addEventListener('mouseleave', startTimer);

    // Initial trigger
    updateShowcase(0);
    startTimer();
  }

  /* ────────────────────────────────────────────
     5. FAQ ACCORDION
  ──────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn    = item.querySelector('.faq-btn');
    const answer = item.querySelector('.faq-answer');

    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ────────────────────────────────────────────
     6. CONTACT FORM
  ──────────────────────────────────────────── */
  const contactForm    = document.getElementById('contact-form');
  const contactSuccess = document.getElementById('contact-success');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    // Buraya backend/API çağrısı eklenebilir
    contactSuccess.style.display = 'flex';
    contactForm.reset();
    setTimeout(() => { contactSuccess.style.display = 'none'; }, 5000);
  });

  /* ────────────────────────────────────────────
     7. COPYRIGHT YEAR
  ──────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
