function openOracle() {
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
    alert("Оракул начал глубокий анализ запроса: " + query);
}

// Загрузка профиля
window.onload = () => {
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const rank = localStorage.getItem('LMSH_RANK');
    const userLink = document.getElementById('user-link');
    if (rank && userLink) {
        userLink.innerText = "Профиль (" + name[0].toUpperCase() + ")";
    }
};
