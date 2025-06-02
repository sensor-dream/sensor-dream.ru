document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    // Установка размеров canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Символы для матрицы
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    
    // Массив для хранения позиций капель
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    // Цвета для матрицы
    const colors = ['#0f0', '#0a0', '#0fa', '#0af', '#0f5'];
    
    function drawMatrix() {
        // Полупрозрачный фон для эффекта следа
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рисуем символы
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Случайный цвет
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillText(text, x, y);
            
            // Случайное обновление позиции
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    // Анимация матрицы
    const matrixInterval = setInterval(drawMatrix, 50);
    
    // Респонсивность при изменении размера окна
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
