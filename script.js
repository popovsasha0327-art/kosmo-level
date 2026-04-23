// 1. ГЕНЕРАЦИЯ ПАКОВ
const packVersions = ["3.3", "3.2", "3.1", "3.0", "29000", "2.8", "2.5", "2.2", "2.0", "1.0"];
const grid = document.getElementById('main-packs-grid');

if(grid) {
    packVersions.forEach(v => {
        grid.innerHTML += `
            <div class="card" onclick="showPack('${v}', 'Kosmo Level', 'pack.png')">
                <div class="card-thumb ${v === '3.3' ? 'epic-border' : ''}">${v}</div>
                <h3>Kosmo Level ${v}</h3>
            </div>
        `;
    });
}

// 2. ИНСТРУКЦИЯ ПО СОХРАНЕНИЮ (ПРОФИЛЬ)
function handleProfile() {
    const current = localStorage.getItem('user_name') || "Агент";
    const name = prompt("Введите имя профиля:", current);
    if(name) {
        localStorage.setItem('user_name', name);
        updateUI();
    }
}

function updateUI() {
    const name = localStorage.getItem('user_name') || "Агент";
    document.getElementById('profile-btn').innerText = `Профиль (${name[0].toUpperCase()})`;
}

// 3. СОХРАНЕНИЕ ЧАТА (ОРАКУЛ)
let chatHistory = JSON.parse(localStorage.getItem('oracle_chat')) || [
    {role: 'ai', text: 'Здравствуйте! Я Агент из Oracle. Чем помочь?'}
];

function sendMessage() {
    const input = document.getElementById('user-input');
    if(!input.value) return;

    chatHistory.push({role: 'user', text: input.value});
    // Ответ ИИ
    chatHistory.push({role: 'ai', text: 'Запрос принят. Анализирую данные 3.3...'});
    
    localStorage.setItem('oracle_chat', JSON.stringify(chatHistory));
    input.value = '';
    renderChat();
}

function renderChat() {
    const box = document.getElementById('chat-box');
    if(!box) return;
    box.innerHTML = chatHistory.map(m => `
        <div class="msg ${m.role}">${m.text}</div>
    `).join('');
    box.scrollTop = box.scrollHeight;
}

// 4. ТАЙМЕР ЭПИКА (2:30)
setInterval(() => {
    const menu = document.getElementById('helpers-menu');
    menu.classList.add('epic-flash');
    setTimeout(() => menu.classList.remove('epic-flash'), 5000);
}, 150000);

// 5. МОДАЛКИ
function showPack(ver, name) {
    document.getElementById('modal-version').innerText = ver;
    document.getElementById('modal-name').innerText = name;
    document.getElementById('pack-modal').classList.remove('hidden');
}
function closePack() { document.getElementById('pack-modal').classList.add('hidden'); }
function openOracle() { 
    document.getElementById('oracle-window').classList.remove('hidden');
    renderChat();
}
function closeOracle() { document.getElementById('oracle-window').classList.add('hidden'); }

window.onload = updateUI;
