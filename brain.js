const vArr = ["3.3", "3.2", "3.1", "3.0", "2.9", "2.8", "2.5", "2.2", "2.0", "1.0"];

function toggleAI() {
    const ai = document.getElementById('ai-interface');
    ai.classList.toggle('ai-hidden');
}

function openPack(v, t) {
    document.getElementById('modal-ver').innerText = v;
    document.getElementById('modal-title').innerText = t;
    document.getElementById('pack-modal').classList.remove('modal-hidden');
}

function closePack() {
    document.getElementById('pack-modal').classList.add('modal-hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if(!text) return;

    addMsg('user', text);
    input.value = "";

    const id = "oracle-" + Date.now();
    addMsg('ai', "Оракул обрабатывает запрос...", id);

    // Здесь твоя логика API или заглушка
    setTimeout(() => {
        document.getElementById(id).innerText = "Штаб принял информацию. Саня, продолжаем разработку! 🛠";
    }, 1000);
}

function addMsg(role, text, id) {
    const chat = document.getElementById('chat-history');
    const d = document.createElement('div');
    d.className = `msg ${role}`;
    if(id) d.id = id;
    d.innerText = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
}

function openAndAsk() {
    const v = document.getElementById('modal-ver').innerText;
    closePack();
    const ai = document.getElementById('ai-interface');
    if(ai.classList.contains('ai-hidden')) toggleAI();
    addMsg('ai', `Вижу интерес к версии ${v}. Рассказать подробнее? 🛠`);
}

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('main-grid');
    if(grid) {
        vArr.forEach(v => {
            const card = document.createElement('div');
            card.className = "glass-card";
            card.onclick = () => openPack(v, 'Kosmo Level');
            card.innerHTML = `<h3 style="font-size: 24px; color: #007aff;">${v}</h3><p>Kosmo Level</p>`;
            grid.appendChild(card);
        });
    }
});
