// Поиск
function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');

    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

// Анимация установки
function startInstall(cardId) {
    const card = document.getElementById(cardId);
    const btn = card.querySelector('.install-btn');
    const progress = card.querySelector('.ring-progress');

    card.classList.add('installing');
    btn.textContent = "Загрузка...";
    btn.disabled = true;

    let percent = 0;
    const interval = setInterval(() => {
        percent += 2;
        progress.style.strokeDashoffset = 100 - percent;

        if (percent >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                card.classList.remove('installing');
                btn.textContent = "Открыть";
                btn.disabled = false;
                btn.style.backgroundColor = "#34c759"; // Зеленый цвет
            }, 500);
        }
    }, 40); // Скорость загрузки
}
