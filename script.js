// =========================================
// ЧАСТЬ 1. ЛОГИКА ГЛАВНОГО ОРАКУЛА (image_0a8f23.png)
// =========================================

function handleEnter(e) {
    if (e.key === 'Enter') { ask(); }
}

function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    const head = document.getElementById('ai-head');
    
    const text = input.value.trim();
    if (!text) return;

    // Скрываем заголовок после первого вопроса
    if (head && head.style.display !== 'none') {
        head.style.opacity = '0';
        setTimeout(() => head.style.display = 'none', 300);
    }

    // Рендер сообщения пользователя
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Симуляция ответа Агента (через 700мс)
    setTimeout(() => {
        let reply = "К сожалению. Это значение не найдено в моих логах. Попробуйте, те которые разрешены на сайте. Или добавьте свой в предложенные ниже ИИ Окна";
        
        // Базовая логика ответов
        const val = text.toLowerCase();
        if(val.includes("привет")) {
            reply = "Привет! Как дела? Что-то хочешь узнать? Спрашивай если нужно, я всегда на связи.";
        } else if(val.includes("как дела")) {
            reply = "О, спасибо что спросил. Я в процессе обработки данных системы 3.3. А вы как?";
        } else if(val.includes("ящик")) {
            reply = "Тот самый ящик из 3.3... Он закрыт уже 5 месяцев. Поворот Ключа близок. Ждите 26 апреля 2026 года.";
        } else if(val.includes("12 империя")) {
            reply = "12 империя — это не конец. В версии 3.4 всё изменится. Готовы ли вы к раскрытию тайн Team2903?";
        } else if(val.includes("ты смотрел прохождение 3.2")) {
            reply = "Да, я смотрел это видео на 43 минуты! 12 мир, Зрители даже делали аналоги. Хочешь узнать Тайм Коды?";
        }

        chat.innerHTML += `<div class="bubble ai">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 700);
}


// =========================================
// ЧАСТЬ 2. ЛОГИКА ВКЛАДКИ "ПОМОЩНИКИ"
// =========================================

function toggleOracle() {
    // В этой версии Оракул — это главный экран, но функцию оставим для совместимости
    console.log("Оракул активен"); 
}

function openHelperAlert() {
    // Быстрый помощник из image_2.png
    alert("❗️ Быстрый помощник LMSH активен. Система работает стабильно.");
}


// =========================================
// ЧАСТЬ 3. ЛОГИКА ОКНА СКАЧИВАНИЯ (image_6.png style)
// =========================================

const modal = document.getElementById('download-modal');
const packChat = document.getElementById('pack-chat');

function openDownloadModal(packVersion) {
    // В будущем можно менять контент в зависимости от packVersion
    console.log("Открыто скачивание для " + packVersion);
    modal.classList.remove('hidden');
}

function closeDownloadModal() {
    modal.classList.add('hidden');
}

// Убираем модалку при клике на фон
modal.addEventListener('click', (e) => {
    if (e.target === modal) { closeDownloadModal(); }
});

function startPackDownload() {
    alert("🚀 Скачивание Kosmo Level 3.2 началось... Подготовка Пака.");
    // Тут в будущем будет реальная ссылка
}

// ОРАКУЛ ВНУТРИ ОКНА СКАЧИВАНИЯ
function askPackOracle() {
    const qInput = document.getElementById('pack-q');
    const qText = qInput.value.trim();
    if (!qText) return;

    // Юзер пишет
    packChat.innerHTML += `<div class="msg user">${qText}</div>`;
    qInput.value = "";
    packChat.scrollTop = packChat.scrollHeight;

    // Оракул поясняет
    setTimeout(() => {
        let aiReply = "Анализирую данные по Паку 3.2 Circle...";
        
        const qVal = qText.toLowerCase();
        if(qVal.includes("поясни") || qVal.includes("12 мир")) {
            aiReply = "В 3.2 Beta 12 мир легендарен из-за концовки. Это была тестовая зона Circle. Саша это проходил в бете.";
        } else if(qVal.includes("баги")) {
            aiReply = "Внимание: Версия Beta. Возможны краши при переходе к Ящику. Team2903 это исправили только в 3.3.";
        }

        packChat.innerHTML += `<div class="msg ai">${aiReply}</div>`;
        packChat.scrollTop = packChat.scrollHeight;
    }, 600);
}
