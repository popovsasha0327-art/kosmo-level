// CONFIG — ТВОЙ ГУГЛ СКРИПТ
const API_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// Список версий для автоматического построения архива
const vArr = ["3.3", "3.2", "3.1", "3.0", "2.9", "2.8", "2.5", "2.2", "2.0", "1.0"];

// --- УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ ---
function toggleAI() {
    const ai = document.getElementById('ai-interface');
    if (ai) ai.classList.toggle('ai-hidden');
}

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}

// --- ЛОГИКА ОРАКУЛА (СВЯЗЬ С ГУГЛОМ) ---
async function sendMessage() {
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if (!val) return;

    addMsg('user', val); // Твоё сообщение (синее, справа)
    input.value = "";
    
    const id = "ai-" + Date.now();
    addMsg('ai', "Оракул настраивает частоту...", id); // Ответ ИИ (серое, слева)

    try {
        // Отправка запроса в Google Apps Script
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        const data = await response.json();
        
        const aiMsgElement = document.getElementById(id);
        if (aiMsgElement) {
            aiMsgElement.innerText = data.answer || "Штаб прислал пустой ответ...";
        }
    } catch (e) {
        const aiMsgElement = document.getElementById(id);
        if (aiMsgElement) {
            aiMsgElement.innerText = "Ошибка связи со Штабом. Проверь щитки! 🛠";
        }
    }
}

function addMsg(role, text, id) {
    const history = document.getElementById('chat-history');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${role}`;
    if(id) msgDiv.id = id;
    msgDiv.innerText = text;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
}

// Связка пака и Оракула
function openAndAsk() {
    const title = document.getElementById('modal-title').innerText;
    const ver = document.getElementById('modal-ver').innerText;
    closePack();
    
    const ai = document.getElementById('ai-interface');
    if(ai.classList.contains('ai-hidden')) toggleAI();
    
    setTimeout(() => {
        addMsg('ai', `Анализирую данные по ${title} v${ver}. Что именно тебя интересует? 🛠`);
    }, 500);
}

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('main-grid');
    if(grid) {
        vArr.forEach(v => {
            const card = document.createElement('div');
            card.className = "glass-card";
            card.onclick = () => openPack(v, 'Kosmo Level');
            card.innerHTML = `
                <h3 style="font-size: 24px; color: #007aff; margin-bottom: 5px;">${v}</h3>
                <p style="font-size: 12px; opacity: 0.7;">Kosmo Level</p>
            `;
            grid.appendChild(card);
        });
    }

    // Слушатель Enter для чата
    document.getElementById('user-input')?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
});
