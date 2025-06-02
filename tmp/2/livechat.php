<?php
session_start(); // Начало сессии для хранения истории чата

if(isset($_SESSION['messages'])) {
    $history = $_SESSION['messages'];
} else {
    $history = array();
}

// Получение входящего сообщения
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $newMessage = [
        'timestamp' => date('H:i:s'),
        'text' => $_POST['message']
    ];
    $history[] = $newMessage;
    $_SESSION['messages'] = $history;
}

// Отображение истории сообщений
foreach ($history as $msg) {
    echo '<p>' . $msg['timestamp'] . ': ' . $msg['text'] . '</p>';
}

// Форма для ввода нового сообщения
echo '
<form method="post" onsubmit="return submitForm(this);">
    <input type="text" name="message" placeholder="Напишите ваше сообщение..." autofocus required>
    <button type="submit">Send</button>
</form>
';

// Функция отправки AJAX-сообщений
echo '
<script>
function submitForm(form) {
    fetch(\'' . $_SERVER['PHP_SELF'] . '\', {
        method: \'POST\',
        headers: {\'Content-Type\': \'application/x-www-form-urlencoded\'},
        body: new FormData(form)
    }).then(response => response.text())
      .then(data => {
          document.querySelector(".modal-content").innerHTML += data;
          form.reset();
      });
    return false;
}
</script>
';
?>
