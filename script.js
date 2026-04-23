// 1. ДАННЫЕ ШТАБА ЛМСХ
const StaffActions = {
    "ламирк": [
        "сейчас отдыхает после калибровки серверов.",
        "работает над оптимизацией валов... не отвлекай его!",
        "пьёт машинное масло и изучает твои чертежи."
    ],
    "мурзик": [
        "занята делом: перепрошивает телефон на LineageOS. Скрытность — наше всё! 📱",
        "сейчас отдыхает, свернувшись клубком на системном блоке.",
        "настраивает твою (Creator) панель."
    ],
    "хахми": [
        "сочиняет новые шутки про мамонтов и Гугл Сайты.",
        "разгоняет валы сервера пафосными речами!",
        "пытается взломать кофемашину Штаба."
    ]
};

// 2. ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ
document.addEventListener('DOMContentLoaded', () => {
    const rank = localStorage.getItem('LMSH_RANK');
    const loginLink = document.getElementById('login-link');
    
    if (rank === 'OVERLORD') {
        if(loginLink) loginLink.innerText = "СОЗДАТЕЛЬ (C)";
        renderCreatorMenu();
        console.log("Система: Вход Создателя подтвержден.");
    }
});

// 3. ФУНКЦИИ ОРАКУЛА
function toggleOracle() {
    const modal = document.getElementById('oracle-modal');
    modal.classList.toggle('hidden');
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chat = document.getElementById('chat');
    const text = input.value.trim();
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    if (!text) return;

    // Сообщение пользователя
    chat.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";

    // ОТВЕТ ИИ
    setTimeout(() => {
        let response = "";

        // Проверка на команды Создателя
        if (isCreator && text.startsWith('/exec ')) {
            try {
                const code = text.replace('/exec ', '');
                eval(code);
                response = "❗️ Код исполнен успешно, Создатель! Валы крутятся в такт твоим идеям.";
            } catch (e) {
                response = `❗️ Ошибка в коде: ${e.message}. Ламирк уже бежит исправлять!`;
            }
        } 
        // Вопросы про команду
        else if (text.toLowerCase().includes("как там")) {
            const name = text.toLowerCase().split("как там ")[1];
            if (StaffActions[name]) {
                const action = StaffActions[name][Math.floor(Math.random() * StaffActions[name].length)];
                response = `${isCreator ? 'Слушай, Создатель, ' : ''}${name.charAt(0).toUpperCase() + name.slice(1)} ${action}`;
            } else {
                response = "В Штабе такого агента нет, но я могу его поискать!";
            }
        }
        else {
            response = isCreator ? "Да, Создатель? Я на связи и готов к работе." : "Я Оракул. Чем могу помочь, агент?";
        }

        chat.innerHTML += `<div class="msg ai">${response}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);
}

// 4. ФУНКЦИИ ПОМОЩНИКА
function openHelper() {
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';
    const msg = isCreator 
        ? "❗️ Привет, Создатель! Я тут ещё отлично работаю. Гугл Сайты уже всё — они бы такого не смогли. Но Штаб ЛМСХ просто лучший, создал для нас вторую жизнь!"
        : "❗️ Система работает стабильно. Мамонты под контролем.";
    
    alert(msg); // Позже заменим на красивое облачко текста
}

// 5. ПАНЕЛЬ СОЗДАТЕЛЯ
function renderCreatorMenu() {
    const adminNav = document.getElementById('admin-nav');
    if (adminNav) {
        adminNav.style.display = 'block';
        adminNav.innerHTML = `
            <div class="c-btn" onclick="window.location.href='titan.html'">(Creator) Форма</div>
            <div class="c-btn" onclick="alert('Доступ к ядру активирован')">(Creator) Oracle AI</div>
            <div class="c-btn" onclick="alert('Скачивание Пака 30822...')">(Creator) Пак 30822</div>
        `;
    }
}
