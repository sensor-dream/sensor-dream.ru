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


    function PMA_getIp()
    {
        global $REMOTE_ADDR;
        global $HTTP_X_FORWARDED_FOR, $HTTP_X_FORWARDED, $HTTP_FORWARDED_FOR, $HTTP_FORWARDED;
        global $HTTP_VIA, $HTTP_X_COMING_FROM, $HTTP_COMING_FROM;
        global $HTTP_SERVER_VARS, $HTTP_ENV_VARS;

        // Get some server/environment variables values
        if (empty($REMOTE_ADDR)) {
            if (!empty($_SERVER) && isset($_SERVER['REMOTE_ADDR'])) {
                $REMOTE_ADDR = $_SERVER['REMOTE_ADDR'];
            }
            else if (!empty($_ENV) && isset($_ENV['REMOTE_ADDR'])) {
                $REMOTE_ADDR = $_ENV['REMOTE_ADDR'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['REMOTE_ADDR'])) {
                $REMOTE_ADDR = $HTTP_SERVER_VARS['REMOTE_ADDR'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['REMOTE_ADDR'])) {
                $REMOTE_ADDR = $HTTP_ENV_VARS['REMOTE_ADDR'];
            }
            else if (@getenv('REMOTE_ADDR')) {
                $REMOTE_ADDR = getenv('REMOTE_ADDR');
            }
        } // end if
        if (empty($HTTP_X_FORWARDED_FOR)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
                $HTTP_X_FORWARDED_FOR = $_SERVER['HTTP_X_FORWARDED_FOR'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_X_FORWARDED_FOR'])) {
                $HTTP_X_FORWARDED_FOR = $_ENV['HTTP_X_FORWARDED_FOR'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_X_FORWARDED_FOR'])) {
                $HTTP_X_FORWARDED_FOR = $HTTP_SERVER_VARS['HTTP_X_FORWARDED_FOR'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_X_FORWARDED_FOR'])) {
                $HTTP_X_FORWARDED_FOR = $HTTP_ENV_VARS['HTTP_X_FORWARDED_FOR'];
            }
            else if (@getenv('HTTP_X_FORWARDED_FOR')) {
                $HTTP_X_FORWARDED_FOR = getenv('HTTP_X_FORWARDED_FOR');
            }
        } // end if
        if (empty($HTTP_X_FORWARDED)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_X_FORWARDED'])) {
                $HTTP_X_FORWARDED = $_SERVER['HTTP_X_FORWARDED'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_X_FORWARDED'])) {
                $HTTP_X_FORWARDED = $_ENV['HTTP_X_FORWARDED'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_X_FORWARDED'])) {
                $HTTP_X_FORWARDED = $HTTP_SERVER_VARS['HTTP_X_FORWARDED'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_X_FORWARDED'])) {
                $HTTP_X_FORWARDED = $HTTP_ENV_VARS['HTTP_X_FORWARDED'];
            }
            else if (@getenv('HTTP_X_FORWARDED')) {
                $HTTP_X_FORWARDED = getenv('HTTP_X_FORWARDED');
            }
        } // end if
        if (empty($HTTP_FORWARDED_FOR)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_FORWARDED_FOR'])) {
                $HTTP_FORWARDED_FOR = $_SERVER['HTTP_FORWARDED_FOR'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_FORWARDED_FOR'])) {
                $HTTP_FORWARDED_FOR = $_ENV['HTTP_FORWARDED_FOR'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_FORWARDED_FOR'])) {
                $HTTP_FORWARDED_FOR = $HTTP_SERVER_VARS['HTTP_FORWARDED_FOR'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_FORWARDED_FOR'])) {
                $HTTP_FORWARDED_FOR = $HTTP_ENV_VARS['HTTP_FORWARDED_FOR'];
            }
            else if (@getenv('HTTP_FORWARDED_FOR')) {
                $HTTP_FORWARDED_FOR = getenv('HTTP_FORWARDED_FOR');
            }
        } // end if
        if (empty($HTTP_FORWARDED)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_FORWARDED'])) {
                $HTTP_FORWARDED = $_SERVER['HTTP_FORWARDED'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_FORWARDED'])) {
                $HTTP_FORWARDED = $_ENV['HTTP_FORWARDED'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_FORWARDED'])) {
                $HTTP_FORWARDED = $HTTP_SERVER_VARS['HTTP_FORWARDED'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_FORWARDED'])) {
                $HTTP_FORWARDED = $HTTP_ENV_VARS['HTTP_FORWARDED'];
            }
            else if (@getenv('HTTP_FORWARDED')) {
                $HTTP_FORWARDED = getenv('HTTP_FORWARDED');
            }
        } // end if
        if (empty($HTTP_VIA)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_VIA'])) {
                $HTTP_VIA = $_SERVER['HTTP_VIA'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_VIA'])) {
                $HTTP_VIA = $_ENV['HTTP_VIA'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_VIA'])) {
                $HTTP_VIA = $HTTP_SERVER_VARS['HTTP_VIA'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_VIA'])) {
                $HTTP_VIA = $HTTP_ENV_VARS['HTTP_VIA'];
            }
            else if (@getenv('HTTP_VIA')) {
                $HTTP_VIA = getenv('HTTP_VIA');
            }
        } // end if
        if (empty($HTTP_X_COMING_FROM)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_X_COMING_FROM'])) {
                $HTTP_X_COMING_FROM = $_SERVER['HTTP_X_COMING_FROM'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_X_COMING_FROM'])) {
                $HTTP_X_COMING_FROM = $_ENV['HTTP_X_COMING_FROM'];
            }
            else if (!empty($HTTP_SERVER_VARS) && isset($HTTP_SERVER_VARS['HTTP_X_COMING_FROM'])) {
                $HTTP_X_COMING_FROM = $HTTP_SERVER_VARS['HTTP_X_COMING_FROM'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_X_COMING_FROM'])) {
                $HTTP_X_COMING_FROM = $HTTP_ENV_VARS['HTTP_X_COMING_FROM'];
            }
            else if (@getenv('HTTP_X_COMING_FROM')) {
                $HTTP_X_COMING_FROM = getenv('HTTP_X_COMING_FROM');
            }
        } // end if
        if (empty($HTTP_COMING_FROM)) {
            if (!empty($_SERVER) && isset($_SERVER['HTTP_COMING_FROM'])) {
                $HTTP_COMING_FROM = $_SERVER['HTTP_COMING_FROM'];
            }
            else if (!empty($_ENV) && isset($_ENV['HTTP_COMING_FROM'])) {
                $HTTP_COMING_FROM = $_ENV['HTTP_COMING_FROM'];
            }
            else if (!empty($HTTP_COMING_FROM) && isset($HTTP_SERVER_VARS['HTTP_COMING_FROM'])) {
                $HTTP_COMING_FROM = $HTTP_SERVER_VARS['HTTP_COMING_FROM'];
            }
            else if (!empty($HTTP_ENV_VARS) && isset($HTTP_ENV_VARS['HTTP_COMING_FROM'])) {
                $HTTP_COMING_FROM = $HTTP_ENV_VARS['HTTP_COMING_FROM'];
            }
            else if (@getenv('HTTP_COMING_FROM')) {
                $HTTP_COMING_FROM = getenv('HTTP_COMING_FROM');
            }
        } // end if

        // Gets the default ip sent by the user
        if (!empty($REMOTE_ADDR)) {
            $direct_ip = $REMOTE_ADDR;
        }

        // Gets the proxy ip sent by the user
        $proxy_ip     = '';
        if (!empty($HTTP_X_FORWARDED_FOR)) {
            $proxy_ip = $HTTP_X_FORWARDED_FOR;
        } else if (!empty($HTTP_X_FORWARDED)) {
            $proxy_ip = $HTTP_X_FORWARDED;
        } else if (!empty($HTTP_FORWARDED_FOR)) {
            $proxy_ip = $HTTP_FORWARDED_FOR;
        } else if (!empty($HTTP_FORWARDED)) {
            $proxy_ip = $HTTP_FORWARDED;
        } else if (!empty($HTTP_VIA)) {
            $proxy_ip = $HTTP_VIA;
        } else if (!empty($HTTP_X_COMING_FROM)) {
            $proxy_ip = $HTTP_X_COMING_FROM;
        } else if (!empty($HTTP_COMING_FROM)) {
            $proxy_ip = $HTTP_COMING_FROM;
        } // end if... else if...

        // Returns the true IP if it has been found, else FALSE
        if (empty($proxy_ip)) {
            // True IP without proxy
            return $direct_ip;
        } else {
            $is_ip = ereg('^([0-9]{1,3}\.){3,3}[0-9]{1,3}', $proxy_ip, $regs);
            if ($is_ip && (count($regs) > 0)) {
                // True IP behind a proxy
                return $regs[0];
            } else {
                // Can't define IP: there is a proxy but we don't have
                // information about the true IP
                return FALSE;
            }
        } // end if... else...
    } // end of the 'PMA_getIp()' function


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
        
        $get_ip = PMA_getIp();

        // Содержание письма
        $mail->isHTML(false);
        $mail->Subject = 'Новое сообщение с сайта от ' . $name;
        $mail->Body = "Имя: $name\nEmail: $email\n\nСообщение:\n$message\n" . "\nip:  $get_ip";
        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Your message has been sent successfully!' . "\nip: $get_ip"]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => "An error occurred while sending. Please try again later. Error: {$mail->ErrorInfo}" . "\nip: $get_ip"]);
    }
?>