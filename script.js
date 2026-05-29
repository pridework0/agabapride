const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

window.addEventListener('load', () => {
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 550);
  }
});

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  if (offset > 30) {
    navbar.style.background = 'rgba(7, 11, 20, 0.92)';
    navbar.style.backdropFilter = 'blur(20px)';
  } else {
    navbar.style.background = 'rgba(7, 11, 20, 0.72)';
    navbar.style.backdropFilter = 'blur(14px)';
  }
  setActiveLink();
});

function setActiveLink() {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);

    if (!link) return;

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((nav) => nav.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
    }
  });
});

function copyToClipboard(value, button, button) {
  navigator.clipboard.writeText(value).then(() => {
    if (button && button.tagName === 'BUTTON') {
      button.textContent = 'Copied!';
      setTimeout(() => {
        const label = button.closest('.donation-card').querySelector('h3').textContent === 'PayPal' ? 'Email' : 'Number';
        button.innerHTML = `<i class="fas fa-copy"></i> Copy ${label}`;
      }, 1600);
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Message Sent';
      contactForm.reset();
      setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      }, 2200);
    }, 1200);
  });
}

const reveals = document.querySelectorAll('.stat-card, .project-card, .skill-category, .donation-card, .contact-card, .contact-form, .hero-image');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((reveal) => revealObserver.observe(reveal));
