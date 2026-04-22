const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNjxKx-OxMWhABm_YUV9SKMFtbB8_0aj1jHe2jVa983F8_zBAXMtOvBDyW2MdTSf_LCA/exec"; // Не забудь вставить свою!

function toggleAI() {
    document.getElementById('ai-interface').classList.toggle('hidden');
}

function toggleDropdown() {
    document.getElementById('ai-dropdown-content').classList.toggle('hidden');
}

function closeDropdown() {
    document.getElementById('ai-dropdown-content').classList.add('hidden');
}

// Закрытие меню при клике в любое другое место
window.onclick = function(event) {
    if (!event.target.closest('.dropdown')) {
        closeDropdown();
    }
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const text = input.value.trim();

    if (!text) return;

    // Показываем сообщение пользователя
    history.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = '';

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Важно для Google Scripts
            body: JSON.stringify({ message: text })
        });
        
        history.innerHTML += `<div class="msg ai">Оракул: Команда принята (обработка в облаке...)</div>`;
    } catch (e) {
        history.innerHTML += `<div class="msg ai">Ошибка связи с Оракулом.</div>`;
    }
    
    history.scrollTop = history.scrollHeight;
}
