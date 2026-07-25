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
  const showcaseDots   = document.querySelectorAll('.showcase-dot');
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

        // Shortest signed circular distance on 3D turntable
        let diff = i - activeIndex;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;

        if (diff === 0) {
          slide.classList.add('active');
        } else if (diff === 1) {
          slide.classList.add('next');
        } else if (diff === 2) {
          slide.classList.add('far-next');
        } else if (diff === -1) {
          slide.classList.add('prev');
        } else if (diff === -2) {
          slide.classList.add('far-prev');
        } else {
          slide.classList.add('hidden');
        }
      });

      // Update active pagination dot
      showcaseDots.forEach((dot, i) => {
        const isSel = i === activeIndex;
        dot.classList.toggle('active', isSel);
        dot.setAttribute('aria-selected', isSel ? 'true' : 'false');
      });

      // Update caption
      const activeSlide = slides[activeIndex];
      if (activeSlide && captionText) {
        captionText.textContent = activeSlide.getAttribute('data-caption') || '';
      }
    }

    // Dot Clicks
    showcaseDots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        updateShowcase(i);
        restartTimer();
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

    // Real-Time Live Drag & Touch Physics Engine
    let startX = 0;
    let dragOffset = 0;
    let isDragging = false;
    let isDragThreshold = false;

    function setTrackDragTransform(offsetPx) {
      const rotateDeg = offsetPx * 0.08;
      const translatePx = offsetPx * 0.55;
      showcaseTrack.style.transition = 'none';
      showcaseTrack.style.transform = `rotateY(${rotateDeg}deg) translateX(${translatePx}px)`;
    }

    function resetTrackTransform() {
      showcaseTrack.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      showcaseTrack.style.transform = 'rotateY(0deg) translateX(0px)';
    }

    // Slide Clicks
    slides.forEach((slide, i) => {
      slide.addEventListener('click', (e) => {
        if (isDragThreshold) return;
        if (i !== activeIndex) {
          updateShowcase(i);
          restartTimer();
        }
      });
    });

    // Mouse Drag Events (Desktop)
    showcaseTrack.addEventListener('mousedown', (e) => {
      isDragging = true;
      isDragThreshold = false;
      startX = e.clientX;
      dragOffset = 0;
      showcaseTrack.style.cursor = 'grabbing';
      stopTimer();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      dragOffset = e.clientX - startX;
      if (Math.abs(dragOffset) > 6) {
        isDragThreshold = true;
      }
      setTrackDragTransform(dragOffset);
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      showcaseTrack.style.cursor = 'grab';

      resetTrackTransform();

      if (Math.abs(dragOffset) > 40) {
        if (dragOffset > 0) updateShowcase(activeIndex - 1);
        else updateShowcase(activeIndex + 1);
      }
      restartTimer();
    });

    // Touch Swipe Events (Mobile Live Drag)
    showcaseTrack.addEventListener('touchstart', (e) => {
      isDragging = true;
      isDragThreshold = false;
      startX = e.touches[0].clientX;
      dragOffset = 0;
      stopTimer();
    }, { passive: true });

    showcaseTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      dragOffset = e.touches[0].clientX - startX;
      if (Math.abs(dragOffset) > 6) {
        isDragThreshold = true;
      }
      setTrackDragTransform(dragOffset);
    }, { passive: true });

    showcaseTrack.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      resetTrackTransform();

      if (Math.abs(dragOffset) > 40) {
        if (dragOffset > 0) updateShowcase(activeIndex - 1);
        else updateShowcase(activeIndex + 1);
      }
      restartTimer();
    });

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

  /* ────────────────────────────────────────────
     8. BACK TO TOP BUTTON
  ──────────────────────────────────────────── */
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

