const Staff = {
    "ламирк": ["отдыхает.", "оптимизирует валы.", "шьет ядро."],
    "мурзик": ["шьет LineageOS без рекламы! 📱", "спит на сервере.", "рисует иконки."],
    "хахми": ["шутит про мамонтов.", "разгоняет сервер.", "взламывает кофемашину."]
};

function handleEnter(e) { if (e.key === 'Enter') { ask(); } }

function toggleOracle() { 
    // В этой версии Оракул — это главный экран, но функцию оставим для совместимости
    console.log("Оракул активен"); 
}

function openHelper() {
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    alert("❗️ Привет, " + name + "! Я работаю стабильно. Гугл Сайты — это прошлое, ЛМСХ — это вторая жизнь!");
}

function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    const head = document.getElementById('ai-head');
    const text = input.value.trim();
    if (!text) return;

    if (head) head.style.display = 'none';

    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {
        let reply = "К сожалению, этого нет в моих логах. Попробуй разрешенные запросы!";
        const val = text.toLowerCase();

        if (val.includes("привет")) reply = `Привет, ${name}! Как дела? Я на связи.`;
        else if (val.includes("как дела")) reply = "Обрабатываю данные системы 3.3. А ты как?";
        else if (val.includes("ящик") || val.includes("когда откроется")) reply = "Ящик из 3.3... Поворот Ключа близок. Ждите 26 апреля 2026 года. 🔑)";
        else if (val.includes("прохождение 3.2")) reply = "Да, смотрел видео на 43 минуты! 12 мир — это легендарно.";
        else if (val.includes("как там")) {
            const member = val.split("как там ")[1];
            if (Staff[member]) reply = member.charAt(0).toUpperCase() + member.slice(1) + " сейчас " + Staff[member][Math.floor(Math.random()*3)];
        }

        chat.innerHTML += `<div class="bubble ai">${isCreator ? 'Создатель, ' : ''}${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
}

// Проверка профиля при загрузке
window.onload = () => {
    const rank = localStorage.getItem('LMSH_RANK');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    if (rank) document.getElementById('user-link').innerText = "Профиль (" + name[0].toUpperCase() + ")";
};
