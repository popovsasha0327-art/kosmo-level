window.addEventListener('DOMContentLoaded', () => {
    // Проверка первого визита
    if (!localStorage.getItem('kosmo_visited')) {
        document.getElementById('oracle-tutorial').classList.remove('hidden');
    }
});

function closeTutorial() {
    // Анимация исчезновения в стиле IOS
    const tut = document.getElementById('oracle-tutorial');
    tut.style.transition = 'opacity 0.5s ease';
    tut.style.opacity = '0';
    setTimeout(() => {
        tut.classList.add('hidden');
        localStorage.setItem('kosmo_visited', 'true');
    }, 500);
}

function toggleAI() {
    const ai = document.getElementById('ai-interface');
    ai.classList.toggle('hidden');
}
