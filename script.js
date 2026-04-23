// База данных персонала
const Staff = {
    "ламирк": "оптимизирует сервер.",
    "мурзик": "шьет систему.",
    "хахми": "взламывает систему смехом."
};

window.onload = () => {
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const rank = localStorage.getItem('LMSH_RANK');
    const userLink = document.getElementById('user-link');
    if (rank && userLink) {
        userLink.innerText = "Профиль (" + name[0].toUpperCase() + ")";
    }
};

// Функция для Быстрого Помощника (Агента)
function openAgent() {
    window.location.href = 'demo.html';
}

// Функция для продвинутого Оракула
function openOracle() {
    // Здесь будет ссылка на отдельный продвинутый ИИ
    window.location.href = 'oracle_adv.html';
}
