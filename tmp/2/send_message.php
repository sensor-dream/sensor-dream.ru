<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once('./config/smtpsend.php'); // Настройки SMTP

    $to      = "your_email@example.com";   // Ваш адрес электронной почты
    $subject = "Новое сообщение от посетителя вашего сайта";
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $message = $_POST['message'];

    $headers = "From: {$email}\r\nReply-To: {$email}";

    $mail_body = <<<BODY
Имя: {$name}<br/>
E-mail: {$email}<br/><br/>
Сообщение:<br/>{$message}
BODY;

    mail($to, $subject, $mail_body, $headers);

    echo "<p style='color: green'>Спасибо! Ваше сообщение успешно отправлено!</p>";
} else {
    http_response_code(403);
    exit();
}
?>
