// ===== CUSTOM CURSOR =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
const isMobile = window.innerWidth < 768;

if (!isMobile) {
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
  document.querySelectorAll('a, button, .pillar-card, .rpg-node, .faq-question, .comp-card, .feature-card, .assess-card, .delivery-mode, .social-icon, .bento-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => { hamburger.classList.remove('open'); navLinks.classList.remove('open'); });
});

// ===== PARTICLE NETWORK (HERO CANVAS) =====
const canvas = document.getElementById('particleCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = isMobile ? 40 : 80;
  for (let i = 0; i < particleCount; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.08 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    // Mouse attraction
    if (!isMobile) {
      particles.forEach(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 200)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ===== 3D FLOATING SHAPE =====
const hero3d = document.getElementById('hero3dCanvas');
if (hero3d && !isMobile) {
  const c3 = hero3d.getContext('2d');
  hero3d.width = 500; hero3d.height = 500;
  let angle = 0;
  function draw3D() {
    c3.clearRect(0, 0, 500, 500);
    angle += 0.008;
    const cx = 250, cy = 250;
    // Draw rotating wireframe icosahedron approximation
    const verts = [];
    const size = 80 + Math.sin(angle * 2) * 10;
    for (let i = 0; i < 12; i++) {
      const lat = Math.acos(-1 + (2 * i) / 11);
      const lon = Math.sqrt(12 * Math.PI) * lat + angle;
      verts.push({
        x: cx + size * Math.cos(lon) * Math.sin(lat) + Math.sin(angle + i) * 30,
        y: cy + size * Math.sin(lon) * Math.sin(lat) + Math.cos(angle + i) * 20,
        z: size * Math.cos(lat)
      });
    }
    // Mouse influence
    const mx = (mouseX - window.innerWidth + 500) / 500;
    const my = (mouseY - window.innerHeight / 2 + 250) / 500;
    verts.forEach(v => { v.x += mx * 20; v.y += my * 20; });
    // Draw edges
    for (let i = 0; i < verts.length; i++) {
      for (let j = i + 1; j < verts.length; j++) {
        const dx = verts[i].x - verts[j].x;
        const dy = verts[i].y - verts[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < size * 1.8) {
          const depth = (verts[i].z + verts[j].z) / (size * 2);
          c3.beginPath();
          c3.moveTo(verts[i].x, verts[i].y);
          c3.lineTo(verts[j].x, verts[j].y);
          c3.strokeStyle = `rgba(0, 240, 255, ${0.15 + depth * 0.15})`;
          c3.lineWidth = 0.8;
          c3.stroke();
        }
      }
    }
    // Draw vertices
    verts.forEach(v => {
      const depth = (v.z + size) / (size * 2);
      c3.beginPath();
      c3.arc(v.x, v.y, 2 + depth * 2, 0, Math.PI * 2);
      c3.fillStyle = `rgba(0, 240, 255, ${0.3 + depth * 0.4})`;
      c3.fill();
    });
    requestAnimationFrame(draw3D);
  }
  draw3D();
}

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
  // Ripple effect
  btn.addEventListener('click', e => {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = btn.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
const statNumbers = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const num = entry.target;
      if (num.dataset.counted) return;
      num.dataset.counted = 'true';
      const target = parseInt(num.dataset.target);
      const suffix = num.dataset.suffix || '';
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(timer); }
        num.textContent = Math.floor(current) + suffix;
      }, 16);
    }
  });
}, { threshold: 0.3 });
statNumbers.forEach(el => counterObserver.observe(el));

// ===== PILLAR MODALS =====
const pillarData = {
  math: { icon: '🧮', title: 'Foundational Mathematics', desc: 'Develop logical reasoning, number sense, and problem-solving skills through a structured, progressive curriculum.', topics: ['Number Sense & Operations', 'Geometry & Spatial Reasoning', 'Data Handling & Statistics', 'Algebra & Pre-Algebra', 'Word Problems & Logic', 'HOTS Math Challenges', 'Mental Math Techniques', 'Competition Problem Sets'] },
  science: { icon: '🔬', title: 'Science', desc: 'Build scientific temper through observation, experimentation, and deep conceptual understanding across all branches.', topics: ['Life Sciences & Biology', 'Physical Sciences & Physics', 'Chemistry Fundamentals', 'Earth & Space Science', 'Environmental Science', 'Experimental Design', 'Science Olympiad Prep', 'Real-world Applications'] },
  english: { icon: '📖', title: 'Communicative English', desc: 'Master fluency, comprehension, and expressive ability through reading, writing, speaking, and listening.', topics: ['Grammar & Sentence Structure', 'Creative Writing', 'Reading Comprehension', 'Public Speaking & Debate', 'Vocabulary Building', 'Spelling Bee Prep', 'Essay Composition', 'Literary Analysis'] },
  cyber: { icon: '💻', title: 'Cyber Knowledge', desc: 'Develop digital literacy and responsible technology use from coding basics to AI understanding.', topics: ['Block Coding & Programming', 'AI & Machine Learning Basics', 'Cyber Safety & Ethics', 'Digital Tools & Productivity', 'Web Development Basics', 'Computational Thinking', 'Hackathon Preparation', 'NCO Competition Prep'] },
  gk: { icon: '🌍', title: 'General Knowledge', desc: 'Build awareness of the world through current affairs, history, geography, and cultural understanding.', topics: ['India: History & Geography', 'World Affairs & Culture', 'Science & Technology GK', 'Current Events', 'Sports & Entertainment', 'Famous Personalities', 'Quiz Competition Prep', 'Environmental Awareness'] },
  art: { icon: '🎨', title: 'Art, Craft & Personality', desc: 'Nurture creativity, fine motor skills, emotional intelligence, and essential life skills.', topics: ['Drawing & Painting', 'Craft & Design', 'Leadership Skills', 'Emotional Intelligence', 'Team Collaboration', 'Public Presentation', 'Creative Problem Solving', 'Personality Development'] }
};

const modal = document.getElementById('pillarModal');
const modalClose = document.getElementById('pillarModalClose');
document.querySelectorAll('.pillar-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.pillar;
    const data = pillarData[key];
    if (!data) return;
    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalTopics').innerHTML = data.topics.map(t => `<div class="modal-topic">${t}</div>`).join('');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});
modalClose.addEventListener('click', () => { modal.classList.remove('active'); document.body.style.overflow = ''; });
modal.addEventListener('click', e => { if (e.target === modal) { modal.classList.remove('active'); document.body.style.overflow = ''; } });

// ===== RPG PATHWAY - UNLOCK ON SCROLL =====
const rpgNodes = document.querySelectorAll('.rpg-node');
const rpgProgressBar = document.getElementById('rpgProgress');
const rpgPercentEl = document.getElementById('rpgPercent');
const rpgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('unlocked');
  });
  // Update progress
  const unlocked = document.querySelectorAll('.rpg-node.unlocked').length;
  const total = rpgNodes.length;
  const pct = Math.round((unlocked / total) * 100);
  if (rpgProgressBar) rpgProgressBar.style.width = pct + '%';
  if (rpgPercentEl) rpgPercentEl.textContent = pct;
}, { threshold: 0.3 });
rpgNodes.forEach(n => rpgObserver.observe(n));

// RPG node click to expand
rpgNodes.forEach(node => {
  node.addEventListener('click', () => {
    const wasExpanded = node.classList.contains('expanded');
    rpgNodes.forEach(n => n.classList.remove('expanded'));
    if (!wasExpanded) node.classList.add('expanded');
  });
});

// ===== COMPARISON SLIDER =====
const slider = document.getElementById('comparisonSlider');
const handle = document.getElementById('sliderHandle');
const compBefore = document.getElementById('compBefore');
if (slider && handle && compBefore) {
  let isDragging = false;
  function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let pos = Math.max(0, Math.min(x - rect.left, rect.width));
    const pct = (pos / rect.width) * 100;
    compBefore.style.width = pct + '%';
    handle.style.left = pct + '%';
  }
  handle.addEventListener('mousedown', () => isDragging = true);
  handle.addEventListener('touchstart', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('mousemove', e => { if (isDragging) updateSlider(e.clientX); });
  window.addEventListener('touchmove', e => { if (isDragging) updateSlider(e.touches[0].clientX); });
}

// ===== VS CODE TABS =====
document.querySelectorAll('.vscode-tab, .vscode-tree-item').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.vsTab;
    document.querySelectorAll('.vscode-tab, .vscode-tree-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll(`[data-vs-tab="${target}"]`).forEach(t => t.classList.add('active'));
    document.getElementById(target).classList.add('active');
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if (!isActive) item.classList.add('active');
  });
});

// ===== FLOATING LABELS =====
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
  input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
  input.addEventListener('blur', () => {
    input.parentElement.classList.remove('focused');
    if (input.value) input.parentElement.classList.add('filled');
    else input.parentElement.classList.remove('filled');
  });
  // Real-time validation
  input.addEventListener('input', () => {
    const parent = input.parentElement;
    if (input.value && input.checkValidity()) {
      parent.classList.add('valid');
      parent.classList.remove('invalid');
    } else if (input.value) {
      parent.classList.remove('valid');
      parent.classList.add('invalid');
    } else {
      parent.classList.remove('valid', 'invalid');
    }
  });
  // Check initial state
  if (input.value) input.parentElement.classList.add('filled');
});

// ===== FORM SUBMIT WITH CONFETTI =====
const enrollForm = document.getElementById('enrollForm');
enrollForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = enrollForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ Submitted Successfully!';
  btn.style.background = 'linear-gradient(135deg, #00FF88, #00cc6a)';
  // Confetti
  const container = document.getElementById('confettiContainer');
  const colors = ['#00F0FF', '#A855F7', '#00FF88', '#FFD700', '#FF6B9D'];
  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `position:absolute;width:${Math.random() * 8 + 4}px;height:${Math.random() * 8 + 4}px;background:${colors[Math.floor(Math.random() * colors.length)]};left:${Math.random() * 100}%;top:-10px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};animation:confetti-fall ${Math.random() * 2 + 1.5}s ease-out forwards;animation-delay:${Math.random() * 0.5}s`;
    container.appendChild(confetti);
  }
  // Play sound if enabled
  if (soundEnabled) playTone(800, 0.15, 0.1);
  setTimeout(() => {
    btn.textContent = 'Book Free Assessment →';
    btn.style.background = '';
    enrollForm.reset();
    document.querySelectorAll('.form-group').forEach(g => g.classList.remove('focused', 'filled', 'valid', 'invalid'));
    container.innerHTML = '';
  }, 4000);
});

// ===== FLOATING CTA =====
const floatingCta = document.getElementById('floatingCta');
const closeFloat = document.getElementById('closeFloat');
let floatDismissed = false;
window.addEventListener('scroll', () => {
  if (floatDismissed) return;
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  floatingCta.classList.toggle('visible', scrollPercent > 30 && scrollPercent < 90);
});
closeFloat.addEventListener('click', () => { floatDismissed = true; floatingCta.classList.remove('visible'); });

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ===== PARALLAX =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    document.querySelectorAll('.hero-gradient').forEach((g, i) => {
      g.style.transform = `translateY(${scrolled * 0.3 * (i + 1) * 0.2}px)`;
    });
  }
});

// ===== SOUND SYSTEM =====
let soundEnabled = false;
const audioCtx = typeof AudioContext !== 'undefined' ? new AudioContext() : null;
const soundToggle = document.getElementById('soundToggle');
soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? '🔊' : '🔇';
  if (soundEnabled && audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
});

function playTone(freq, dur, vol) {
  if (!soundEnabled || !audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.value = vol || 0.05;
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + dur);
}

// Click sounds on buttons
document.querySelectorAll('.btn, .faq-question, .vscode-tab, .vscode-tree-item').forEach(el => {
  el.addEventListener('click', () => playTone(600, 0.08, 0.03));
});

// ===== CURSOR TRAIL =====
if (!isMobile) {
  const trailParticles = [];
  const maxTrail = 8;
  setInterval(() => {
    if (trailParticles.length >= maxTrail) {
      const old = trailParticles.shift();
      if (old.parentNode) old.parentNode.removeChild(old);
    }
    const p = document.createElement('div');
    p.className = 'cursor-particle';
    p.style.cssText = `left:${mouseX}px;top:${mouseY}px;width:4px;height:4px;background:rgba(0,240,255,0.3);opacity:0.4;transition:opacity 0.5s ease, transform 0.5s ease;`;
    document.body.appendChild(p);
    trailParticles.push(p);
    requestAnimationFrame(() => { p.style.opacity = '0'; p.style.transform = 'scale(0)'; });
    setTimeout(() => { if (p.parentNode) p.parentNode.removeChild(p); trailParticles.splice(trailParticles.indexOf(p), 1); }, 500);
  }, 60);
}
