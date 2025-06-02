function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.name.value.trim(),
                email: this.email.value.trim(),
                message: this.message.value.trim()
            };
            
            // Валидация
            if (!formData.name || !formData.email || !formData.message) {
                alert("Все поля обязательны для заполнения!");
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                alert("Пожалуйста, введите корректный email адрес!");
                return;
            }
            
            // Отправка формы
            fetch('../php/feedback.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
                    this.reset();
                    document.querySelector('.modal').style.display = "none";
                } else {
                    alert("Ошибка при отправке: " + (data.error || 'Попробуйте позже'));
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Произошла ошибка при отправке формы");
            });
        });
    }
}
