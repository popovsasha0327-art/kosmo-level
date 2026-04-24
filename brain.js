// Функция-мостик между паком и Оракулом
function openAndAsk() {
    const packTitle = document.getElementById('modal-title').innerText;
    const packVer = document.getElementById('modal-ver').innerText;
    
    // Закрываем модалку пака
    closePack();
    
    // Открываем Оракула, если он закрыт
    const ai = document.getElementById('ai-interface');
    if (ai.classList.contains('ai-hidden')) {
        toggleAI();
    }
    
    // Оракул сам начинает диалог о паке
    setTimeout(() => {
        addMsg('ai', `Вижу, тебя интересует ${packTitle} версии ${packVer}. Что именно хочешь узнать? 🛠`);
    }, 400);
}
