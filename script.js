function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');
    const hint = document.getElementById('ai-hint');

    // Логика подсказки ИИ
    if (input.length > 10) {
        hint.classList.add('show');
        hint.innerHTML = `🔮 Спросить Оракула про "<strong>${input}</strong>"?`;
        hint.onclick = () => {
            toggleAI();
            document.getElementById('user-input').value = input;
            sendMessage();
        };
    } else {
        hint.classList.remove('show');
    }

    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

function startInstall(cardId) {
    const btn = document.querySelector(`#${cardId} .install-btn`);
    btn.textContent = "Загрузка...";
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = "Готово";
        btn.style.background = "#28a745";
    }, 2000);
}
