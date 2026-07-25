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
     4. SHOWCASE SLIDER
  ──────────────────────────────────────────── */
  const sliderTrack  = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');

  if (sliderTrack && dotsContainer) {
    const slides = sliderTrack.querySelectorAll('.slide');
    const total  = slides.length;
    let   current = 0;
    let   timer;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    function goTo(index) {
      current = index;
      sliderTrack.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo((current + 1) % total); }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(next, 4000);
    }

    dotsContainer.querySelectorAll('.dot').forEach(d => {
      d.addEventListener('click', () => { clearInterval(timer); startTimer(); });
    });

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
     6. COPYRIGHT YEAR
  ──────────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
