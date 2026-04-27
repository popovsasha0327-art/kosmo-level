// Конфигурация Oracle AI Premier 340
const OracleSystem = {
    isLoggedIn: false, // Поставь true, чтобы убрать блюр в профиле
    currentTheme: 'purple', // purple, blue, gold, green

    // Метод инициализации
    init() {
        console.log("Oracle AI Premier 340: Система запущена.");
        this.applyTheme();
        this.checkAccess();
    },

    // Смена цвета логотипа "на миллион"
    applyTheme() {
        const colors = {
            purple: '#bf5af2',
            blue: '#007aff',
            gold: '#ffd60a',
            green: '#34c759'
        };
        document.documentElement.style.setProperty('--accent', colors[this.currentTheme]);
    },

    // Проверка доступа для профиля
    checkAccess() {
        const blurOverlay = document.getElementById('lockOverlay');
        if (blurOverlay) {
            blurOverlay.style.display = this.isLoggedIn ? 'none' : 'flex';
        }
    }
};

window.onload = () => OracleSystem.init();
