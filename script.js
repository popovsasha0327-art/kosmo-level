// Переменные для отзывов
let currentRating = 0;
const formID = 'mvzdpwon';

// 1. Поиск паков
function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');
    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].querySelector('h3').innerText.toLowerCase();
        cards[i].style.display = title.includes(input) ? "" : "none";
    }
}

// 2. Установка пака
function startInstall(cardId) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const btn = card.querySelector('.install-btn');
    const progress = card.querySelector('.ring-progress');
    const fileUrl = btn.getAttribute('data-file');

    card.classList.add('installing');
    btn.textContent = "Загрузка...";
    btn.disabled = true;

    let percent = 0;
    const interval = setInterval(() => {
        percent += 2;
        if (progress) progress.style.strokeDashoffset = 100 - percent;
        if (percent >= 100) {
            clearInterval(interval);
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = '';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => {
                card.classList.remove('installing');
                btn.textContent = "Готово";
                btn.style.background = "#28a745";
                btn.disabled = false;
            }, 500);
        }
    }, 40);
}

// 3. Логика отзывов
function openReviewModal() {
    document.getElementById('review-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('review-modal').style.display = 'none';
}

function setRating(val) {
    currentRating = val;
    const stars = document.querySelectorAll('.star-rating-input span');
    stars.forEach((s, i) => {
        s.style.color = i < val ? '#ffca08' : '#ddd';
    });
}

function sendReview() {
    const name = document.getElementById('reviewer-name').value;
    const text = document.getElementById('review-text').value;

    if(!name || !text || currentRating === 0) {
        alert("Заполни все поля!");
        return;
    }

    fetch(`https://formspree.io/f/${formID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, rating: currentRating, message: text })
    }).then(() => {
        alert("Отзыв отправлен!");
        closeModal();
    }).catch(() => {
        alert("Ошибка отправки!");
    });
}

// 4. Service Worker (чтобы не было ошибок если файла нет)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
}
                btn.disabled = false;
            }, 500);
        }
    }, 40);
}

function openReviewModal() { document.getElementById('review-modal').style.display = 'block'; }
function closeModal() { document.getElementById('review-modal').style.display = 'none'; }

function setRating(val) {
    currentRating = val;
    const stars = document.querySelectorAll('.star-rating-input span');
    stars.forEach((s, i) => s.style.color = i < val ? '#ffca08' : '#ddd');
}

function sendReview() {
    const name = document.getElementById('reviewer-name').value;
    const text = document.getElementById('review-text').value;

    if(!name || !text || currentRating === 0) {
        alert("Заполни все поля!"); return;
    }

    fetch(`https://formspree.io/f/${formID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, rating: currentRating, message: text })
    }).then(() => {
        alert("Отзыв отправлен!");
        closeModal();
    });
}            document.body.removeChild(link)
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
});
}
