// Открытие модального окна
const openModal = () => document.getElementById('help-modal').classList.remove('hidden');

// Закрытие модального окна
const closeModal = () => document.getElementById('help-modal').classList.add('hidden');

document.onkeydown = function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
};
