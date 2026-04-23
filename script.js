// 1. ДАННЫЕ ШТАБА
const StaffActions = {
    "ламирк": ["отдыхает после калибровки серверов.", "оптимизирует ядро ЛМСХ-системы. ⚙️", "пьёт машинное масло и изучает чертежи."],
    "мурзик": ["отдыхает на системном блоке.", "перепрошивает телефон на LineageOS. Скрытность 100%! 📱", "настраивает Creator-панель."],
    "хахми": ["сочиняет шутки про Гугл Сайты.", "разгоняет валы сервера пафосными речами.", "пытается взломать кофемашину."]
};

// 2. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
window.onload = () => {
    const rank = localStorage.getItem('LMSH_RANK');
    if(rank === 'OVERLORD') {
        document.getElementById('login-link').innerText = "ПРОФИЛЬ (C)";
        renderCreatorMenu();
        showHelperMessage("Привет, Создатель! Я тут ещё отлично работаю. Гугл Сайты бы так не смогли! ❗️");
    }
};

// 3. ФУНКЦИИ CREATOR
function renderCreatorMenu() {
    const menu = document.getElementById('admin-nav');
    if(menu) {
        menu.innerHTML = `
            <div class="c-btn" onclick="alert('Форма управления данными')">(Creator) Форма</div>
            <div class="c-btn" onclick="alert('Доступ к ядру ИИ')">(Creator) Oracle AI</div>
        `;
    }
}

// 4. ОБРАБОТКА КОМАНД И ВОПРОСОВ
function sendMessage() {
    const input = document.getElementById('user-input');
    const text = input.value.trim();
    const chat = document.getElementById('chat');
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    if(!text) return;

    // Вывод текста пользователя
    chat.innerHTML += `<div class="msg user">${text}</div>`;

    // ПРОВЕРКА /EXEC ДЛЯ СОЗДАТЕЛЯ
    if(isCreator && text.startsWith('/exec ')) {
        try {
            eval(text.replace('/exec ', ''));
            chat.innerHTML += `<div class="msg ai">❗️ Код исполнен, Создатель! Валы крутятся.</div>`;
        } catch(e) {
            chat.innerHTML += `<div class="msg ai">❗️ Ошибка в коде: ${e.message}</div>`;
        }
    } 
    // ВОПРОСЫ О ШТАБЕ
    else if(text.toLowerCase().includes("как там")) {
        const name = text.toLowerCase().split("как там ")[1];
        if(StaffActions[name]) {
            const action = StaffActions[name][Math.floor(Math.random()*StaffActions[name].length)];
            chat.innerHTML += `<div class="msg ai">${isCreator ? 'Слушай, Создатель, ' : ''}${name} ${action}</div>`;
        }
    }
    
    input.value = "";
    chat.scrollTop = chat.scrollHeight;
}

function toggleOracle() {
    document.getElementById('oracle-modal').classList.toggle('hidden');
}

function showHelperMessage(msg) {
    console.log("Помощник шепчет: " + msg);
}
            body: JSON.stringify({ message: text })
        });
        
        history.innerHTML += `<div class="msg ai">Оракул: Команда принята (обработка в облаке...)</div>`;
    } catch (e) {
        history.innerHTML += `<div class="msg ai">Ошибка связи с Оракулом.</div>`;
    }
    
    history.scrollTop = history.scrollHeight;
}
