const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbwTGRx7v4Ri2r_3xMYeN873BdldGY2Lh2u7LpvJX9NKGNjmOsJNOLh-G-n9DulkLJbjHg/exec";
const ui = document.getElementById('ai-interface');

function toggleAI() {
    ui.classList.toggle('ai-hidden');
}

// Добавь в sendMessage очистку подсказки
async function sendMessage() {
    const text = document.getElementById('user-input').value;
    if (!text) return;
    document.getElementById('ai-hint').classList.remove('show'); // Скрываем подсказку после отправки
    // ... твой остальной код sendMessage ...
}
