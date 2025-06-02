<?php
$smtp_host     = 'smtp.example.com';       // Адрес SMTP сервера
$smtp_port     = 587;                      // Порт SMTP сервера
$smtp_username = 'username@example.com';   // Логин аккаунта на SMTP сервере
$smtp_password = 'password';               // Пароль аккаунта на SMTP сервере
$smtp_secure   = 'tls';                    // Тип шифрования TLS/SSL
$from_address  = 'sender@example.com';     // Отправитель письма
$from_name     = 'Сенсор-Дрим Боксэд Систем';

// Проверка настроек SMTP перед использованием
if (!extension_loaded('openssl')) die('Ошибка загрузки библиотеки OpenSSL.');
if (!$smtp_host OR !$smtp_port OR !$smtp_username OR !$smtp_password) die('SMTP настройки не заданы!');
?>
