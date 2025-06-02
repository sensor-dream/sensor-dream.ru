<?php
// Заголовки для JSON
header('Content-Type: application/json');

// Проверка на отправку POST-запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'status' => 'error',
        'message' => 'Доступ запрещен'
    ]);
    exit;
}

// Получение данных из формы
$name = strip_tags(trim($_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$service = strip_tags(trim($_POST['service'] ?? ''));
$message = strip_tags(trim($_POST['message'] ?? ''));

// Валидация данных
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Пожалуйста, заполните все обязательные поля'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Некорректный адрес электронной почты'
    ]);
    exit;
}

// Загрузка PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

// Создание экземпляра PHPMailer
$mail = new PHPMailer(true);

try {
    // Настройки сервера
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com'; // SMTP-сервер
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com'; // Ваш email
    $mail->Password = 'your_password'; // Ваш пароль
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Шифрование
    $mail->Port = 465; // Порт SMTP-сервера
    
    // Настройки отправителя
    $mail->setFrom('noreply@sdbs.ru', 'SDBS Website');
    $mail->addAddress('contact@sdbs.ru', 'SDBS Support'); // Получатель
    
    // Тема письма
    $mail->Subject = 'Новый запрос от ' . $name;
    
    // Формирование тела письма
    $emailBody = "Имя: $name\n";
    $emailBody .= "Email: $email\n";
    $emailBody .= "Услуга: " . ($service ? $service : 'Не указана') . "\n";
    $emailBody .= "Сообщение:\n$message";
    
    $mail->Body = $emailBody;
    
    // Отправка письма
    $mail->send();
    
    // Ответ об успешной отправке
    echo json_encode([
        'status' => 'success',
        'message' => 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
    ]);
} catch (Exception $e) {
    // Обработка ошибки
    echo json_encode([
        'status' => 'error',
        'message' => 'Ошибка при отправке сообщения: ' . $mail->ErrorInfo
    ]);
}


/*

Инструкции по настройке
Установка PHPMailer:

Скачайте последнюю версию PHPMailer с GitHub: https://github.com/PHPMailer/PHPMailer

Распакуйте архив и поместите папку PHPMailer в корень вашего проекта

В коде send_email.php укажите правильный путь к файлам PHPMailer:

php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
Настройка SMTP:

Замените настройки SMTP в коде на реальные данные вашего почтового сервера

Укажите правильные:

Host - SMTP-сервер

Username - ваш email

Password - пароль от email

Port - порт SMTP-сервера (обычно 465 для SSL или 587 для TLS)

Настройка получателя:

В строке $mail->addAddress укажите email, на который должны приходить заявки

Проверка:

Заполните форму на сайте и убедитесь, что письмо приходит на указанный email

Проверьте работу сообщений об успешной отправке и ошибках

*/