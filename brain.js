const OracleSystem = {
    isLoggedIn: false, // Меняй на true для теста доступа
    scriptURL: 'https://script.google.com/macros/s/AKfycbxiXEoCIRih3N1nyIma7GkcMiodxoTEEIZ17pK8Tz6nksDLImiunYMyE5B36TQgqm1_/exec',

    init() {
        this.setupEventListeners();
        this.checkAccess();
    },

    setupEventListeners() {
        const mainInput = document.querySelector('.search-input');
        
        // Отправка по нажатию Enter
        mainInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && mainInput.value.trim() !== "") {
                this.sendMessage(mainInput.value);
                mainInput.value = ""; 
            }
        });
    },

    sendMessage(text) {
        // Открываем окно, если оно закрыто
        document.getElementById('chatWindow').classList.add('active');
        document.getElementById('bottomBar').classList.add('hidden');
        
        const display = document.getElementById('chatDisplay');
        display.innerHTML += `<div style="margin-bottom:10px; color:var(--accent)"><b>Вы:</b> ${text}</div>`;

        // Магия отправки в Google Таблицу
        fetch(this.scriptURL, {
            method: 'POST',
            mode: 'no-cors', // Важно для работы с Google Script
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: text, 
                user: this.isLoggedIn ? "Резидент" : "Гость",
                status: "Oracle AI Premier 340"
            })
        }).then(() => {
            display.innerHTML += `<div style="margin-bottom:15px; opacity:0.6; font-size:13px;"><i>Оракул: Данные переданы в ЛМСХ.</i></div>`;
            display.scrollTop = display.scrollHeight;
        }).catch(err => console.error("Ошибка связи:", err));
    },

    checkAccess() {
        const historyBlock = document.getElementById('chatHistory');
        const lockMsg = document.getElementById('historyLockMessage');
        
        if (!this.isLoggedIn) {
            if (historyBlock) historyBlock.style.filter = "blur(8px)";
            if (lockMsg) lockMsg.style.display = "block";
        } else {
            if (historyBlock) historyBlock.style.filter = "none";
            if (lockMsg) lockMsg.style.display = "none";
        }
    }
};

window.onload = () => OracleSystem.init();
