// 1. КОНСТАНТЫ
const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// 2. ГЕНЕРАЦИЯ ПАКОВ (Версии по списку Сани)
const versions = ["3.3", "3.2", "3.1", "3.0", "29000", "2.8", "2.5", "2.2", "2.0", "1.0"];
const grid = document.getElementById('main-grid');

if(grid) {
    versions.forEach(v => {
        grid.innerHTML += `
            <div class="pack-card glass-card" onclick="openPack('${v}', 'Kosmo Level')">
                <div class="thumb">${v === '29000' ? '⚡' : v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>
        `;
    });
}

// 3. ВЫПАДАЮЩЕЕ МЕНЮ ПОМОЩНИКОВ
function toggleHelpers() {
    const menu = document.getElementById('helpers-list');
    const arrow = document.querySelector('.arrow-icon');
    menu.classList.toggle('hidden');
    arrow.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// 4. УПРАВЛЕНИЕ ОКНАМИ
function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}

function openAndAsk() {
    const ver = document.getElementById('modal-ver').innerText;
    closePack();
    if(ui.classList.contains('ai-hidden')) toggleAI();
    userInput.value = `Расскажи подробнее про Kosmo Level версии ${ver}`;
}

// 5. ЛОГИКА ОРАКУЛА (Твой эталонный код)
const ui = document.getElementById('ai-interface');
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

function toggleAI() { ui.classList.toggle('ai-hidden'); }

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    renderMessage('user', text);
    userInput.value = "";
    const thinkingId = "think-" + Date.now();
    renderMessage('ai', '●●●', thinkingId);

    try {
        const response = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await response.json();
        document.getElementById(thinkingId).innerText = data.answer;
    } catch (e) {
        document.getElementById(thinkingId).innerText = "Ошибка Штаба ЛМЛСХ.";
    }
}

function renderMessage(role, text, id = null) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (id) div.id = id;
    div.innerText = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 6. СИСТЕМА ПРОФИЛЯ
function handleProfile() {
    const name = prompt("Имя Агента:", localStorage.getItem('lmsh_name') || "Саня");
    if(name) {
        localStorage.setItem('lmsh_name', name);
        document.getElementById('profile-btn').innerText = `Профиль (${name[0].toUpperCase()})`;
    }
}

// 7. ЭПИК ТАЙМЕР (2:30)
setInterval(() => {
    const trig = document.getElementById('oracle-trigger');
    trig.classList.add('epic-flash');
    setTimeout(() => trig.classList.remove('epic-flash'), 5000);
}, 150000);

// Запуск
window.onload = () => {
    const saved = localStorage.getItem('lmsh_name') || "Саня";
    document.getElementById('profile-btn').innerText = `Профиль (${saved[0].toUpperCase()})`;
};
