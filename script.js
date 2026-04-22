// --- КОНФИГУРАЦИЯ И СОСТОЯНИЕ ---
const GOOGLE_URL = "ТВОЯ_ССЫЛКА_НА_ГАС"; // Сюда вставь ссылку от Ламирка

// --- ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ---
window.addEventListener('DOMContentLoaded', () => {
    // 1. Проверка первого визита для показа обучения
    if (!localStorage.getItem('kosmo_visited')) {
        const tutorial = document.getElementById('oracle-tutorial');
        if (tutorial) tutorial.classList.remove('hidden');
    }

    // 2. Приветствие от Оракула в чате
    const history = document.getElementById('chat-history');
    if (history) {
        setTimeout(() => {
            addMessage("Система активирована. Я Оракул, твой персональный ИИ. О чем сегодня подумаем, Саня?", 'ai');
        }, 1000);
    }
});

// --- СИСТЕМА ОБУЧЕНИЯ (ONBOARDING) ---
function closeTutorial() {
    const tut = document.getElementById('oracle-tutorial');
    if (tut) {
        // iOS-style исчезновение
        tut.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        tut.style.opacity = '0';
        setTimeout(() => {
            tut.classList.add('hidden');
            localStorage.setItem('kosmo_visited', 'true'); // Запоминаем выбор
        }, 500);
    }
}

// --- УПРАВЛЕНИЕ ОКНОМ ОРАКУЛА ---
function toggleAI() {
    const ai = document.getElementById('ai-interface');
    if (ai) {
        ai.classList.toggle('hidden'); // Показать/скрыть окно
        // Скрываем подсказку поиска, если открыли ИИ
        document.getElementById('ai-hint').classList.remove('show');
    }
}

// --- ПОИСК И ИНТЕГРАЦИЯ С ИИ ---
function searchPacks() {
    let input = document.getElementById('pack-search').value.toLowerCase();
    let cards = document.getElementsByClassName('pack-card');
    const hint = document.getElementById('ai-hint');

    // Если запрос длинный, Оракул предлагает помощь
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

    // Фильтрация карточек на главной
    for (let card of cards) {
        let title = card.querySelector('h3').innerText.toLowerCase();
        card.style.display = title.includes(input) ? "" : "none";
    }
}

// --- РАБОТА С ЧАТОМ ---
async function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    document.getElementById('ai-hint').classList.remove('show');

    // Имитация раздумий Оракула
    const tempId = addMessage("Оракул думает...", 'ai');

    try {
        const response = await fetch(GOOGLE_URL, {
            method: 'POST',
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        updateMessage(tempId, data.reply);
    } catch (e) {
        updateMessage(tempId, "Ошибка связи с ядром. Попробуй позже, Саня.");
    }
}

// --- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ЧАТА ---
function addMessage(text, sender) {
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    const id = 'msg-' + Date.now();
    msg.id = id;
    msg.className = `msg ${sender}`; // Добавляем класс ai или user
    msg.innerText = text;
    history.appendChild(msg);
    history.scrollTop = history.scrollHeight;
    return id;
}

function updateMessage(id, newText) {
    const msg = document.getElementById(id);
    if (msg) msg.innerText = newText;
}

// --- ОБРАБОТКА УСТАНОВКИ ---
function startInstall(btn) {
    // iOS-style отклик на кнопке
    btn.innerText = "Загрузка...";
    btn.classList.add('loading');
    
    setTimeout(() => {
        btn.innerText = "Готово";
        btn.style.background = "#34c759"; // Зеленый iOS
    }, 2000);
}

// Слушатель для кнопки Enter в чате
document.getElementById('user-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
