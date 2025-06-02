(function() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    let letters = ["0","1"];
    let font_size = 10;
    let columns = canvas.width / font_size;
    let drops = [];
    for(let i = 0; i <= columns; i++) {
        drops[i] = 1;
    }

    setInterval(drawMatrix, 33); // Обновление каждые ~33 мс (~30 FPS)

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${font_size}px monospace`;
        ctx.textBaseline = "top";
        ctx.fillStyle = "#0F0"; // зеленый цвет символов
        
        for(let i = 0; i <= columns; i++) {
            let text = letters[Math.floor(Math.random()*letters.length)];
            ctx.fillText(text, i * font_size, drops[i]*font_size);
            
            if(drops[i]*font_size >= canvas.height || Math.random()>0.95){
                drops[i]=0;
            }
            drops[i]++;
        }
    };
})();
