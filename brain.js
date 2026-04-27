const OracleSystem = {
    isLoggedIn: false, // Переключи на true, чтобы войти в аккаунт
    currentTier: '340', // '340', 'PRO', 'Ultra'
    scriptURL: 'https://script.google.com/macros/s/AKfycbxiXEoCIRih3N1nyIma7GkcMiodxoTEEIZ17pK8Tz6nksDLImiunYMyE5B36TQgqm1_/exec',

    init() {
        this.applyTheme();
        this.setupEventListeners();
        this.checkAccess();
    },

    setupEventListeners() {
        const input = document.querySelector('.search-input');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.value.trim() !== "") {
                    this.sendMessage(input.value);
                    input.value = "";
                }
            });
        }
    },

    sendMessage(text) {
        const chat = document.getElementById('chatWindow');
        const bar = document.getElementById('bottomBar');
        const display = document.getElementById('chatDisplay');

        if (!chat.classList.contains('active')) {
            chat.classList.add('active');
            bar.classList.add('hidden');
        }

        display.innerHTML += `<div style="margin-bottom:15px; color:var(--accent-solid)"><b>Вы:</b> ${text}</div>`;
        display.scrollTop = display.scrollHeight;

        fetch(this.scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({
                message: text,
                user: this.isLoggedIn ? `Резидент (${this.currentTier})` : "Гость",
                status: "340-Online"
            })
        }).then(() => {
            display.innerHTML += `<div style="margin-bottom:20px; opacity:0.5; font-size:12px;"><i>Оракул: Данные занесены в реестр ЛМСХ.</i></div>`;
            display.scrollTop = display.scrollHeight;
        });
    },

    setTier(tier) {
        if (!this.isLoggedIn) return alert("Сначала войдите в аккаунт!");
        this.currentTier = tier;
        this.applyTheme();
        alert(`Протокол ${tier} активирован.`);
    },

    applyTheme() {
        const themes = {
            '340': '#bf5af2',
            'PRO': '#007aff',
            'Ultra': '#ffd60a'
        };
        document.documentElement.style.setProperty('--accent-solid', themes[this.currentTier]);
    },

    checkAccess() {
        const lock = document.getElementById('lockOverlay');
        const history = document.getElementById('chatHistory');
        const historyMsg = document.getElementById('historyLockMessage');

        if (!this.isLoggedIn) {
            if (lock) lock.style.display = 'flex';
            if (history) history.style.filter = 'blur(15px)';
            if (historyMsg) historyMsg.style.display = 'block';
        } else {
            if (lock) lock.style.display = 'none';
            if (history) history.style.filter = 'none';
            if (historyMsg) historyMsg.style.display = 'none';
        }
    }
};

window.onload = () => OracleSystem.init();
