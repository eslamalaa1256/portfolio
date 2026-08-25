// ============================================================
// Contact config — the ONE place to update contact details
// ============================================================
// Replace with your real number: digits only, country code first,
// no spaces / plus signs / dashes. Example: '201234567890'
const WHATSAPP_NUMBER = '201019073627';

// Replace with your real email address
const EMAIL_ADDRESS = 'eslamalaa112006@gmail.com';

document.querySelectorAll('[data-contact="whatsapp"]').forEach(el => {
  el.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});
document.querySelectorAll('[data-contact="email"]').forEach(el => {
  el.href = `mailto:${EMAIL_ADDRESS}`;
});

// ============================================================
// Mobile menu toggle
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// ============================================================
// Hero typing animation (address bar)
// ============================================================
const typedEl = document.getElementById('typed-url');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (typedEl) {
  const phrases = ['your-business.com', 'yourbrand.com/landing'];
  if (prefersReducedMotion) {
    typedEl.textContent = phrases[0];
  } else {
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function tick() {
      const current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    }
    tick();
  }
}

// ============================================================
// Scroll reveal
// ============================================================
const revealTargets = document.querySelectorAll(
  '.project, .service, .process__step, .about__text, .section-head'
);
revealTargets.forEach(el => el.classList.add('reveal'));

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}