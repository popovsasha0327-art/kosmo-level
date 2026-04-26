// --- 1. АНИМАЦИЯ ФОНА (PARTICLES) ---
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    const initCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speedY = Math.random() * 0.4 + 0.1;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(50, 215, 75, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animate();
}

// --- 2. БАЗА ДАННЫХ ПАКОВ ---
const packData = {
    "3.4": { title: "Kosmo Level 3.4", desc: "Текущая версия. Полный переезд на GitHub, KLL Defender и снятие всех лимитов Оракула.", link: "packs/v3.4.zip" },
    "3.3": { title: "Kosmo Level 3.3", desc: "Улучшенная стабильность и новый интерфейс в стиле Prestige.", link: "packs/v3.3.zip" },
    "2.9": { title: "Kosmo Level 2.9", desc: "Последняя великая версия эпохи Google Sites. Золотой стандарт.", link: "packs/v2.9.zip" },
    "2.8": { title: "Kosmo Level 2.8", desc: "Версия, подарившая нам Люми и первые вокальные модули.", link: "packs/v2.8.zip" },
    "2.5": { title: "Kosmo Level 2.5", desc: "Глубокая оптимизация ядра и усиление защиты данных.", link: "packs/v2.5.zip" },
    "2.2": { title: "Kosmo Level 2.2", desc: "Мобильная адаптация и исправление критических багов.", link: "packs/v2.2.zip" },
    "2.0": { title: "Kosmo Level 2.0", desc: "Второе поколение проекта с полностью переписанным кодом.", link: "packs/v2.0.zip" },
    "1.0": { title: "Kosmo Level 1.0", desc: "Оригинальный Kosmo Level. С этого файла началась история.", link: "packs/v1.0.zip" }
};

// --- 3. ИНТЕЛЛЕКТ ОРАКУЛА ---
function ask(q) {
    const display = document.getElementById('display');
    const library = {
        "история люми": "Люми зародилась в коде версии 2.8. Она стала первым ИИ-вокалом, способным на диалог.",
        "версии": "В архиве 8 версий Kosmo Level. Самая стабильная — 2.9, самая мощная — 3.4.",
        "планы на 3.5": "3.5 принесет полную нейросетевую интеграцию. Ждите в середине мая 2026 года.",
        "саня": "Саня — архитектор этого мира. Благодаря ему мы сегодня на GitHub."
    };

    let text = library[q.toLowerCase()] || "Запрос принят. Анализирую архивные данные Prestige...";
    display.innerHTML = "";
    let i = 0;
    const type = () => {
        if (i < text.length) {
            display.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 25);
        }
    };
    type();
}

// --- 4. УПРАВЛЕНИЕ МОДАЛКОЙ ---
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
