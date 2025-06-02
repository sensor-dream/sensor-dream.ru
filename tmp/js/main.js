// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Matrix rain effect
    function createMatrixRain() {
        const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
        const rainContainer = document.getElementById('matrixRain');
        if (!rainContainer) return;
        
        const fontSize = 14;
        const columns = Math.floor(window.innerWidth / fontSize);
        
        rainContainer.innerHTML = '';
        
        for (let i = 0; i < columns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = (i * fontSize) + 'px';
            column.style.animation = `rain ${Math.random() * 2 + 1}s linear infinite`;
            column.style.animationDelay = `${Math.random() * 2}s`;
            
            const length = Math.floor(Math.random() * 20) + 10;
            for (let j = 0; j < length; j++) {
                const char = document.createElement('div');
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.opacity = Math.random() * 0.5 + 0.1;
                column.appendChild(char);
            }
            
            rainContainer.appendChild(column);
        }
    }
    
    createMatrixRain();
    window.addEventListener('resize', createMatrixRain);
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('show');
        });
    }
    
           // Modal functionality
            const controlPanelModal = document.getElementById('controlPanelModal');
            const contactModal = document.getElementById('contactModal');
            const chatModal = document.getElementById('chatModal');
            const openControlPanel = document.getElementById('openControlPanel');
            const openContactForm = document.getElementById('openContactForm');
            const openContactForm2 = document.getElementById('openContactForm2');
            const closeButtons = document.querySelectorAll('.close-modal');
            
            function openModal(modal) {
                modal.style.display = modal === chatModal ? 'flex' : 'block';
                if (modal !== chatModal) {
                    document.body.style.overflow = 'hidden';
                }
                
                // Load chat if it's the chat modal
                if (modal.id === 'chatModal') {
                    loadChat();
                }
            }
            
            function closeModal(modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            openControlPanel.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(controlPanelModal);
            });
            
            openContactForm.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(contactModal);
            });
            
            openContactForm2.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(contactModal);
            });
            
            closeButtons.forEach(function(button) {
                button.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    closeModal(modal);
                });
            });
            
            // Close modals with ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    const modals = document.querySelectorAll('.modal');
                    modals.forEach(modal => {
                        if (modal.style.display === 'block' || modal.style.display === 'flex') {
                            closeModal(modal);
                        }
                    });
                }
                
                // Open control panel with Alt+C
                if (e.altKey && e.key.toLowerCase() === 'c') {
                    e.preventDefault();
                    openModal(controlPanelModal);
                }
                
                // Open contact form with Alt+F
                if (e.altKey && e.key.toLowerCase() === 'f') {
                    e.preventDefault();
                    openModal(contactModal);
                }
            });
            
            // Chat functionality with DeepSeek AI
            const chatButton = document.getElementById('chatButton');
            const chatClose = document.getElementById('chatClose');
            const chatBody = document.getElementById('chatBody');
            const chatMessage = document.getElementById('chatMessage');
            const chatSend = document.getElementById('chatSend');
            
            chatButton.addEventListener('click', function() {
                chatModal.style.display = 'flex';
                loadChat();
            });
            
            chatClose.addEventListener('click', function() {
                chatModal.style.display = 'none';
            });
            
            function loadChat() {
                // Initial chat load
                chatBody.innerHTML = `
                    <p>> Инициализация DeepSeek AI...</p>
                    <p class="glow">> Готов к работе. Задайте ваш вопрос</p>
                `;
                chatBody.scrollTop = chatBody.scrollHeight;
            }
            
            async function sendMessage() {
                const message = chatMessage.value.trim();
                if (message) {
                    // Add user message to chat
                    const userMessage = document.createElement('p');
                    userMessage.textContent = `Вы: ${message}`;
                    chatBody.appendChild(userMessage);
                    
                    // Add loading indicator
                    const loading = document.createElement('p');
                    loading.textContent = "> AI думает...";
                    chatBody.appendChild(loading);
                    
                    // Clear input
                    chatMessage.value = '';
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                    
                    try {
                        // Send message to DeepSeek AI via proxy
                        const response = await fetch('chat.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                message: message
                            })
                        });
                        
                        const data = await response.json();
                        
                        // Remove loading indicator
                        chatBody.removeChild(loading);
                        
                        // Add AI response
                        const aiResponse = document.createElement('p');
                        aiResponse.innerHTML = `AI: ${data.response}`;
                        chatBody.appendChild(aiResponse);
                    } catch (error) {
                        // Remove loading indicator
                        chatBody.removeChild(loading);
                        
                        // Add error message
                        const errorMessage = document.createElement('p');
                        errorMessage.innerHTML = `> Ошибка соединения с AI. Попробуйте позже.`;
                        chatBody.appendChild(errorMessage);
                    }
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                }
            }
            
            chatSend.addEventListener('click', sendMessage);
            
            chatMessage.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
            
            // Form submission
            const contactForm = document.getElementById('contactForm');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Заявка принята. Мы свяжемся с вами в ближайшее время.');
                closeModal(contactModal);
                this.reset();
            });
            
            // Change blinking cursor from _ to >/
            setInterval(() => {
                const blinkers = document.querySelectorAll('.blink');
                blinkers.forEach(el => {
                    el.textContent = el.textContent === '>' ? '>/' : '>';
                });
            }, 500);
});