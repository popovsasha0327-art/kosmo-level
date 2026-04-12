// Поиск паков
function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');

    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

// Установка с анимацией
function startInstall(cardId) {
    const card = document.getElementById(cardId);
    const btn = card.querySelector('.install-btn');
    const progress = card.querySelector('.ring-progress');
    const fileUrl = btn.getAttribute('data-file');

    card.classList.add('installing');
    btn.textContent = "Загрузка...";
    btn.disabled = true;

    let percent = 0;
    const interval = setInterval(() => {
        percent += 2;
        progress.style.strokeDashoffset = 100 - percent;

        if (percent >= 100) {
            clearInterval(interval);
            
            // Запуск скачивания файла .worldpack
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => {
                card.classList.remove('installing');
                btn.textContent = "Готово";
                btn.style.backgroundColor = "#28a745";
                btn.disabled = false;
            }, 500);
        }
    }, 40);
}

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log("SW готов!"))
        .catch(err => console.log("Ошибка SW:", err));
}
