const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";

// Функция для перехода с учетом подпапки
function navigate(page) {
    // Автоматически определяет, нужно ли добавлять название репозитория
    const path = window.location.pathname.includes('kosmo-level') ? `/kosmo-level/${page}` : `/${page}`;
    window.location.href = path;
}

function openFastAssistant() { navigate("demo.html"); }
function openRecoveryForm() { navigate("titan.html"); }

function toggleAI() { document.getElementById('ai-interface').classList.toggle('ai-hidden'); }
function toggleHelpers() { document.getElementById('helpers-list').classList.toggle('hidden'); }

async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    renderMessage('user', text);
    input.value = "";
    const tid = "ai-" + Date.now();
    renderMessage('ai', "Оракул на связи...", tid);

    try {
        const res = await fetch(`${GOOGLE_URL}?q=${encodeURIComponent(text)}`);
        const data = await res.json();
        document.getElementById(tid).innerText = data.answer;
    } catch (e) {
        document.getElementById(tid).innerText = "Ошибка Штаба. Проверь сигнал.";
    }
}

function renderMessage(role, text, id) {
    const hist = document.getElementById('chat-history');
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    if(id) div.id = id;
    div.innerText = text;
    hist.appendChild(div);
    hist.scrollTop = hist.scrollHeight;
}

function openPack(ver, title) {
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-thumb').innerText = (ver === '3.4' || ver === 'X') ? '🔥' : ver;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() { document.getElementById('pack-modal').classList.add('modal-hidden'); }

function openStory(s) { alert("История " + s + " пока в обработке Ламирком!"); }

document.addEventListener('DOMContentLoaded', () => {
    const archive = ["3.3", "3.2", "3.1", "3.0", "2.8", "2.5", "2.0", "1.0"];
    const grid = document.getElementById('main-grid');
    if(grid) {
        archive.forEach(v => {
            grid.innerHTML += `<div class="pack-card glass-card" onclick="openPack('${v}', 'Kosmo Level')">
                <div class="thumb">${v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>`;
        });
    }
    document.getElementById('user-input')?.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMessage(); });
});
