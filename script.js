// ДАННЫЕ О КОМАНДЕ ШТАБА
const Staff = {
    "ламирк": ["отдыхает после смены.", "оптимизирует валы сервера.", "шьет кастомное ядро."],
    "мурзик": ["перепрошивает телефон на LineageOS. Реклама скрыта! 📱", "спит на сервере.", "рисует иконки для Сани."],
    "хахми": ["сочиняет шутки про мамонтов.", "взламывает кофеварку.", "разгоняет сервер смехом."]
};

// ЗАГРУЗКА ДАННЫХ
window.addEventListener('load', () => {
    const rank = localStorage.getItem('LMSH_RANK');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const userLink = document.getElementById('user-link');
    
    if(rank) {
        userLink.innerText = "Профиль (" + name[0].toUpperCase() + ")";
        if(rank === 'OVERLORD') {
            const adminNav = document.getElementById('admin-nav');
            if(adminNav) {
                adminNav.style.display = 'block';
                adminNav.innerHTML = `<span class="c-btn" onclick="location.href='titan.html'">(Creator) Форма</span> <span class="c-btn" onclick="alert('Запуск Оракула...')">(Creator) Oracle AI</span>`;
            }
        }
    }
});

// ФУНКЦИИ ИНТЕРФЕЙСА
function toggleOracle() { document.getElementById('oracle-modal').classList.toggle('hidden'); }

function openHelper() {
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    alert("❗️ Привет, " + name + "! Я тут отлично работаю. Гугл Сайты уже всё, а ЛМСХ — это вторая жизнь!");
}

function sendMessage() {
    const input = document.getElementById('user-input');
    const chat = document.getElementById('chat');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    if(!input.value.trim()) return;
    
    chat.innerHTML += `<div class="msg user">${input.value}</div>`;
    const val = input.value.toLowerCase();
    input.value = "";

    setTimeout(() => {
        let reply = "Слушаю тебя, " + name + ". Чем могу помочь?";
        
        if(val.includes("как там")) {
            const member = val.split("как там ")[1];
            if(Staff[member]) {
                reply = member.charAt(0).toUpperCase() + member.slice(1) + " сейчас " + Staff[member][Math.floor(Math.random()*Staff[member].length)];
            }
        }

        chat.innerHTML += `<div class="msg ai">${isCreator ? 'Создатель, ' : ''}${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 600);
}
