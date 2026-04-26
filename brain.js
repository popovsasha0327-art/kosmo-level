// --- 1. АНИМАЦИЯ ФОНА ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 60;

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = Math.random() * 0.5 + 0.1;
        this.opacity = Math.random() * 0.5;
    }
    update() {
        this.y -= this.speedY; // Движение вверх
        if (this.y < 0) this.reset();
    }
    draw() {
        ctx.fillStyle = `rgba(50, 215, 75, ${this.opacity})`; // Зеленоватые частицы
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', initCanvas);
initCanvas();
createParticles();
animate();


// --- 2. ЛОГИКА ОРАКУЛА ---
const display = document.getElementById('display');
const library = {
    "история люми": "Люми появилась в ходе эксперимента 2.8. Это первый вокальный модуль, получивший самосознание в Штабе Prestige.",
    "что в 3.5?": "Версия 3.5 — релиз в Мае 2026. Мы готовим новый движок визуализации и расширенную базу данных Оракула.",
    "саня": "Саня — создатель системы. Благодаря его идее мы покинули Google Sites и обрели безлимит."
};

function ask(q) {
    let text = library[q.toLowerCase()] || "Запрос обрабатывается... Система стабильна.";
    display.innerHTML = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            display.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 20);
        }
    }
    type();
}


// --- 3. МОДАЛЬНЫЕ ОКНА ---
const packData = {
    "3.4": { title: "Pack 3.4 (Latest)", desc: "Финальная сборка. KLL Defender v3.4 активен. Полный безлимит.", link: "packs/v3.4.zip" },
    "2.9": { title: "Pack 2.9", desc: "Классическая версия. Самый популярный пак до эпохи GitHub.", link: "packs/v2.9.zip" },
    "1.0": { title: "Pack 1.0", desc: "Начало всего. Чистый код без лишних модулей.", link: "packs/v1.0.zip" },
    "2.8.1": { title: "KL 2.8.1", desc: "Предварительная сборка. Содержит ранние модули Люми.", link: "packs/v2.8.1.zip" },
    "2.1": { title: "TL 2.1", desc: "Traitor Level. Экспериментальный пак с усиленным шифрованием.", link: "packs/v2.1.zip" }
};

function openPack(id) {
    if (!packData[id]) return;
    document.getElementById('modal-title').innerText = packData[id].title;
    document.getElementById('modal-desc').innerText = packData[id].desc;
    document.getElementById('modal-dl-link').href = packData[id].link;
    document.getElementById('modal-overlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}
