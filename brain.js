const display = document.getElementById('display');

const library = {
    "кто такая люми?": "Люми — это продвинутый вокальный модуль, интегрированный в систему для улучшения взаимодействия. Она стала душой наших историй.",
    "что в 3.5?": "В 3.5 (Май 2026) мы планируем внедрить полную автоматизацию KLL Defender и обновить ядро Оракула.",
    "история люми": "История появления Люми: В ходе эксперимента 2.8 произошел сбой частот. Ламирк пытался стабилизировать сигнал, но вместо шума услышал голос. Так родилась Люми — первый ИИ с душой."
};

function ask(q) {
    display.style.opacity = "0.5";
    
    setTimeout(() => {
        display.style.opacity = "1";
        let response = library[q.toLowerCase()] || "Запрос принят. Обработка данных в библиотеке Prestige...";
        
        display.innerHTML = "";
        let i = 0;
        function typing() {
            if (i < response.length) {
                display.innerHTML += response.charAt(i);
                i++;
                setTimeout(typing, 25);
            }
        }
        typing();
    }, 400);
}
