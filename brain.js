/**
 * LMSH PRESTIGE | ORACLE CORE SYSTEM
 * Инженер: Ламирк & Мурзик
 */

// 1. АДРЕС ВАШЕГО ШТАБА (Ссылка на Google Apps Script)
const API_URL = "https://script.google.com/macros/s/AKfycbzGwqfcvjGwsGlyvH32866wffj8uBjXSh6pzwgG0WmDiXqO3ghP4sG0qq16eWVWkSBw-Q/exec";

/**
 * Переключение видимости интерфейса Оракула
 */
function toggleAI() {
    const ui = document.getElementById('ai-interface');
    if (ui) {
        ui.classList.toggle('ai-hidden');
    }
}

/**
 * Основная функция отправки сообщения
 */
async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    
    const val = input.value.trim();
    if (!val) return;

    // Выводим сообщение пользователя
    addMsg('user', val);
    input.value = "";

    // Создаем и показываем анимацию "загрузки" (Орбитальные сферы)
    const loaderId = "loader-" + Date.now();
    const loader = document.createElement('div');
    loader.id = loaderId;
    loader.className = 'oracle-typing';
    loader.innerHTML = '<div class="t-ball tb-1"></div><div class="t-ball tb-2"></div>';
    history.appendChild(loader);
    history.scrollTop = history.scrollHeight;

    try {
        // Отправляем запрос в Google Scripts через параметр q
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        
        if (!response.ok) throw new Error("Сбой канала связи");

        const data = await response.json();
        
        // Убираем анимацию загрузки
        const currentLoader = document.getElementById(loaderId);
        if (currentLoader) currentLoader.remove();

        // Выводим ответ Оракула
        addMsg('ai', data.answer);

    } catch (error) {
        // Если что-то пошло не так
        const currentLoader = document.getElementById(loaderId);
        if (currentLoader) currentLoader.remove();
        
        addMsg('ai', "Критическая ошибка связи со Штабом. Проверь развертывание скрипта. 🛠️");
        console.error("Oracle Error:", error);
    }
}

/**
 * Отрисовка сообщения в чате
 */
function addMsg(type, text) {
    const history = document.getElementById('chat-history');
    if (!history) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}`;
    msgDiv.innerText = text;

    history.appendChild(msgDiv);
    
    // Плавная прокрутка вниз
    history.scrollTo({
        top: history.scrollHeight,
        behavior: 'smooth'
    });
}

/**
 * Слушатель нажатия Enter
 */
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
