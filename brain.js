const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// Функция отправки (ГЛАВНАЯ)
async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    renderMessage('user', text);
    input.value = "";

    const thinkingId = "think-" + Date.now();
    renderMessage('ai', 'Анализирую протоколы...', thinkingId);

    try {
        const response = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await response.json();
        const msgDiv = document.getElementById(thinkingId);
        if(msgDiv) msgDiv.innerText = data.answer;
    } catch (e) {
        const msgDiv = document.getElementById(thinkingId);
        if(msgDiv) msgDiv.innerText = "Ошибка Штаба. Проверь соединение.";
    }
}

function renderMessage(role, text, id = null) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (id) div.id = id;
    div.innerText = text;
    const history = document.getElementById('chat-history');
    if(history) {
        history.appendChild(div);
        history.scrollTop = history.scrollHeight;
    }
}

// Привязка Enter к полю ввода
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('user-input');
    if(input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    renderPacks(); // Генерируем паки при загрузке
});

function toggleAI() {
    const ui = document.getElementById('ai-interface');
    if(ui) ui.classList.toggle('ai-hidden');
}

function toggleHelpers() {
    const menu = document.getElementById('helpers-list');
    if(menu) menu.classList.toggle('hidden');
}

// Генерация паков Сани
function renderPacks() {
    const versions = ["3.3", "3.2", "3.1", "3.0", "29000", "2.8", "2.5", "2.2", "2.0", "1.0"];
    const grid = document.getElementById('main-grid');
    if(!grid) return;
    grid.innerHTML = "";
    versions.forEach(v => {
        grid.innerHTML += `
            <div class="pack-card glass-card" onclick="openPack('${v}', 'Kosmo Level')">
                <div class="thumb">${v === '29000' ? '⚡' : v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>`;
    });
}

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}
