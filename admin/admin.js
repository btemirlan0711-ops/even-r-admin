// ===== EVEN ROADS - Admin Panel JavaScript =====

// ===== Data Manager (shared with main site) =====
const AdminData = {
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

  remove(key) {
    localStorage.removeItem('er_' + key);
  },

  getSubmissions() {
    try {
      const data = localStorage.getItem('er_submissions');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveSubmissions(subs) {
    localStorage.setItem('er_submissions', JSON.stringify(subs));
  },

  getPassword() {
    return localStorage.getItem('er_admin_password') || 'admin123';
  },

  setPassword(pw) {
    localStorage.setItem('er_admin_password', pw);
  },

  isLoggedIn() {
    return sessionStorage.getItem('er_admin_logged') === 'true';
  },

  login() {
    sessionStorage.setItem('er_admin_logged', 'true');
  },

  logout() {
    sessionStorage.removeItem('er_admin_logged');
  }
};

// ===== Toast Notifications =====
function showToast(message, type = 'success') {
  const container = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || '•'}</span> ${message}`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ===== Main App =====
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const adminLayout = document.getElementById('admin-layout');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const logoutBtn = document.getElementById('logout-btn');

  // ===== AUTH =====
  function checkAuth() {
    if (AdminData.isLoggedIn()) {
      loginScreen.classList.add('hidden');
      adminLayout.classList.add('active');
      initDashboard();
    }
  }

  checkAuth();

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('login-password').value;
    if (pw === AdminData.getPassword()) {
      AdminData.login();
      loginScreen.classList.add('hidden');
      adminLayout.classList.add('active');
      loginError.classList.remove('show');
      initDashboard();
      showToast('Добро пожаловать в панель управления!');
    } else {
      loginError.classList.add('show');
      loginError.textContent = 'Неверный пароль. Попробуйте ещё раз.';
    }
  });

  logoutBtn.addEventListener('click', () => {
    AdminData.logout();
    adminLayout.classList.remove('active');
    loginScreen.classList.remove('hidden');
    document.getElementById('login-password').value = '';
  });

  // ===== SIDEBAR NAVIGATION =====
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-panel]');
  const panels = document.querySelectorAll('.admin-panel');
  const topbarTitle = document.querySelector('.topbar-title');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      const panelId = link.getAttribute('data-panel');
      const label = link.querySelector('.label')?.textContent || 'Панель';

      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      panels.forEach(p => p.classList.remove('active'));
      const target = document.getElementById(panelId);
      if (target) target.classList.add('active');

      topbarTitle.textContent = label;

      // Refresh the panel content
      if (panelId === 'panel-dashboard') initDashboard();
      if (panelId === 'panel-submissions') renderSubmissions();
      if (panelId === 'panel-hero') loadHeroForm();
      if (panelId === 'panel-stats') loadStatsForm();
      if (panelId === 'panel-about') loadAboutForm();
      if (panelId === 'panel-services') loadServicesForm();
      if (panelId === 'panel-projects') loadProjectsForm();
      if (panelId === 'panel-advantages') loadAdvantagesForm();
      if (panelId === 'panel-contact') loadContactForm();
      if (panelId === 'panel-settings') loadSettingsForm();
    });
  });

  // ===== SECTION TOGGLES =====
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.edit-section-header');
    if (header) {
      header.classList.toggle('open');
      const body = header.nextElementSibling;
      if (body) body.classList.toggle('open');
    }
  });

  // ===== DASHBOARD =====
  function initDashboard() {
    const subs = AdminData.getSubmissions();
    const newCount = subs.filter(s => s.status === 'new').length;
    const totalCount = subs.length;
    const services = AdminData.get('services');
    const projects = AdminData.get('projects');

    document.getElementById('dash-submissions').textContent = totalCount;
    document.getElementById('dash-new').textContent = newCount;
    document.getElementById('dash-services').textContent = services.length;
    document.getElementById('dash-projects').textContent = projects.length;

    // Update sidebar badge
    const badge = document.getElementById('submissions-badge');
    if (newCount > 0) {
      badge.textContent = newCount;
      badge.style.display = 'inline';
    } else {
      badge.style.display = 'none';
    }

    // Recent submissions
    renderRecentSubmissions(subs.slice(0, 5));
  }

  function renderRecentSubmissions(subs) {
    const tbody = document.getElementById('recent-submissions-body');
    if (!tbody) return;

    if (subs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--admin-text-muted);">Заявок пока нет</td></tr>';
      return;
    }

    tbody.innerHTML = subs.map(sub => `
      <tr>
        <td class="name-cell">${escapeHtml(sub.name)}</td>
        <td>${escapeHtml(sub.phone)}</td>
        <td>${escapeHtml(sub.email)}</td>
        <td><span class="status-badge ${sub.status}">${getStatusLabel(sub.status)}</span></td>
        <td>${sub.date}</td>
      </tr>
    `).join('');
  }

  // Link "see all" on dashboard
  document.getElementById('see-all-submissions')?.addEventListener('click', () => {
    const link = document.querySelector('.sidebar-link[data-panel="panel-submissions"]');
    if (link) link.click();
  });

  // ===== SUBMISSIONS PANEL =====
  function renderSubmissions() {
    const subs = AdminData.getSubmissions();
    const tbody = document.getElementById('submissions-table-body');
    if (!tbody) return;

    if (subs.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 60px; color: var(--admin-text-muted);"><div style="font-size:2.5rem; margin-bottom:12px; opacity:0.3;">📭</div>Заявок пока нет. Они появятся здесь после отправки формы на сайте.</td></tr>';
      return;
    }

    tbody.innerHTML = subs.map((sub, index) => `
      <tr>
        <td class="name-cell">${escapeHtml(sub.name)}</td>
        <td>${escapeHtml(sub.phone)}</td>
        <td>${escapeHtml(sub.email)}</td>
        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(sub.message)}</td>
        <td><span class="status-badge ${sub.status}">${getStatusLabel(sub.status)}</span></td>
        <td>${sub.date}</td>
        <td>
          <div class="table-actions">
            <button class="table-action-btn" onclick="viewSubmission(${index})" title="Просмотр">👁</button>
            <button class="table-action-btn danger" onclick="deleteSubmission(${index})" title="Удалить">🗑</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Make functions global
  window.viewSubmission = function(index) {
    const subs = AdminData.getSubmissions();
    const sub = subs[index];
    if (!sub) return;

    document.getElementById('modal-name').textContent = sub.name;
    document.getElementById('modal-phone').textContent = sub.phone;
    document.getElementById('modal-email').textContent = sub.email;
    document.getElementById('modal-message').textContent = sub.message;
    document.getElementById('modal-date').textContent = sub.date;
    document.getElementById('modal-status').textContent = getStatusLabel(sub.status);
    document.getElementById('modal-status').className = 'status-badge ' + sub.status;

    const modal = document.getElementById('submission-modal');
    modal.classList.add('active');
    modal.setAttribute('data-index', index);

    // Mark as read
    if (sub.status === 'new') {
      sub.status = 'read';
      subs[index] = sub;
      AdminData.saveSubmissions(subs);
      renderSubmissions();
      initDashboard();
    }
  };

  window.deleteSubmission = function(index) {
    if (!confirm('Удалить эту заявку?')) return;
    const subs = AdminData.getSubmissions();
    subs.splice(index, 1);
    AdminData.saveSubmissions(subs);
    renderSubmissions();
    initDashboard();
    showToast('Заявка удалена', 'info');
  };

  // Modal controls
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('submission-modal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.getElementById('modal-toggle-status')?.addEventListener('click', () => {
    const modal = document.getElementById('submission-modal');
    const index = parseInt(modal.getAttribute('data-index'));
    const subs = AdminData.getSubmissions();
    if (!subs[index]) return;

    const cycle = { new: 'read', read: 'done', done: 'new' };
    subs[index].status = cycle[subs[index].status] || 'new';
    AdminData.saveSubmissions(subs);

    document.getElementById('modal-status').textContent = getStatusLabel(subs[index].status);
    document.getElementById('modal-status').className = 'status-badge ' + subs[index].status;

    renderSubmissions();
    initDashboard();
    showToast('Статус обновлён');
  });

  document.getElementById('modal-delete')?.addEventListener('click', () => {
    const modal = document.getElementById('submission-modal');
    const index = parseInt(modal.getAttribute('data-index'));
    if (!confirm('Удалить эту заявку?')) return;

    const subs = AdminData.getSubmissions();
    subs.splice(index, 1);
    AdminData.saveSubmissions(subs);
    closeModal();
    renderSubmissions();
    initDashboard();
    showToast('Заявка удалена', 'info');
  });

  function closeModal() {
    document.getElementById('submission-modal').classList.remove('active');
  }

  // ===== HERO EDITOR =====
  function loadHeroForm() {
    const data = AdminData.get('hero');
    document.getElementById('hero-badge').value = data.badge;
    document.getElementById('hero-title').value = data.title;
    document.getElementById('hero-description').value = data.description;
  }

  document.getElementById('save-hero')?.addEventListener('click', () => {
    AdminData.set('hero', {
      badge: document.getElementById('hero-badge').value,
      title: document.getElementById('hero-title').value,
      description: document.getElementById('hero-description').value
    });
    showToast('Секция «Герой» сохранена!');
  });

  document.getElementById('reset-hero')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('hero');
    loadHeroForm();
    showToast('Секция «Герой» сброшена', 'info');
  });

  // ===== STATS EDITOR =====
  function loadStatsForm() {
    const stats = AdminData.get('stats');
    stats.forEach((stat, i) => {
      const valEl = document.getElementById(`stat-value-${i}`);
      const suffEl = document.getElementById(`stat-suffix-${i}`);
      const labEl = document.getElementById(`stat-label-${i}`);
      if (valEl) valEl.value = stat.target;
      if (suffEl) suffEl.value = stat.suffix;
      if (labEl) labEl.value = stat.label;
    });
  }

  document.getElementById('save-stats')?.addEventListener('click', () => {
    const stats = [];
    for (let i = 0; i < 4; i++) {
      stats.push({
        target: parseInt(document.getElementById(`stat-value-${i}`).value) || 0,
        suffix: document.getElementById(`stat-suffix-${i}`).value,
        label: document.getElementById(`stat-label-${i}`).value
      });
    }
    AdminData.set('stats', stats);
    showToast('Статистика сохранена!');
  });

  document.getElementById('reset-stats')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('stats');
    loadStatsForm();
    showToast('Статистика сброшена', 'info');
  });

  // ===== ABOUT EDITOR =====
  function loadAboutForm() {
    const data = AdminData.get('about');
    document.getElementById('about-title').value = data.title;
    document.getElementById('about-text1').value = data.text1;
    document.getElementById('about-text2').value = data.text2;
    document.getElementById('about-exp-number').value = data.experienceNumber;
    document.getElementById('about-exp-text').value = data.experienceText;
  }

  document.getElementById('save-about')?.addEventListener('click', () => {
    AdminData.set('about', {
      title: document.getElementById('about-title').value,
      text1: document.getElementById('about-text1').value,
      text2: document.getElementById('about-text2').value,
      experienceNumber: document.getElementById('about-exp-number').value,
      experienceText: document.getElementById('about-exp-text').value
    });
    showToast('Секция «О компании» сохранена!');
  });

  document.getElementById('reset-about')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('about');
    loadAboutForm();
    showToast('Секция «О компании» сброшена', 'info');
  });

  // ===== SERVICES EDITOR =====
  function loadServicesForm() {
    const services = AdminData.get('services');
    const container = document.getElementById('services-editor');
    if (!container) return;

    container.innerHTML = services.map((svc, i) => `
      <div class="edit-section">
        <div class="edit-section-header${i === 0 ? ' open' : ''}">
          <h3><span>${svc.icon}</span> Услуга ${i + 1}: ${escapeHtml(svc.title)}</h3>
          <span class="toggle-icon">▼</span>
        </div>
        <div class="edit-section-body${i === 0 ? ' open' : ''}">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label>Иконка (эмодзи)</label>
              <input type="text" id="svc-icon-${i}" value="${svc.icon}" maxlength="4">
            </div>
            <div class="admin-form-group">
              <label>Название</label>
              <input type="text" id="svc-title-${i}" value="${escapeHtml(svc.title)}">
            </div>
          </div>
          <div class="admin-form-group">
            <label>Описание</label>
            <textarea id="svc-desc-${i}" rows="3">${escapeHtml(svc.description)}</textarea>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('save-services')?.addEventListener('click', () => {
    const services = AdminData.get('services');
    const updated = services.map((svc, i) => ({
      icon: document.getElementById(`svc-icon-${i}`)?.value || svc.icon,
      title: document.getElementById(`svc-title-${i}`)?.value || svc.title,
      description: document.getElementById(`svc-desc-${i}`)?.value || svc.description
    }));
    AdminData.set('services', updated);
    showToast('Услуги сохранены!');
  });

  document.getElementById('reset-services')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('services');
    loadServicesForm();
    showToast('Услуги сброшены', 'info');
  });

  // ===== PROJECTS EDITOR =====
  function loadProjectsForm() {
    const projects = AdminData.get('projects');
    const container = document.getElementById('projects-editor');
    if (!container) return;

    container.innerHTML = projects.map((proj, i) => `
      <div class="edit-section">
        <div class="edit-section-header${i === 0 ? ' open' : ''}">
          <h3>📷 Проект ${i + 1}: ${escapeHtml(proj.title)}</h3>
          <span class="toggle-icon">▼</span>
        </div>
        <div class="edit-section-body${i === 0 ? ' open' : ''}">
          <div class="admin-form-group">
            <label>Путь к изображению</label>
            <input type="text" id="proj-image-${i}" value="${escapeHtml(proj.image)}">
            <p class="admin-form-hint">Например: assets/images/project-highway.png</p>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label>Категория</label>
              <input type="text" id="proj-category-${i}" value="${escapeHtml(proj.category)}">
            </div>
            <div class="admin-form-group">
              <label>Название</label>
              <input type="text" id="proj-title-${i}" value="${escapeHtml(proj.title)}">
            </div>
          </div>
          <div class="admin-form-group">
            <label>Мета-информация</label>
            <input type="text" id="proj-meta-${i}" value="${escapeHtml(proj.meta)}">
            <p class="admin-form-hint">Формат: год · расстояние · регион</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('save-projects')?.addEventListener('click', () => {
    const projects = AdminData.get('projects');
    const updated = projects.map((proj, i) => ({
      image: document.getElementById(`proj-image-${i}`)?.value || proj.image,
      category: document.getElementById(`proj-category-${i}`)?.value || proj.category,
      title: document.getElementById(`proj-title-${i}`)?.value || proj.title,
      meta: document.getElementById(`proj-meta-${i}`)?.value || proj.meta
    }));
    AdminData.set('projects', updated);
    showToast('Проекты сохранены!');
  });

  document.getElementById('reset-projects')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('projects');
    loadProjectsForm();
    showToast('Проекты сброшены', 'info');
  });

  // ===== ADVANTAGES EDITOR =====
  function loadAdvantagesForm() {
    const advantages = AdminData.get('advantages');
    const container = document.getElementById('advantages-editor');
    if (!container) return;

    container.innerHTML = advantages.map((adv, i) => `
      <div class="edit-section">
        <div class="edit-section-header${i === 0 ? ' open' : ''}">
          <h3>0${i + 1} — ${escapeHtml(adv.title)}</h3>
          <span class="toggle-icon">▼</span>
        </div>
        <div class="edit-section-body${i === 0 ? ' open' : ''}">
          <div class="admin-form-group">
            <label>Заголовок</label>
            <input type="text" id="adv-title-${i}" value="${escapeHtml(adv.title)}">
          </div>
          <div class="admin-form-group">
            <label>Описание</label>
            <textarea id="adv-desc-${i}" rows="3">${escapeHtml(adv.description)}</textarea>
          </div>
        </div>
      </div>
    `).join('');
  }

  document.getElementById('save-advantages')?.addEventListener('click', () => {
    const advantages = AdminData.get('advantages');
    const updated = advantages.map((adv, i) => ({
      title: document.getElementById(`adv-title-${i}`)?.value || adv.title,
      description: document.getElementById(`adv-desc-${i}`)?.value || adv.description
    }));
    AdminData.set('advantages', updated);
    showToast('Преимущества сохранены!');
  });

  document.getElementById('reset-advantages')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('advantages');
    loadAdvantagesForm();
    showToast('Преимущества сброшены', 'info');
  });

  // ===== CONTACT EDITOR =====
  function loadContactForm() {
    const data = AdminData.get('contact');
    document.getElementById('contact-address').value = data.address;
    document.getElementById('contact-phone').value = data.phone;
    document.getElementById('contact-email').value = data.email;
    document.getElementById('contact-hours').value = data.workHours;
  }

  document.getElementById('save-contact')?.addEventListener('click', () => {
    AdminData.set('contact', {
      address: document.getElementById('contact-address').value,
      phone: document.getElementById('contact-phone').value,
      email: document.getElementById('contact-email').value,
      workHours: document.getElementById('contact-hours').value
    });
    showToast('Контакты сохранены!');
  });

  document.getElementById('reset-contact')?.addEventListener('click', () => {
    if (!confirm('Сбросить к значениям по умолчанию?')) return;
    AdminData.remove('contact');
    loadContactForm();
    showToast('Контакты сброшены', 'info');
  });

  // ===== SETTINGS =====
  function loadSettingsForm() {
    document.getElementById('settings-password').value = '';
    document.getElementById('settings-password-confirm').value = '';
  }

  document.getElementById('save-password')?.addEventListener('click', () => {
    const pw = document.getElementById('settings-password').value;
    const pwConfirm = document.getElementById('settings-password-confirm').value;

    if (!pw) {
      showToast('Введите новый пароль', 'error');
      return;
    }
    if (pw.length < 4) {
      showToast('Пароль должен быть не менее 4 символов', 'error');
      return;
    }
    if (pw !== pwConfirm) {
      showToast('Пароли не совпадают', 'error');
      return;
    }

    AdminData.setPassword(pw);
    document.getElementById('settings-password').value = '';
    document.getElementById('settings-password-confirm').value = '';
    showToast('Пароль изменён!');
  });

  document.getElementById('clear-all-data')?.addEventListener('click', () => {
    if (!confirm('Вы уверены? Все изменения контента будут сброшены к значениям по умолчанию. Заявки не будут затронуты.')) return;

    ['hero', 'stats', 'about', 'services', 'projects', 'advantages', 'contact'].forEach(key => {
      AdminData.remove(key);
    });

    showToast('Все данные контента сброшены к значениям по умолчанию', 'info');
  });

  document.getElementById('clear-submissions')?.addEventListener('click', () => {
    if (!confirm('Удалить ВСЕ заявки? Это действие необратимо.')) return;
    AdminData.saveSubmissions([]);
    initDashboard();
    showToast('Все заявки удалены', 'info');
  });

  // ===== HELPER FUNCTIONS =====
  function getStatusLabel(status) {
    const labels = { new: 'Новая', read: 'Прочитана', done: 'Обработана' };
    return labels[status] || 'Новая';
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Make escapeHtml global for inline handlers
  window.escapeHtml = escapeHtml;

  // ===== MOBILE SIDEBAR TOGGLE =====
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.querySelector('.admin-sidebar');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar on link click (mobile)
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
      }
    });
  });

  // Load initial data for the first visible panel
  loadHeroForm();
});
