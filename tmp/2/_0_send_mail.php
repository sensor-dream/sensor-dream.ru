<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $topic = strip_tags(trim($_POST["topic"]));
    $message = strip_tags(trim($_POST["message"]));
    
    // Проверка данных
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Пожалуйста, заполните форму корректно.";
        exit;
    }
    
    $mail = new PHPMailer(true);
    
    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.your-server.com'; // SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@example.com'; // SMTP логин
        $mail->Password = 'your-password'; // SMTP пароль
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        
        // Отправитель и получатель
        $mail->setFrom('noreply@sdbs.ru', 'SDBS Support');
        $mail->addAddress('support@sdbs.ru', 'Support Team');
        $mail->addReplyTo($email, $name);
        
        // Содержание письма
        $mail->isHTML(true);
        $mail->Subject = "Новый запрос поддержки SDBS: $topic";
        $mail->Body    = "<h3>Новый запрос поддержки</h3>
                          <p><strong>Имя:</strong> $name</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Тема:</strong> $topic</p>
                          <p><strong>Сообщение:</strong></p>
                          <p>$message</p>";
        $mail->AltBody = "Имя: $name\nEmail: $email\nТема: $topic\n\nСообщение:\n$message";
        
        $mail->send();
        echo "Сообщение отправлено! Мы свяжемся с вами в ближайшее время.";
    } catch (Exception $e) {
        http_response_code(500);
        echo "Ошибка при отправке сообщения. Попробуйте позже. Ошибка: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(403);
    echo "Ошибка обработки запроса, попробуйте еще раз.";
}
?>
