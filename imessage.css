const chatWindow = document.getElementById('chat-window');
const msgInput = document.getElementById('msg-input');
const hintsBox = document.getElementById('quick-hints');

// Функция отправки сообщения
function sendMsg() {
    const text = msgInput.value.trim();
    if (!text) return;

    // 1. Отображаем сообщение пользователя
    renderMessage(text, 'outgoing');
    msgInput.value = "";
    
    // Скрываем подсказки после первого взаимодействия
    hintsBox.style.opacity = "0";
    setTimeout(() => hintsBox.style.display = "none", 300);

    // 2. Имитируем "Печатает..."
    setTimeout(() => {
        const response = getAIResponse(text);
        renderMessage(response, 'incoming');
    }, 1000);
}

// Рендер сообщения в окно
function renderMessage(text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${type}`;
    msgDiv.innerText = text;
    chatWindow.appendChild(msgDiv);
    
    // Автопрокрутка вниз
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Функция для подсказок
function askHint(question) {
    msgInput.value = question;
    sendMsg();
}

// МОЗГИ ПОМОЩНИКА (Тут твой секрет!)
function getAIResponse(text) {
    const lowText = text.toLowerCase();
    
    if (lowText.includes('26 апреля')) {
        return "🤫 О-о-о, ты затронул великую тайну! 26 Апреля 2026 года в 12:00 по МСК произойдет то, чего ждал весь Штаб. Kosmo Level 3.4 принесет не просто паки, а новую эру. Готовься!";
    }
    
    if (lowText.includes('установить') || lowText.includes('3.3')) {
        return "Всё просто: скачиваешь архив, распаковываешь в папку с игрой и подтверждаешь замену. Если вылезет ошибка — пиши Ламирку!";
    }
    
    if (lowText.includes('архив')) {
        return "Все старые версии (от 1.0 до 3.2) доступны в главном меню нашего Стора. Просто прокрути страницу вниз!";
    }

    return "Хороший вопрос! Сейчас уточню у Ламирка... А пока просто знай: Штаб работает на полную мощность! 🛠";
}

// Отправка по Enter
msgInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMsg();
});
