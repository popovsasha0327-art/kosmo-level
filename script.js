let currentRating = 0;
const formID = 'mvzdpwon';

function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

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
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = '';
            link.click();
            setTimeout(() => {
                card.classList.remove('installing');
                btn.textContent = "Готово";
                btn.style.background = "#28a745";
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
