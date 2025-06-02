<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host       = 'smtp.example.com';      // ваш SMTP хост
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your@email.com';        // ваш email для авторизации
        $mail->Password   = 'your_password';         // пароль от почты
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Получатель
        $mail->setFrom($email, $name);
        $mail->addAddress('recipient@example.com'); // куда отправлять

        // Тело письма
        $mail->isHTML(false);
        $mail->Subject = "Новое сообщение от $name";
        $mail->Body    = "Имя: $name\nEmail: $email\nСообщение:\n$message";

        $mail->send();
        echo json_encode(['status' => 'success', 'message' => 'Письмо успешно отправлено!']);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => "Ошибка отправки письма: {$mail->ErrorInfo}"]);
    }
}
?>
