const names = {
  dashboard: 'Обзор',
  projects: 'Мои проекты',
  services: 'Услуги Omega IT',
  finance: 'Финансы и выплаты',
  documents: 'Документы',
  messages: 'Сообщения',
  support: 'Поддержка'
};

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.toggle('active', p.id === id);
  });

  document.querySelectorAll('.nav button').forEach(b => {
    b.classList.toggle('active', b.dataset.page === id);
  });

  document.getElementById('crumb').textContent = names[id];
  closeMenu();
}

function toggleMenu() {
  const open = document.body.classList.toggle('menu-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', open);
}

function closeMenu() {
  document.body.classList.remove('menu-open');
  document.getElementById('menuBtn').setAttribute('aria-expanded', 'false');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

document.querySelectorAll('.nav button').forEach(b => {
  b.addEventListener('click', () => showPage(b.dataset.page));
});

let modalMode = 'project';

function openModal(mode) {
  modalMode = mode;
  const isSupport = mode === 'support';

  document.getElementById('modalTitle').textContent = isSupport
    ? 'Написать менеджеру'
    : 'Новая заявка';

  document.getElementById('modalDesc').textContent = isSupport
    ? 'Опишите вопрос, и мы передадим его персональному менеджеру.'
    : 'Заполните информацию, чтобы передать проект команде Omega IT.';

  document.getElementById('modalFields').innerHTML = isSupport
    ? `
      <div class="field">
        <label>Тема обращения</label>
        <select id="projectName">
          <option>Вопрос по проекту</option>
          <option>Финансы и выплаты</option>
          <option>Документы</option>
          <option>Другое</option>
        </select>
      </div>
      <div class="field">
        <label>Сообщение</label>
        <textarea id="projectComment" placeholder="Ваш вопрос..."></textarea>
      </div>
    `
    : `
      <div class="field">
        <label>Название проекта / компании</label>
        <input id="projectName" placeholder="Например, Интернет-магазин">
      </div>
      <div class="field">
        <label>Услуга</label>
        <select id="projectService">
          <option>Разработка сайтов</option>
          <option>Контекстная реклама</option>
          <option>SEO-оптимизация</option>
          <option>Комплексный маркетинг</option>
        </select>
      </div>
      <div class="field">
        <label>Контакт клиента</label>
        <input id="projectContact" placeholder="Телефон или e-mail">
      </div>
      <div class="field">
        <label>Комментарий</label>
        <textarea id="projectComment" placeholder="Кратко опишите задачу"></textarea>
      </div>
    `;

  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

function submitModal() {
  const name = document.getElementById('projectName')?.value?.trim();

  if (!name) {
    notify('Заполните обязательное поле');
    return;
  }

  closeModal();

  notify(
    modalMode === 'support'
      ? 'Сообщение отправлено менеджеру (демо)'
      : 'Заявка создана! Менеджер свяжется с вами (демо)'
  );
}

function sendSupport() {
  const m = document.getElementById('supportMessage').value.trim();

  if (!m) {
    notify('Напишите сообщение');
    return;
  }

  notify('Обращение отправлено (демо)');
  document.getElementById('supportMessage').value = '';
}

function notify(msg) {
  const t = document.getElementById('toast');

  t.textContent = msg;
  t.style.display = 'block';

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.style.display = 'none', 2800);
}

function filterProjects(value) {
  document.querySelectorAll('#projectsTable tbody tr').forEach(r => {
    r.style.display =
      value === 'all' || r.innerText.includes(value)
        ? ''
        : 'none';
  });
}

function changePeriod() {
  notify('Период графика обновлён (демо)');
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target.id === 'modal') closeModal();
});