// 1. НАСТРОЙКИ ШТАБА
const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// 2. ИСПРАВЛЕННОЕ МЕНЮ ПОМОЩНИКОВ
function toggleHelpers() {
    const menu = document.getElementById('helpers-list');
    const arrow = document.querySelector('.arrow-icon');
    if(menu) {
        menu.classList.toggle('hidden');
        if(arrow) arrow.style.transform = menu.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
}

// Функции для кнопок меню
function openFastAssistant() {
    // Вместо demo.html открываем чат Оракула
    if(document.getElementById('ai-interface').classList.contains('ai-hidden')) {
        toggleAI();
    }
    renderMessage('ai', 'Быстрый помощник на связи! Чем могу помочь по LMSH?');
}

function openRecoveryForm() {
    // Вместо titan.html - твоя реальная ссылка или заглушка
    alert("Форма восстановления LMSH подгружается...");
}

// 3. ФИКС ИИ (ОТПРАВКА СООБЩЕНИЙ)
const ui = document.getElementById('ai-interface');
const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Отображаем сообщение юзера
    renderMessage('user', text);
    userInput.value = "";

    // Создаем эффект раздумий
    const thinkingId = "think-" + Date.now();
    renderMessage('ai', 'Анализирую...', thinkingId);

    try {
        const response = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await response.json();
        const msgDiv = document.getElementById(thinkingId);
        if(msgDiv) msgDiv.innerText = data.answer;
    } catch (e) {
        const msgDiv = document.getElementById(thinkingId);
        if(msgDiv) msgDiv.innerText = "Ошибка связи со Штабом. Проверь интернет или URL скрипта.";
    }
}

// Слушатель Enter для ввода
if(userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function renderMessage(role, text, id = null) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if (id) div.id = id;
    div.innerText = text;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 4. ГЕНЕРАЦИЯ ПАКОВ (Версии Сани)
const versions = ["3.3", "3.2", "3.1", "3.0", "29000", "2.8", "2.5", "2.2", "2.0", "1.0"];
const grid = document.getElementById('main-grid');

if(grid) {
    grid.innerHTML = ""; // Чистим перед рендером
    versions.forEach(v => {
        grid.innerHTML += `
            <div class="pack-card glass-card" onclick="openPack('${v}', 'Kosmo Level')">
                <div class="thumb">${v === '29000' ? '⚡' : v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>
        `;
    });
}

// 5. УПРАВЛЕНИЕ ОКНАМИ
function toggleAI() { 
    if(ui) ui.classList.toggle('ai-hidden'); 
}

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-thumb').innerText = ver === '29000' ? '⚡' : ver;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}

function openAndAsk() {
    const ver = document.getElementById('modal-ver').innerText;
    closePack();
    if(ui.classList.contains('ai-hidden')) toggleAI();
    userInput.value = `Расскажи про пак версии ${ver}`;
    sendMessage();
}

// Закрытие меню при клике вне
document.addEventListener('click', (e) => {
    const drop = document.querySelector('.helpers-dropdown');
    const menu = document.getElementById('helpers-list');
    if (drop && !drop.contains(e.target) && menu) {
        menu.classList.add('hidden');
    }
});
