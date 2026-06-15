// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav.mobile');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Animated counters + metric bars (run once, on load)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCounter(el, target) {
  const isDecimal = target % 1 !== 0;
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.round(value);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function runMetrics() {
  document.querySelectorAll('.metric').forEach(metric => {
    const target = parseFloat(metric.dataset.target);
    const counterEl = metric.querySelector('.counter');
    const fillEl = metric.querySelector('.metric-fill');

    if (prefersReducedMotion) {
      counterEl.textContent = metric.dataset.target;
      fillEl.style.width = fillEl.dataset.fill + '%';
      return;
    }

    animateCounter(counterEl, target);
    requestAnimationFrame(() => {
      fillEl.style.width = fillEl.dataset.fill + '%';
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(runMetrics, 300);
});

// Scroll-reveal for sections
const revealTargets = document.querySelectorAll('.node-content, .skill-chip, .edu-card');

if (!prefersReducedMotion) {
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));
}
