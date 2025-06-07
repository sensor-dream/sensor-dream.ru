function onPageLoad(callback) {
  // Если страница уже загружена
  if (document.readyState === 'complete') {
    callback();
  } 
  // Иначе ждем события загрузки
  else {
    window.addEventListener('load', callback);
  }
}

// Использование
onPageLoad(function() {
    // console.log('Страница готова!');
    // Ваш код инициализации...

        // Генерация матричного дождя
        function createMatrixRain() {
            const matrixRain = document.getElementById('matrixRain');
            const characters = '01';
            const columns = Math.floor(window.innerWidth / 14);
            
            for (let i = 0; i < columns; i++) {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = `${i * 14}px`;
                column.style.animationDelay = `${Math.random() * 5}s`;
                
                // Количество символов в колонке
                const charCount = 50 + Math.floor(Math.random() * 30);
                let content = '';
                
                for (let j = 0; j < charCount; j++) {
                    content += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                
                column.textContent = content;
                matrixRain.appendChild(column);
            }
        }
        
        // Мобильное меню
        document.getElementById('mobileMenuBtn').addEventListener('click', function() {
            document.getElementById('navLinks').classList.toggle('active');
        });
        
        // Закрытие модальных окон
        function setupModal(modalId, openButtons) {
            const modal = document.getElementById(modalId);
            const closeBtn = modal.querySelector('.close-modal');
            
            // Открытие модального окна
            if (openButtons && openButtons.length) {
                openButtons.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    });
                });
            }
            
            // Закрытие по кнопке
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Закрытие по клику вне окна
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Закрытие по ESC
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Инициализация модальных окон
        setupModal('feedbackModal', [
            document.getElementById('feedbackBtn'),
            document.getElementById('contactBtn'),
            document.getElementById('aboutContactBtn')
        ]);
        
        setupModal('chatModal', [
            document.getElementById('helpBtn')
        ]);
        
        // Инициализация модального окна услуг
        const serviceModal = document.getElementById('serviceModal');
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceType = this.getAttribute('data-service');
                loadServiceDetails(serviceType);
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Закрытие модального окна услуг
        serviceModal.querySelector('.close-modal').addEventListener('click', function() {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Загрузка деталей услуги
        function loadServiceDetails(serviceType) {
            const title = document.getElementById('serviceModalTitle');
            const body = document.getElementById('serviceModalBody');
            
            // Заголовок и контент в зависимости от типа услуги
            let serviceTitle = '';
            let serviceContent = '';
            
            switch(serviceType) {
                case 'repair':
                    serviceTitle = 'Ремонт компьютеров';
                    serviceContent = `
                        <h4>Профессиональный ремонт компьютеров и ноутбуков</h4>
                        <p>Мы предлагаем полный спектр услуг по ремонту и обслуживанию компьютерной техники:</p>
                        <ul>
                            <li>Диагностика неисправностей</li>
                            <li>Замена комплектующих (материнские платы, процессоры, видеокарты)</li>
                            <li>Чистка системных блоков от пыли</li>
                            <li>Замена термопасты</li>
                            <li>Ремонт блоков питания</li>
                            <li>Восстановление данных</li>
                        </ul>
                        <p>Среднее время ремонта: 1-3 дня. Гарантия на работы - 6 месяцев.</p>
                        <p><strong>Стоимость:</strong> от 1000 руб.</p>
                    `;
                    break;
                case 'server':
                    serviceTitle = 'Серверные решения';
                    serviceContent = `
                        <h4>Проектирование, установка и обслуживание серверов</h4>
                        <p>Мы предоставляем комплексные серверные решения для бизнеса:</p>
                        <ul>
                            <li>Установка и настройка серверного оборудования</li>
                            <li>Администрирование серверов Windows/Linux</li>
                            <li>Настройка систем резервного копирования</li>
                            <li>Развертывание облачных решений</li>
                            <li>Обеспечение информационной безопасности</li>
                            <li>Круглосуточный мониторинг</li>
                        </ul>
                        <p>Работаем с предприятиями любого масштаба. Индивидуальный подход к каждому клиенту.</p>
                        <p><strong>Стоимость:</strong> от 5000 руб./месяц</p>
                    `;
                    break;
                case 'os':
                    serviceTitle = 'Установка операционных систем';
                    serviceContent = `
                        <h4>Установка и настройка Windows и Linux</h4>
                        <p>Профессиональная установка операционных систем с сохранением данных:</p>
                        <ul>
                            <li>Установка Windows 10/11, Linux (Ubuntu, Fedora, Mint)</li>
                            <li>Установка драйверов и необходимого ПО</li>
                            <li>Оптимизация системы под ваши задачи</li>
                            <li>Настройка интернета и сетевых параметров</li>
                            <li>Создание точек восстановления</li>
                            <li>Обучение работе с системой</li>
                        </ul>
                        <p>Время установки: 1-3 часа. Гарантия на работу - 1 месяц.</p>
                        <p><strong>Стоимость:</strong> от 1500 руб.</p>
                    `;
                    break;
                case 'appliance':
                    serviceTitle = 'Ремонт бытовой техники';
                    serviceContent = `
                        <h4>Ремонт бытовой техники любой сложности</h4>
                        <p>Мы ремонтируем все виды бытовой техники:</p>
                        <ul>
                            <li>Холодильники и морозильные камеры</li>
                            <li>Стиральные и посудомоечные машины</li>
                            <li>Телевизоры и мониторы</li>
                            <li>Микроволновые печи</li>
                            <li>Пылесосы и климатическая техника</li>
                        </ul>
                        <p>Используем только оригинальные запчасти. Выезд мастера в день обращения.</p>
                        <p><strong>Стоимость:</strong> диагностика - 500 руб. (при последующем ремонте бесплатно)</p>
                    `;
                    break;
                case 'software':
                    serviceTitle = 'Установка программного обеспечения';
                    serviceContent = `
                        <h4>Установка и настройка программного обеспечения</h4>
                        <p>Мы поможем с установкой любого ПО:</p>
                        <ul>
                            <li>Офисные пакеты (Microsoft Office, LibreOffice)</li>
                            <li>Антивирусные программы</li>
                            <li>Графические редакторы (Photoshop, CorelDraw)</li>
                            <li>Специализированное ПО для проектирования, бухгалтерии</li>
                            <li>Утилиты для оптимизации работы системы</li>
                            <li>Игры и мультимедийные приложения</li>
                        </ul>
                        <p>Обеспечим лицензионную чистоту устанавливаемого ПО. Поможем с активацией.</p>
                        <p><strong>Стоимость:</strong> от 500 руб. за программу</p>
                    `;
                    break;
                case 'support':
                    serviceTitle = 'Онлайн-поддержка';
                    serviceContent = `
                        <h4>Круглосуточная IT-поддержка онлайн</h4>
                        <p>Решаем проблемы дистанционно в режиме реального времени:</p>
                        <ul>
                            <li>Удаленная диагностика проблем</li>
                            <li>Настройка программ и оборудования</li>
                            <li>Устранение вирусных угроз</li>
                            <li>Консультации по работе с ПО</li>
                            <li>Восстановление доступа к учетным записям</li>
                            <li>Оптимизация работы системы</li>
                        </ul>
                        <p>Работаем через TeamViewer, AnyDesk, Telegram, WhatsApp. Первые 15 минут консультации - бесплатно!</p>
                        <p><strong>Стоимость:</strong> 500 руб./час</p>
                    `;
                    break;
            }
            
            title.textContent = serviceTitle;
            body.innerHTML = serviceContent;
        }
        
        // Валидация формы обратной связи
        document.getElementById('feedbackForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сброс предыдущих ошибок
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            
            // Валидация имени
            if (!name.value.trim()) {
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Валидация email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Валидация телефона
            const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
            if (!phoneRegex.test(phone.value)) {
                document.getElementById('phoneError').style.display = 'block';
                isValid = false;
            }
            
            // Валидация сообщения
            if (!message.value.trim()) {
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Отправка формы (здесь будет AJAX запрос к sendmail.php)
                alert('Форма успешно отправлена! Мы свяжемся с вами в ближайшее время.');
                document.getElementById('feedbackModal').classList.remove('active');
                document.body.style.overflow = '';
                this.reset();
            }
        });
        
        // Чат поддержки
        document.getElementById('sendMessageBtn').addEventListener('click', function() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (message) {
                // Добавление сообщения пользователя
                const chatMessages = document.getElementById('chatMessages');
                const userMessage = document.createElement('div');
                userMessage.className = 'message user';
                userMessage.innerHTML = `<strong>Вы:</strong> ${message}`;
                chatMessages.appendChild(userMessage);
                
                // Очистка поля ввода
                input.value = '';
                
                // Автопрокрутка к последнему сообщению
                chatMessages.scrollTop = chatMessages.scrollHeight;
                
                // Имитация ответа поддержки
                setTimeout(function() {
                    const supportMessage = document.createElement('div');
                    supportMessage.className = 'message support';
                    supportMessage.innerHTML = `<strong>Поддержка:</strong> Спасибо за ваше сообщение! Мы уже работаем над вашим вопросом. Ожидайте ответа в ближайшее время.`;
                    chatMessages.appendChild(supportMessage);
                    
                    // Автопрокрутка к последнему сообщению
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });
        
        // Отправка сообщения по Enter
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('sendMessageBtn').click();
            }
        });
        
        // Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Закрытие мобильного меню
                    document.getElementById('navLinks').classList.remove('active');
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Инициализация при загрузке страницы
        window.addEventListener('DOMContentLoaded', function() {
            createMatrixRain();
        });
});