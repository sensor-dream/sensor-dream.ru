document.addEventListener('DOMContentLoaded', function() {
    const chatBtn = document.querySelector('.live-chat-btn');
    const chatContainer = document.querySelector('.live-chat-container');
    const closeChatBtn = document.querySelector('.close-chat');
    const aiChatContainer = document.getElementById('aiChatContainer');
    const aiUserInput = document.getElementById('aiUserInput');
    const aiSendBtn = document.getElementById('aiSendBtn');
    
    // Показываем чат при клике на кнопку
    chatBtn.addEventListener('click', () => {
        chatContainer.classList.add('active');
    });
    
    // Закрываем чат
    closeChatBtn.addEventListener('click', () => {
        chatContainer.classList.remove('active');
    });
    
    // Добавляем сообщение пользователя
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = `> Вы: ${message}`;
        aiChatContainer.appendChild(messageDiv);
        aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
    }
    
    // Добавляем сообщение AI
    function addAiMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        messageDiv.textContent = `> SDBS AI: ${message}`;
        aiChatContainer.appendChild(messageDiv);
        aiChatContainer.scrollTop = aiChatContainer.scrollHeight;
    }
    
    // Отправка сообщения (имитация)
    function sendToDeepSeek(message) {
        // Здесь будет реальный запрос к API
        console.log("Отправка сообщения в DeepSeek:", message);
        
        // Имитация ответа
        setTimeout(() => {
            const responses = [
                "Я могу помочь с настройкой серверов и VPS/VDS.",
                "Для подключения домена вам нужно изменить DNS записи.",
                "Установка WordPress занимает около 5-10 минут.",
                "Рекомендую использовать Ubuntu Server для вашего VPS.",
                "Для оптимизации сервера нужно проверить текущую нагрузку."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addAiMessage(randomResponse);
        }, 1000);
    }
    
    // Обработка отправки сообщения
    aiSendBtn.addEventListener('click', () => {
        const message = aiUserInput.value.trim();
        if (message) {
            addUserMessage(message);
            sendToDeepSeek(message);
            aiUserInput.value = "";
        }
    });
    
    // Отправка по Enter
    aiUserInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            aiSendBtn.click();
        }
    });
    
    // Приветственное сообщение
    setTimeout(() => {
        addAiMessage("Привет! Я AI-помощник SDBS. Чем могу помочь?");
    }, 1000);
});