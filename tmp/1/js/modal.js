document.addEventListener('DOMContentLoaded', function() {
    let currentModal = null;
    
    // Функция для открытия модального окна
    function openModal(modalType) {
        // Закрываем предыдущее модальное окно, если оно есть
        if (currentModal) {
            currentModal.remove();
        }
        
        // Создаем HTML для модального окна
        const modalHtml = modalType === 'ai-chat' ? `
            <div class="modal-content terminal-modal">
                <span class="close">&times;</span>
                <h2>SDBS AI Помощник</h2>
                <div id="aiChatContainer" class="ai-chat-container">
                    <div class="ai-message">> SDBS AI: Чем могу помочь?</div>
                </div>
                <div class="ai-input-container">
                    <input type="text" id="aiUserInput" placeholder="Введите ваш вопрос...">
                    <button id="aiSendBtn">Отправить</button>
                </div>
            </div>
        ` : `
            <div class="modal-content terminal-modal">
                <span class="close">&times;</span>
                <h2>Обратная связь</h2>
                <form id="feedbackForm">
                    <div class="form-group">
                        <label for="name">Имя:</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Сообщение:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" class="btn">Отправить</button>
                </form>
            </div>
        `;
        
        // Создаем и добавляем модальное окно
        const modal = document.createElement('div');
        modal.id = `${modalType}Modal`;
        modal.className = 'modal';
        modal.innerHTML = modalHtml;
        document.body.appendChild(modal);
        modal.style.display = "block";
        currentModal = modal;
        
        // Инициализация функционала для модального окна
        if (modalType === 'ai-chat') {
            initAiChat();
        } else if (modalType === 'feedback') {
            initFeedbackForm();
        }
        
        // Обработчики закрытия
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', closeModal);
        
        // Закрытие по клику вне модального окна
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', escCloseHandler);
    }
    
    // Функция для закрытия модального окна
    function closeModal() {
        if (currentModal) {
            currentModal.style.display = "none";
            currentModal.remove();
            currentModal = null;
            document.removeEventListener('keydown', escCloseHandler);
        }
    }
    
    // Обработчик ESC
    function escCloseHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
    
    // Обработчики кнопок
    const aiChatBtn = document.getElementById('aiChatBtn');
    const feedbackBtn = document.getElementById('feedbackBtn');
    
    if (aiChatBtn) {
        aiChatBtn.addEventListener('click', () => openModal('ai-chat'));
    }
    
    if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => openModal('feedback'));
    }
});
