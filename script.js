// ============================================
// Floating Math Symbols — Canvas Animation
// ============================================
const canvas = document.getElementById('mathCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const symbols = ['∫', 'Σ', 'π', '∞', 'Δ', '∇', 'λ', 'θ', 'φ', 'ε', '∂', '√', 'ℝ', 'ℂ', '∈', '⊂', '∀', '∃', '≡', '±'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 35);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 18 + 12,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.25 + 0.05,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.font = `${p.size}px 'Inter', sans-serif`;
    ctx.fillStyle = `rgba(124, 106, 239, ${p.opacity})`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.symbol, 0, 0);
    ctx.restore();

    p.y -= p.speedY;
    p.x += p.speedX;
    p.rotation += p.rotationSpeed;

    if (p.y < -30) {
      p.y = canvas.height + 30;
      p.x = Math.random() * canvas.width;
    }
    if (p.x < -30) p.x = canvas.width + 30;
    if (p.x > canvas.width + 30) p.x = -30;
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();
window.addEventListener('resize', () => {
  resizeCanvas();
  createParticles();
});

// ============================================
// Navbar — Scroll & Mobile Toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============================================
// Active Nav Link on Scroll
// ============================================
const sections = document.querySelectorAll('.section');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ============================================
// Scroll Reveal Animation
// ============================================
function setupReveal() {
  const revealElements = document.querySelectorAll(
    '.sobre-grid, .timeline-item, .project-card, .skill-category, .contato-wrapper'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

setupReveal();

// ============================================
// Contact Form — Simple handler
// ============================================
const form = document.getElementById('contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;
  btn.textContent = '✓ Mensagem enviada!';
  btn.style.background = '#22c55e';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
});
