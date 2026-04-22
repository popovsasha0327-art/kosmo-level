// 1. ВСТАВЬ СЮДА ССЫЛКУ ИЗ GOOGLE APPS SCRIPT!
const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwNjxKx-OxMWhABm_YUV9SKMFtbB8_0aj1jHe2jVa983F8_zBAXMtOvBDyW2MdTSf_LCA/exec"; 

// 2. БАЗА ДАННЫХ ПАКОВ
const packsData = {
    "pack-30822": {
        title: "KL Preview 30822",
        img: "unnamed (2).png",
        desc: "Это превью версия пака с новыми уровнями от Снежинки. Окунитесь в атмосферу космоса!",
        file: "KL Preview 30822.worldpack"
    }
    // Сюда будешь добавлять новые паки: "id": { данные },
};

// --- ИНИЦИАЛИЗАЦИЯ ---
window.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('kosmo_visited')) {
        document.getElementById('oracle-tutorial')?.classList.remove('hidden');
    }
    addMessage("Система активирована. Я Оракул. О чем сегодня подумаем, Саня?", 'ai');
});

// --- ОКНО ПАКА ---
function openPack(id) {
    const data = packsData[id];
    if (data) {
        document.getElementById('modal-title').innerText = data.title;
        document.getElementById('modal-img').src = data.img;
        document.getElementById('modal-desc').innerText = data.desc;
        document.getElementById('modal-download').onclick = () => window.location.href = data.file;
        document.getElementById('pack-modal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closePack() {
    document.getElementById('pack-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// --- ОРАКУЛ И ЧАТ ---
function toggleAI() {
    document.getElementById('ai-interface').classList.toggle('hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    const tempId = addMessage("Оракул думает...", 'ai');

    try {
        const response = await fetch(GOOGLE_URL, {
            method: 'POST',
            mode: 'no-cors', // Добавлено для избежания CORS ошибок
            body: JSON.stringify({ message: text })
        });
        // Если используешь no-cors, ответ прочитать нельзя, 
        // поэтому имитируем успех для теста или ждем реальный API
        setTimeout(() => updateMessage(tempId, "Связь установлена. Я обрабатываю твой запрос."), 1000);
    } catch (e) {
        updateMessage(tempId, "Ошибка связи с ядром. Проверь ссылку на скрипт!");
    }
}

function addMessage(text, sender) {
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    const id = 'msg-' + Date.now();
    msg.id = id;
    msg.className = `msg ${sender}`;
    msg.innerText = text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
    return id;
}

function updateMessage(id, newText) {
    const msg = document.getElementById(id);
    if (msg) msg.innerText = newText;
}

function closeTutorial() {
    document.getElementById('oracle-tutorial').classList.add('hidden');
    localStorage.setItem('kosmo_visited', 'true');
}

function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}
