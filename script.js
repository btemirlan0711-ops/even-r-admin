
// ===== EVEN ROADS - Main JavaScript =====
// ===== Data Manager - loads content from localStorage =====
const DataManager = {
  defaults: {
    hero: {
      badge: 'Казахстан · Астана · с 2020 года',
      title: 'Строим <span class="highlight">дороги</span>,<br>которые соединяют будущее',
      description: 'ТОО «Even Roads» — надёжный партнёр в строительстве дорог и автомагистралей. Мы создаём инфраструктуру, которая объединяет города и регионы Казахстана.'
    },
    stats: [
      { target: 5, suffix: '+', label: 'Лет опыта' },
      { target: 150, suffix: '+', label: 'Км построенных дорог' },
      { target: 30, suffix: '+', label: 'Реализованных проектов' },
      { target: 100, suffix: '%', label: 'Сдача в срок' }
    ],
    about: {
      title: 'Надёжный партнёр в дорожном строительстве',
      text1: 'ТОО «Even Roads» (Эвен Роадс) — казахстанская строительная компания со штаб-квартирой в городе Астана. Мы специализируемся на строительстве дорог и автомагистралей (ОКЭД 42111), предлагая полный спектр услуг от проектирования до ввода объектов в эксплуатацию.',
      text2: 'Наша миссия — создавать современную дорожную инфраструктуру, соответствующую международным стандартам качества и безопасности, способствуя развитию транспортной связи Казахстана.',
      experienceNumber: '5+',
      experienceText: 'лет опыта'
    },
    services: [
      { icon: '🛣️', title: 'Строительство автомагистралей', description: 'Проектирование и строительство скоростных автомагистралей и трасс республиканского и областного значения с применением современных технологий.' },
      { icon: '🏙️', title: 'Городские дороги', description: 'Строительство и реконструкция городских дорог, проспектов, улиц и внутриквартальных проездов с обустройством тротуаров и освещения.' },
      { icon: '🌉', title: 'Мосты и путепроводы', description: 'Возведение мостовых сооружений, путепроводов и транспортных развязок различной сложности с учётом климатических и геологических условий.' },
      { icon: '⚙️', title: 'Земляные работы', description: 'Подготовка оснований, выемка и насыпь грунта, устройство дренажных систем и инженерная подготовка территории под строительство.' },
      { icon: '🔧', title: 'Ремонт и реконструкция', description: 'Капитальный и текущий ремонт дорожного покрытия, реконструкция существующих дорог с повышением их категории и пропускной способности.' },
      { icon: '📐', title: 'Проектирование', description: 'Разработка проектно-сметной документации, проведение инженерных изысканий и авторский надзор за строительством дорожных объектов.' }
    ],
    projects: [
      { image: 'assets/images/project-highway.png', category: 'Автомагистраль', title: 'Реконструкция трассы Астана — Караганда', meta: '2023 · 45 км · Акмолинская область' },
      { image: 'assets/images/project-construction.png', category: 'Городская дорога', title: 'Строительство дорог в районе Есиль', meta: '2024 · 12 км · г. Астана' },
      { image: 'assets/images/project-bridge.png', category: 'Мостовое сооружение', title: 'Мостовой переход через р. Есиль', meta: '2024 · 320 м · г. Астана' }
    ],
    advantages: [
      { title: 'Современное оборудование', description: 'Собственный парк современной дорожно-строительной техники ведущих мировых производителей обеспечивает высокую производительность и качество работ.' },
      { title: 'Квалифицированная команда', description: 'Штат опытных инженеров, проектировщиков и строителей с многолетним стажем в дорожном строительстве и реализации крупных инфраструктурных проектов.' },
      { title: 'Соблюдение стандартов', description: 'Все работы выполняются в строгом соответствии с ГОСТами, СНиПами и международными стандартами качества, что гарантирует долговечность объектов.' },
      { title: 'Сдача объектов в срок', description: 'Чёткое планирование, контроль сроков и эффективное управление ресурсами позволяют нам сдавать все объекты точно в установленные сроки.' }
    ],
    contact: {
      address: 'Казахстан, г. Астана',
      phone: '+7 (700) 123-45-67',
      email: 'info@evenroads.kz',
      workHours: 'Пн — Пт: 09:00 — 18:00'
    }
  },

  get(key) {
    try {
      const data = localStorage.getItem('er_' + key);
      return data ? JSON.parse(data) : this.defaults[key];
    } catch (e) {
      return this.defaults[key];
    }
  },

  set(key, value) {
    localStorage.setItem('er_' + key, JSON.stringify(value));
  },

  getSubmissions() {
    try {
      const data = localStorage.getItem('er_submissions');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  addSubmission(submission) {
    const subs = this.getSubmissions();
    subs.unshift(submission);
    localStorage.setItem('er_submissions', JSON.stringify(subs));
  }
};

// ===== Apply dynamic content from localStorage =====
function applyDynamicContent() {
  // Hero
  const hero = DataManager.get('hero');
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    heroBadge.innerHTML = '<span class="dot"></span> ' + hero.badge;
  }
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) heroTitle.innerHTML = hero.title;
  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.textContent = hero.description;

  // Stats
  const stats = DataManager.get('stats');
  const statItems = document.querySelectorAll('.stat-item');
  stats.forEach((stat, i) => {
    if (statItems[i]) {
      const numEl = statItems[i].querySelector('.stat-number');
      const labelEl = statItems[i].querySelector('.stat-label');
      if (numEl) {
        numEl.setAttribute('data-target', stat.target);
        numEl.setAttribute('data-suffix', stat.suffix);
        numEl.textContent = '0';
      }
      if (labelEl) labelEl.textContent = stat.label;
    }
  });

  // About
  const about = DataManager.get('about');
  const aboutTitle = document.querySelector('.about-content .section-title');
  if (aboutTitle) aboutTitle.textContent = about.title;
  const aboutTexts = document.querySelectorAll('.about-text');
  if (aboutTexts[0]) aboutTexts[0].textContent = about.text1;
  if (aboutTexts[1]) aboutTexts[1].textContent = about.text2;
  const expNumber = document.querySelector('.about-experience-badge .number');
  if (expNumber) expNumber.textContent = about.experienceNumber;
  const expText = document.querySelector('.about-experience-badge .text');
  if (expText) expText.textContent = about.experienceText;

  // Services
  const services = DataManager.get('services');
  const serviceCards = document.querySelectorAll('.service-card');
  services.forEach((svc, i) => {
    if (serviceCards[i]) {
      const icon = serviceCards[i].querySelector('.service-icon');
      const title = serviceCards[i].querySelector('.service-title');
      const desc = serviceCards[i].querySelector('.service-description');
      if (icon) icon.textContent = svc.icon;
      if (title) title.textContent = svc.title;
      if (desc) desc.textContent = svc.description;
    }
  });

  // Projects
  const projects = DataManager.get('projects');
  const projectCards = document.querySelectorAll('.project-card');
  projects.forEach((proj, i) => {
    if (projectCards[i]) {
      const img = projectCards[i].querySelector('.project-image img');
      const cat = projectCards[i].querySelector('.project-category');
      const title = projectCards[i].querySelector('.project-title');
      const meta = projectCards[i].querySelector('.project-meta');
      if (img) img.src = proj.image;
      if (cat) cat.innerHTML = '● ' + proj.category;
      if (title) title.textContent = proj.title;
      if (meta) meta.textContent = proj.meta;
    }
  });

  // Advantages
  const advantages = DataManager.get('advantages');
  const advCards = document.querySelectorAll('.advantage-card');
  advantages.forEach((adv, i) => {
    if (advCards[i]) {
      const title = advCards[i].querySelector('.advantage-content h3');
      const desc = advCards[i].querySelector('.advantage-content p');
      if (title) title.textContent = adv.title;
      if (desc) desc.textContent = adv.description;
    }
  });

  // Contact info
  const contact = DataManager.get('contact');
  const contactItems = document.querySelectorAll('.contact-item');
  if (contactItems[0]) {
    const p = contactItems[0].querySelector('.contact-item-content p');
    if (p) p.textContent = contact.address;
  }
  if (contactItems[1]) {
    const a = contactItems[1].querySelector('.contact-item-content a');
    if (a) {
      a.textContent = contact.phone;
      a.href = 'tel:' + contact.phone.replace(/[\s()-]/g, '');
    }
  }
  if (contactItems[2]) {
    const a = contactItems[2].querySelector('.contact-item-content a');
    if (a) {
      a.textContent = contact.email;
      a.href = 'mailto:' + contact.email;
    }
  }
  if (contactItems[3]) {
    const p = contactItems[3].querySelector('.contact-item-content p');
    if (p) p.textContent = contact.workHours;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Apply dynamic content from localStorage
  applyDynamicContent();

  // ===== PRELOADER =====
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  });

  if (document.readyState === 'complete') {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800);
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== MOBILE MENU =====
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a[href*="#"]').forEach(link => {
          link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 2000;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easedProgress * target);
        counter.textContent = prefix + current.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = prefix + target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(updateCounter);
    });
    countersAnimated = true;
  }

  const statsSection = document.querySelector('.stats-bar');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== FORM HANDLING — saves to localStorage =====
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        id: Date.now(),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value || '—',
        message: document.getElementById('message').value || '—',
        date: new Date().toLocaleString('ru-RU'),
        status: 'new'
      };

      DataManager.addSubmission(formData);

      const btn = contactForm.querySelector('.btn-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Заявка отправлена!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #3b82f6)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // ===== PARALLAX EFFECT ON HERO =====
  const heroImage = document.querySelector('.hero-bg img');

  if (heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(1.1)`;
      }
    });
  }

  // ===== TILT EFFECT ON SERVICE CARDS =====
  const tiltCards = document.querySelectorAll('.service-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '↑';
  backToTop.className = 'back-to-top';
  backToTop.setAttribute('aria-label', 'Наверх');
  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #f59e0b, #ef4444);
    color: #0a0a0f;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(245, 158, 11, 0.3);
  `;

  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
      backToTop.style.visibility = 'visible';
      backToTop.style.transform = 'translateY(0)';
    } else {
      backToTop.style.opacity = '0';
      backToTop.style.visibility = 'hidden';
      backToTop.style.transform = 'translateY(20px)';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-3px)';
    backToTop.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.4)';
  });

  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0)';
    backToTop.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.3)';
  });
});
