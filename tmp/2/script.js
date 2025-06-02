// Открытие секции по ID
function openSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// Модальное окно для услуг
function openModal(service) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  let desc = '';
  switch (service) {
    case 'web': desc = "We build fast, responsive websites using modern technologies."; break;
    case 'server': desc = "Professional server setup and maintenance for businesses."; break;
    case 'support': desc = "24/7 technical support for all your IT needs."; break;
  }

  title.textContent = service.toUpperCase();
  body.textContent = desc;
  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

// Чат
function toggleChat() {
  const chat = document.getElementById('chat-modal');
  chat.classList.toggle('hidden');
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (msg) {
    alert(`You wrote: ${msg}`);
    input.value = '';
  }
}

// Отправка формы (на клиенте — только пример)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert("Form submitted!");
  this.reset();
});

document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = this;
  const data = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: data
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.status === 'success') {
      form.reset();
    }
  })
  .catch(error => {
    alert('Ошибка при отправке');
    console.error(error);
  });
});
