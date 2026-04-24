// --- КОНФИГУРАЦИЯ ---
const API_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// --- НАВИГАЦИЯ И УПРАВЛЕНИЕ ---
function smartNav(page) {
    // Авто-определение пути для GitHub Pages (подпапка /kosmo-level/)
    const isSubfolder = window.location.pathname.includes('kosmo-level');
    const target = isSubfolder ? `/kosmo-level/${page}` : `/${page}`;
    window.location.href = target;
}

function openFastAssistant() { smartNav("demo.html"); }
function openRecoveryForm() { smartNav("titan.html"); }

function toggleAI() { 
    document.getElementById('ai-interface').classList.toggle('ai-hidden'); 
}

function toggleHelpers() { 
    document.getElementById('helpers-list').classList.toggle('hidden'); 
}

// --- ЛОГИКА ОРАКУЛА ---
async function sendMessage() {
    const input = document.getElementById('user-input');
    const val = input.value.trim();
    if (!val) return;

    addMsg('user', val);
    input.value = "";
    
    const id = "ai-" + Date.now();
    addMsg('ai', "Оракул обрабатывает запрос...", id);

    try {
        const r = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        const d = await r.json();
        document.getElementById(id).innerText = d.answer;
    } catch {
        document.getElementById(id).innerText = "Ошибка связи со Штабом. Проверь щитки!";
    }
}

function addMsg(role, text, id) {
    const h = document.getElementById('chat-history');
    const d = document.createElement('div');
    d.className = `msg ${role}`;
    if(id) d.id = id;
    d.innerText = text;
    h.appendChild(d);
    h.scrollTop = h.scrollHeight;
}

// --- ФУНКЦИЯ "СПРОСИТЬ О ПАКЕ" (ФИКС КОНСОЛИ) ---
function openAndAsk() {
    const packTitle = document.getElementById('modal-title').innerText;
    const packVer = document.getElementById('modal-ver').innerText;
    
    // 1. Закрываем модалку пака
    closePack();
    
    // 2. Открываем Оракула
    const ai = document.getElementById('ai-interface');
    if (ai.classList.contains('ai-hidden')) {
        toggleAI();
    }
    
    // 3. Оракул начинает диалог
    setTimeout(() => {
        addMsg('ai', `Вижу, тебя интересует ${packTitle} версии ${packVer}. Что именно рассказать об этом обновлении? 🛠`);
    }, 500);
}

// --- МОДАЛКА ПАКОВ ---
function openPack(v, t) {
    document.getElementById('modal-ver').innerText = v;
    document.getElementById('modal-title').innerText = t;
    // Если версия 3.4, ставим огонек
    document.getElementById('modal-thumb').innerText = (v === '3.4') ? '🔥' : v;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() { 
    document.getElementById('pack-modal').classList.add('modal-hidden'); 
}

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
document.addEventListener('DOMContentLoaded', () => {
    // Генерация архива
    const vArr = ["3.3", "3.2", "3.1", "3.0", "2.8", "2.5", "2.0", "1.0"];
    const grid = document.getElementById('main-grid');
    
    if(grid) {
        vArr.forEach(v => {
            const card = document.createElement('div');
            card.className = "pack-card glass-card";
            card.onclick = () => openPack(v, 'Kosmo Level');
            card.innerHTML = `
                <div class="thumb" style="font-size:1.5rem; margin:15px 0;">${v}</div>
                <h4 style="font-size:0.8rem; padding-bottom:15px;">Kosmo Level ${v}</h4>
            `;
            grid.appendChild(card);
        });
    }

    // Обработка Enter в инпуте ИИ
    document.getElementById('user-input')?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
});

// --- СЕКЦИЯ STORIES ---
function openStory(type) {
    alert("Ламирк готовит эксклюзивный контент для истории: " + type);
}
