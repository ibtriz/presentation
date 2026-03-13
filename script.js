/* === Footer year === */
document.getElementById('year').textContent = new Date().getFullYear();

/* === Navbar scroll effect === */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* === Mobile nav toggle === */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

/* Close mobile menu when a link is clicked */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* === Active nav link on scroll === */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id     = section.getAttribute('id');
    const anchor = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (anchor) {
      anchor.classList.toggle('active', scrollY >= top && scrollY < bottom);
    }
  });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

/* === Contact form (demo handler) === */
const form       = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields.';
    formStatus.className   = 'form-status error';
    return;
  }

  /* Simulate async send */
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled   = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(() => {
    formStatus.textContent = '✅ Message sent! I\'ll be in touch soon.';
    formStatus.className   = 'form-status success';
    form.reset();
    submitBtn.disabled   = false;
    submitBtn.textContent = 'Send Message';
  }, 1200);
});
