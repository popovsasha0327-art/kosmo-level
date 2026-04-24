// CONFIG
const API_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// Список версий для автоматического построения архива
const vArr = ["3.3", "3.2", "3.1", "3.0", "2.9", "2.8", "2.5", "2.2", "2.0", "1.0"];

// --- УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ ---
function toggleAI() {
    document.getElementById('ai-interface').classList.toggle('ai-hidden');
}

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}

// --- ЛОГИКА ОРАКУЛА ---
async function sendMessage() {
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if (!val) return;

    addMsg('user', val); // Твоё сообщение (справа)
    input.value = "";
    
    const id = "ai-" + Date.now();
    addMsg('ai', "Оракул думает...", id); // Ответ ИИ (слева)

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        const data = await response.json();
        document.getElementById(id).innerText = data.answer;
    } catch (e) {
        document.getElementById(id).innerText = "Ошибка связи. Штаб перегружен!";
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
    if(document.getElementById('ai-interface').classList.contains('ai-hidden')) toggleAI();
    
    setTimeout(() => {
        addMsg('ai', `Вижу, тебя интересует ${title} v${ver}. Чем я могу помочь? 🛠`);
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
                <h3 class="v-num">${v}</h3>
                <p>Kosmo Level</p>
            `;
            grid.appendChild(card);
        });
    }

    // Слушатель Enter для чата
    document.getElementById('user-input')?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
});
