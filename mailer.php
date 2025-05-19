<?php

    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");

    use phpmailer\PHPMailer\PHPMailer;
    use phpmailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/SMTP.php';

    // Проверка метода запроса
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Метод запроса должен быть POST']);
        echo json_encode(['error' => 'Only POST method allowed']);
        //exit;
    }

    // Получение и валидация данных
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');

    $errors = [];
    if (empty($name)) $errors[] = 'Пожалуйста, укажите ваше имя';
    if (empty($email)) $errors[] = 'Пожалуйста, укажите ваш email';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Указан некорректный email';
    if (empty($message)) $errors[] = 'Пожалуйста, напишите ваше сообщение';

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'message' => implode('<br>', $errors)]);
        exit;
    }

    // Настройка PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Настройки сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.yandex.ru'; // Укажите ваш SMTP сервер
        $mail->SMTPAuth = true;
        $mail->Username = 'sensor-dream@sensor-dream.ru'; // SMTP username
        $mail->Password = 'ngvnrynbv19481973'; // SMTP password
        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        // $mail->SMTPSecure = 'SSL';
        $mail->Port = 465;
        $mail->CharSet = 'UTF-8';

        // Отправитель и получатель
        $mail->setFrom('noreply@sensor-dream.ru', 'Site Form');
        $mail->addAddress('sensor-dream@sensor-dream.ru'); // Ваш email
        
        // Содержание письма
        $mail->isHTML(false);
        $mail->Subject = 'Новое сообщение с сайта от ' . $name;
        $mail->Body = "Имя: $name\nEmail: $email\n\nСообщение:\n$message";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!']);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "An error occurred while sending. Please try again later. Error: {$mail->ErrorInfo}"]);
    }
?>