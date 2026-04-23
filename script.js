// ДАННЫЕ О КОМАНДЕ
const Staff = {
    "ламирк": ["отдыхает.", "крутит валы сервера.", "шьет кастом."],
    "мурзик": ["шьет LineageOS.", "рисует иконки.", "спит."],
    "хахми": ["шутит.", "взламывает кофеварку.", "поет."]
};

window.onload = () => {
    const rank = localStorage.getItem('LMSH_RANK');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const userLink = document.getElementById('user-link');
    
    if(rank) {
        userLink.innerText = "Профиль (" + name[0] + ")";
        if(rank === 'OVERLORD') renderCreatorMenu();
    }
};

function toggleOracle() { document.getElementById('oracle-modal').classList.toggle('hidden'); }

function sendMessage() {
    const input = document.getElementById('user-input');
    const chat = document.getElementById('chat');
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    const isCreator = localStorage.getItem('LMSH_RANK') === 'OVERLORD';

    if(!input.value) return;
    chat.innerHTML += `<div class="msg user">${input.value}</div>`;
    
    let reply = "Привет, " + name + "! Как дела?";
    if(input.value.toLowerCase().includes("как там")) {
        const member = input.value.toLowerCase().split("как там ")[1];
        if(Staff[member]) reply = member + " сейчас " + Staff[member][Math.floor(Math.random()*3)];
    }

    setTimeout(() => {
        chat.innerHTML += `<div class="msg ai">${isCreator ? 'Создатель, ' : ''}${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    }, 500);
    input.value = "";
}

function openHelper() {
    const name = localStorage.getItem('LMSH_NAME') || "Агент";
    alert("❗️ Привет, " + name + "! Я тут отлично работаю. Гугл Сайты уже всё, а ЛМСХ — это вторая жизнь!");
}

function renderCreatorMenu() {
    const nav = document.getElementById('admin-nav');
    if(nav) {
        nav.style.display = 'block';
        nav.innerHTML = `<span class="c-btn" onclick="alert('Код...')">/EXEC</span> <span class="c-btn" onclick="location.href='titan.html'">(Creator) Форма</span>`;
    }
}
