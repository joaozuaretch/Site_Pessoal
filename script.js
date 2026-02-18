// ============================================
// Floating Math Symbols — Canvas Animation
// ============================================
const canvas = document.getElementById('mathCanvas');

if (canvas) {
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
}

// ============================================
// Navbar — Scroll & Mobile Toggle
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const allNavLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

allNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navToggle) navToggle.classList.remove('open');
    if (navLinks) navLinks.classList.remove('open');
  });
});

// ============================================
// Active Nav Link — Highlight current page
// ============================================
(function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  allNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// ============================================
// Scroll Reveal Animation
// ============================================
function setupReveal() {
  const revealElements = document.querySelectorAll(
    '.sobre-grid, .timeline-item, .project-card, .skill-category, .contato-wrapper, .detail-card, .project-detail-card, .skill-detail-category, .contact-info-card, .stat-card, .bio-text'
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
// Skill Bar Animation (Habilidades page)
// ============================================
(function setupSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (skillBars.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        fill.style.width = width;
        fill.classList.add('animated');
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => observer.observe(bar));
})();

// ============================================
// Contact Form — EmailJS Integration
// ============================================
const form = document.getElementById('contactForm');

if (form) {
  // ⚠️ Substitua pelas suas credenciais do EmailJS (https://www.emailjs.com/)
  const EMAILJS_PUBLIC_KEY = 'Fk-GbDCLM0XWboc95';
  const EMAILJS_SERVICE_ID = 'service_b08dczp';
  const EMAILJS_TEMPLATE_ID = 'template_ge0ehil';

  // Inicializa o EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const statusDiv = document.getElementById('formStatus');

    // Estado de loading
    btn.disabled = true;
    btn.classList.add('loading');
    btnText.textContent = 'Enviando...';
    btnLoader.hidden = false;
    statusDiv.hidden = true;
    statusDiv.className = 'form-status';

    // Dados do formulário
    const templateParams = {
      from_name: form.querySelector('#name').value,
      from_email: form.querySelector('#email').value,
      subject: form.querySelector('#subject').value,
      message: form.querySelector('#message').value,
    };

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS não carregado');
      }

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

      // Sucesso
      btnText.textContent = '✓ Enviado!';
      btnLoader.hidden = true;
      btn.classList.remove('loading');
      btn.classList.add('success');
      statusDiv.textContent = '✉️ Mensagem enviada com sucesso! Responderei em breve.';
      statusDiv.classList.add('success');
      statusDiv.hidden = false;

      setTimeout(() => {
        btnText.textContent = 'Enviar Mensagem';
        btn.classList.remove('success');
        btn.disabled = false;
        statusDiv.hidden = true;
        form.reset();
      }, 4000);

    } catch (error) {
      // Erro
      console.error('Erro ao enviar email:', error);
      btnText.textContent = 'Enviar Mensagem';
      btnLoader.hidden = true;
      btn.classList.remove('loading');
      btn.disabled = false;
      statusDiv.textContent = '⚠️ Erro ao enviar. Tente novamente ou envie direto para joao.zuaretch@gmail.com';
      statusDiv.classList.add('error');
      statusDiv.hidden = false;

      setTimeout(() => {
        statusDiv.hidden = true;
      }, 6000);
    }
  });
}
