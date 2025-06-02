document.addEventListener('DOMContentLoaded', function() {
    // Эффект печатающегося текста
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const texts = [
            "Настройка серверов...",
            "Установка VPS/VDS...",
            "Подключение доменов...",
            "Удаленная поддержка..."
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeWriter() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typedText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Пауза в конце строки
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Пауза перед началом новой строки
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Запускаем эффект через небольшую задержку
        setTimeout(typeWriter, 1000);
    }
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
