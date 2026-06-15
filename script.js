// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.nav-links.mobile');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after clicking a link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Terminal typing effect
const typedEl = document.getElementById('typed-line');
const outputEl = document.getElementById('terminal-output');
const command = 'whoami --verbose';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  typedEl.textContent = command;
  outputEl.classList.add('visible');
} else {
  let i = 0;
  function typeChar() {
    if (i < command.length) {
      typedEl.textContent += command.charAt(i);
      i++;
      setTimeout(typeChar, 45);
    } else {
      setTimeout(() => outputEl.classList.add('visible'), 300);
    }
  }
  setTimeout(typeChar, 500);
}

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('.sidenav .nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => observer.observe(section));
