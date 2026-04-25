const API_URL = "https://script.google.com/macros/s/AKfycbzQM4EJJ9VWLJe0pbp3YhKQEGZyhKaN7kuqSPELtyVdc44nHTNAgMpa6xXx28IV8v1XcQ/exec";

function toggleAI() {
    const ui = document.getElementById('ai-interface');
    if(ui) ui.classList.toggle('ai-hidden');
}

async function sendMessage() {
    const input = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const val = input.value.trim();
    
    if (!val) return;

    addMsg('user', val);
    input.value = "";

    // Показываем индикатор загрузки
    const loader = document.createElement('div');
    loader.className = 'oracle-typing';
    loader.innerHTML = '<div class="t-ball"></div><div class="t-ball" style="animation-delay:0.2s"></div><div class="t-ball" style="animation-delay:0.4s"></div>';
    history.appendChild(loader);
    history.scrollTop = history.scrollHeight;

    try {
        const response = await fetch(`${API_URL}?q=${encodeURIComponent(val)}`);
        const data = await response.json();
        
        loader.remove();
        addMsg('ai', data.answer);
    } catch (e) {
        loader.remove();
        addMsg('ai', "Ошибка связи. Штаб недоступен. 🛠");
    }
}

function addMsg(type, text) {
    const history = document.getElementById('chat-history');
    const d = document.createElement('div');
    d.className = `msg ${type}`;
    d.innerText = text;
    history.appendChild(d);
    history.scrollTop = history.scrollHeight;
}

// Слушаем Enter
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
