<?php
/**
 * Файл настроек для подключения к LiveChat
 * 
 * Этот файл содержит настройки для интеграции с сервисом LiveChat
 * В реальном проекте здесь были бы параметры подключения к API чата
 */

// Настройки подключения к сервису LiveChat
define('LIVECHAT_API_KEY', 'sdbs_api_key_12345');
define('LIVECHAT_API_URL', 'https://api.livechatinc.com/v3.5/');
define('LIVECHAT_AGENT_ID', 'agent_tech_support');
define('LIVECHAT_DEPARTMENT', 'Техническая поддержка');

/**
 * Инициализация LiveChat
 * 
 * Эта функция выполняет базовую настройку чата
 * В реальном проекте здесь было бы подключение к API
 */
function initializeLiveChat() {
    // В реальном проекте здесь был бы код инициализации
    // Например, проверка ключа API, создание сессии и т.д.
    return true;
}

/**
 * Отправка сообщения в чат
 * 
 * @param string $message Текст сообщения
 * @param string $sender Отправитель (user или agent)
 * @return bool Успешность отправки
 */
function sendChatMessage($message, $sender = 'user') {
    // В реальном проекте здесь была бы отправка сообщения через API
    // Сейчас просто логируем сообщение
    error_log("[" . date('Y-m-d H:i:s') . "] $sender: $message");
    return true;
}

/**
 * Получение истории чата
 * 
 * @param string $sessionId Идентификатор сессии
 * @return array История сообщений
 */
function getChatHistory($sessionId) {
    // В реальном проекте здесь был бы запрос к API для получения истории
    // Возвращаем тестовые данные
    return [
        ['text' => 'Здравствуйте! Чем мы можем вам помочь?', 'sender' => 'agent', 'time' => date('H:i')]
    ];
}

// Проверка инициализации при подключении файла
if (initializeLiveChat()) {
    // Успешная инициализация
    error_log("LiveChat initialized successfully");
} else {
    // Ошибка инициализации
    error_log("LiveChat initialization failed");
}
?>
