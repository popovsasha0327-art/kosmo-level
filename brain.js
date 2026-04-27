const OracleSystem = {
    // Состояние системы (сохраняется в браузере)
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    currentTier: localStorage.getItem('userTier') || '340', // 340, PRO, Ultra
    scriptURL: 'https://script.google.com/macros/s/AKfycbxiXEoCIRih3N1nyIma7GkcMiodxoTEEIZ17pK8Tz6nksDLImiunYMyE5B36TQgqm1_/exec',

    init() {
        this.applyTheme();
        this.checkAccess();
        this.setupEventListeners();
        console.log(`LMSH Core v340 Initialized. Tier: ${this.currentTier}`);
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

    // Отправка сообщений в Штаб (Google Таблицы)
    sendMessage(text) {
        const chat = document.getElementById('chatWindow');
        const display = document.getElementById('chatDisplay');

        if (chat && !chat.classList.contains('active')) {
            chat.classList.add('active');
            document.getElementById('bottomBar')?.classList.add('hidden');
        }

        if (display) {
            display.innerHTML += `<div style="margin-bottom:15px; color:var(--accent-solid)"><b>Вы:</b> ${text}</div>`;
            display.scrollTop = display.scrollHeight;
        }

        const payload = {
            message: text,
            user: localStorage.getItem('userName') || "Anonymous",
            tier: this.currentTier,
            type: "ORACLE_QUERY"
        };

        fetch(this.scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(payload)
        }).then(() => {
            if (display) {
                display.innerHTML += `<div style="margin-bottom:20px; opacity:0.5; font-size:12px;"><i>Оракул: Данные занесены в реестр ЛМСХ.</i></div>`;
                display.scrollTop = display.scrollHeight;
            }
        });
    },

    // Применение визуального стиля в зависимости от тарифа
    applyTheme() {
        const root = document.documentElement;
        if (this.currentTier === 'Ultra') {
            root.style.setProperty('--accent-solid', '#ffd60a'); // Золото
            console.log("Ultra Protocol Active");
        } else if (this.currentTier === 'PRO') {
            root.style.setProperty('--accent-solid', '#007aff'); // Синий
        } else {
            root.style.setProperty('--accent-solid', '#bf5af2'); // Фиолетовый
        }
    },

    // Защита контента (Блюр и блокировка)
    checkAccess() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const lock = document.getElementById('lockOverlay');
        const history = document.getElementById('chatHistory');

        if (!isLoggedIn) {
            if (lock) lock.style.display = 'flex';
            if (history) history.style.filter = 'blur(15px)';
        } else {
            if (lock) lock.style.display = 'none';
            if (history) history.style.filter = 'none';
        }
    },

    // Выход из системы
    logout() {
        localStorage.clear();
        location.reload();
    }
};

// Запуск при загрузке
window.onload = () => OracleSystem.init();
