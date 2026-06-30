document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Sticky nav background on scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-lead, .about-pillars .pillar, .timeline-item, .case, .logo-card, .contact-text, .contact-form, .quote-inner'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ---------- Animated stat counters ---------- */
  const statNums = document.querySelectorAll('.stat-num');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (reduceMotion) {
    statNums.forEach(el => { el.textContent = el.dataset.count; });
  } else {
    const statIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    statNums.forEach(el => statIo.observe(el));
  }

  /* ---------- Contact form (demo submission, no backend) ---------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = 'Envoi en cours…';
    setTimeout(() => {
      status.textContent = 'Demande envoyée. Nous revenons vers vous sous 48h.';
      form.reset();
    }, 700);
  });

});
