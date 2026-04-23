// --- 1. ЛОГИКА ОКНА ОРАКУЛА ---
function openOracle() {
    // Закрываем модалку скачивания, если она открыта
    closeDownloadModal();
    const modal = document.getElementById('oracle-modal');
    if(modal) modal.classList.remove('hidden');
}

function closeOracle() {
    const modal = document.getElementById('oracle-modal');
    if(modal) modal.classList.add('hidden');
}

function oracleProcess() {
    const query = document.getElementById('oracle-query').value;
    if(!query) return;
    alert("Оракул анализирует: " + query + "\n\nСтатус: Доступ запрещен. Требуется ключ 🔑)");
}

// --- 2. ЛОГИКА ОКНА СКАЧИВАНИЯ ---
function openDownloadModal(ver) {
    const modal = document.getElementById('download-modal');
    const verLabel = document.getElementById('modal-ver');
    if(verLabel) verLabel.innerText = ver;
    if(modal) modal.classList.remove('hidden');
}

function closeDownloadModal() {
    const modal = document.getElementById('download-modal');
    if(modal) modal.classList.add('hidden');
}

// --- 3. ЭПИЧЕСКАЯ ПОДСВЕТКА МЕНЮ (Каждые 2.5 минуты) ---
function initEpicHighlight() {
    const menu = document.getElementById('helpers-menu');
    if(!menu) return;

    setInterval(() => {
        // Активируем фиолетовый неон
        menu.classList.add('epic-purple');
        
        // Через 5 секунд возвращаем как было
        setTimeout(() => {
            menu.classList.remove('epic-purple');
        }, 5000);

    }, 150000); // 150 000 мс = 2 минуты 30 секунд
}

// --- 4. ЗАПУСК СИСТЕМЫ ---
window.onload = () => {
    initEpicHighlight();
    
    // Проверка профиля (Просто для красоты)
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const userLink = document.getElementById('user-link');
    if (userLink) {
        userLink.innerText = "Профиль (" + name[0].toUpperCase() + ")";
    }
};

// Закрытие модалок по клику на фон
window.onclick = function(event) {
    const oracle = document.getElementById('oracle-modal');
    const download = document.getElementById('download-modal');
    if (event.target == oracle) closeOracle();
    if (event.target == download) closeDownloadModal();
}
