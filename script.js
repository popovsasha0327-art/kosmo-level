// ДАННЫЕ ШТАБА
const Staff = {
    "ламирк": ["отдыхает в тени сервера.", "оптимизирует валы престижа.", "занят прошивкой."],
    "мурзик": ["шьет LineageOS без рекламы. 📱", "рисует чертежи для Сани.", "спит на теплом роутере."],
    "хахми": ["взламывает систему смехом.", "шутит про мамонтов.", "готовит кофе для ИИ."]
};

// 1. ПРОВЕРКА ПРОФИЛЯ (При загрузке любой страницы)
window.addEventListener('DOMContentLoaded', () => {
    const rank = localStorage.getItem('LMSH_RANK');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const userLink = document.getElementById('user-link');
    
    if (rank && userLink) {
        userLink.innerText = `Профиль (${name[0].toUpperCase()})`;
        userLink.classList.add('logged-in');
    }
});

// 2. ЛОГИКА ОРАКУЛА (Для demo.html)
function handleEnter(e) {
    if (e.key === 'Enter') { ask(); }
}

function ask() {
    const input = document.getElementById('ai-q');
    const chat = document.getElementById('chat');
    const head = document.getElementById('ai-head');
    const text = input.value.trim();
    
    if (!text) return;

    // Прячем заголовок после первого вопроса
    if (head) head.style.display = 'none';

    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    // Сообщение пользователя
    chat.innerHTML += `<div class="bubble user">${text}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Ответ Оракула
    setTimeout(() => {
        let reply = "К сожалению, данные по этому запросу отсутствуют в логах LMSH. Попробуйте ключевые слова: 'Ящик', '3.2', 'Привет'.";
        const val = text.toLowerCase();

        if (val.includes("привет")) {
            reply = `Привет, ${name}! Как настрой? Я готов к работе.`;
        } 
        else if (val.includes("как дела")) {
            reply = "Статус системы: 100% стабильности. Обрабатываю данные версии 3.3. А как твои успехи?";
        } 
        else if (val.includes("ящик") || val.includes("когда откроется")) {
            reply = "Ящик из 3.3... Ключ повернется 26 апреля 2026 года. Ожидайте. 🔑)";
        } 
        else if (val.includes("прохождение 3.2")) {
            reply = "О, легендарное видео на 43 минуты! 12 мир в Beta 3.2 изменил всё. Хочешь пересказ?";
        }
        else if (val.includes("как там")) {
            const member = val.split("как там ")[1];
            if (Staff[member]) {
                reply = `${member.charAt(0).toUpperCase() + member.slice(1)} сейчас ${Staff[member][Math.floor(Math.random()*3)]}`;
            }
        }

        let prefix = isCreator ? "Создатель, " : "";
        chat.innerHTML += `<div class="bubble ai">${prefix}${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 650);
}

// 3. ФУНКЦИЯ БЫСТРОГО ПОМОЩНИКА
function openHelper() {
    // Просто перенаправляем на страницу с Оракулом
    window.location.href = 'demo.html';
}

function toggleOracle() {
    // Если на главной нажать на Оракула в меню
    window.location.href = 'demo.html';
}
