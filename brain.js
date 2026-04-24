const API_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

function toggleAI() {
    document.getElementById('ai-interface').classList.toggle('ai-hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if (!val) return;

    // 1. Сообщение пользователя
    addMsg('user', val);
    input.value = "";
    
    // 2. Показываем "Живое ожидание" Оракула
    const typingId = showOracleTyping(true);

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        const data = await response.json();
        
        // 3. Убираем анимацию и выводим ответ
        showOracleTyping(false, typingId);
        addMsg('ai', data.answer || "Штаб на связи, но ответа нет.");
    } catch (e) {
        showOracleTyping(false, typingId);
        addMsg('ai', "Ошибка связи. Оракул временно вне зоны доступа. 🛠");
    }
}

function addMsg(role, text) {
    const history = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${role}`;
    msgDiv.innerText = text;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
}

// ФУНКЦИЯ АНИМАЦИИ СФЕР
function showOracleTyping(show, id) {
    const history = document.getElementById('chat-history');
    if (show) {
        const typingDiv = document.createElement('div');
        const uniqueId = 'typing-' + Date.now();
        typingDiv.id = uniqueId;
        typingDiv.className = 'oracle-typing';
        typingDiv.innerHTML = '<div class="typing-ball tb-1"></div><div class="typing-ball tb-2"></div>';
        history.appendChild(typingDiv);
        history.scrollTop = history.scrollHeight;
        return uniqueId;
    } else if (!show && id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
}

// Enter для отправки
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-input')?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
});
