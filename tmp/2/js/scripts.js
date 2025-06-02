// Переключение модального окна
function toggleLiveChat() {
    var modal = document.getElementById('livechat-modal');
    modal.classList.toggle('hidden');
}

// Закрыть модальное окно нажатием Esc
window.addEventListener('keyup', function(e) {
    if (e.keyCode === 27 && !document.querySelector('.modal.hidden')) {
        toggleLiveChat();
    }
});
