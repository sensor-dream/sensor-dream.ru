<?php
header('Content-Type: application/json');

// Proxy to DeepSeek AI API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $message = $input['message'] ?? '';
    
    // Here you would normally call DeepSeek API
    // For demo purposes, we'll simulate responses
    
    $responses = [
        "Для решения этой проблемы вам потребуется проверить соединение и настройки сети.",
        "Рекомендую обновить драйверы и проверить системные требования.",
        "Эта ошибка часто возникает из-за нехватки оперативной памяти.",
        "Попробуйте переустановить программу с официального сайта.",
        "Для более точного ответа уточните версию вашей операционной системы."
    ];
    
    $response = [
        'response' => $responses[array_rand($responses)],
        'timestamp' => time()
    ];
    
    echo json_encode($response);
    exit;
}

// For direct access
echo json_encode(['error' => 'Invalid request method']);
?>
