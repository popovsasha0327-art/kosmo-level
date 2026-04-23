// --- 1. СИСТЕМА СОХРАНЕНИЯ ПРОФИЛЯ ---
// Чтобы сохранить данные "навсегда" в браузере, используем localStorage.

function changeProfile() {
    const newName = prompt("Введите имя Агента штаба:");
    if (newName) {
        localStorage.setItem('LMSH_USER_NAME', newName); // Сохраняем
        updateProfileUI();
    }
}

function updateProfileUI() {
    const savedName = localStorage.getItem('LMSH_USER_NAME') || "Агент";
    const btn = document.getElementById('user-link');
    if (btn) btn.innerText = `Профиль (${savedName[0].toUpperCase()})`;
}

// --- 2. УПРАВЛЕНИЕ ОКНАМИ (MODALS) ---
function openDownloadModal(ver, title) {
    const modal = document.getElementById('download-modal');
    document.getElementById('modal-ver').innerText = ver;
    document.getElementById('modal-title').innerText = "Kosmo Level " + title;
    modal.classList.remove('hidden');
}

function closeDownloadModal() {
    document.getElementById('download-modal').classList.add('hidden');
}

// --- 3. ЭПИЧЕСКАЯ ПОДСВЕТКА (2:30) ---
setInterval(() => {
    const menu = document.getElementById('helpers-menu');
    menu.classList.add('epic-purple');
    setTimeout(() => menu.classList.remove('epic-purple'), 5000);
}, 150000);

// --- 4. ЗАПУСК ПРИ ЗАГРУЗКЕ ---
window.onload = () => {
    updateProfileUI();
    // Тут можно добавить загрузку истории чата из localStorage.getItem('CHAT_HISTORY')
};
