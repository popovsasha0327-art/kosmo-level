const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// 1. ССЫЛКИ ДЛЯ ПОМОЩНИКОВ
function openFastAssistant() {
    window.location.href = "demo.html";
}

function openRecoveryForm() {
    window.location.href = "titan.html";
}

// 2. ЛОГИКА ОРАКУЛА
async function sendMessage() {
    const input = document.getElementById('user-input');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    renderMessage('user', text);
    input.value = "";

    const tid = "think-" + Date.now();
    renderMessage('ai', 'Анализирую...', tid);

    try {
        const res = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await res.json();
        document.getElementById(tid).innerText = data.answer;
    } catch (e) {
        document.getElementById(tid).innerText = "Ошибка Штаба.";
    }
}

function renderMessage(role, text, id = null) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if(id) div.id = id;
    div.innerText = text;
    const hist = document.getElementById('chat-history');
    hist.appendChild(div);
    hist.scrollTop = hist.scrollHeight;
}

// 3. УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ
function toggleAI() { document.getElementById('ai-interface').classList.toggle('ai-hidden'); }
function toggleHelpers() { document.getElementById('helpers-list').classList.toggle('hidden'); }

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-thumb').innerText = ver === '29000' ? '⚡' : ver;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() { document.getElementById('pack-modal').classList.add('modal-hidden'); }

// 4. ИНИЦИАЛИЗАЦИЯ
document.addEventListener('DOMContentLoaded', () => {
    const vers = ["3.3", "3.2", "3.1", "3.0", "29000", "2.8", "2.5", "2.2", "2.0", "1.0"];
    const grid = document.getElementById('main-grid');
    if(grid) {
        vers.forEach(v => {
            grid.innerHTML += `<div class="pack-card glass-card" onclick="openPack('${v}', 'Kosmo Level')">
                <div class="thumb">${v === '29000' ? '⚡' : v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>`;
        });
    }
    
    document.getElementById('user-input').addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
});
