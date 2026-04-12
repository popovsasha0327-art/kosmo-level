window.onload = function() {
    console.log("Проверка устройства началась!");
    console.log("Ваш User Agent:", navigator.userAgent);

    const btn = document.getElementById('magic-button');
    const info = document.getElementById('device-info');
    const ua = navigator.userAgent;

    if (/iPhone|iPad|iPod/i.test(ua)) {
        document.documentElement.classList.add('ios-theme');
        btn.textContent = "Я кнопка из iOS";
        info.textContent = "Ты зашел с Apple устройства!";
    } 
    else if (/Android/i.test(ua)) {
        document.documentElement.classList.add('android-theme');
        btn.textContent = "Я кнопка из Android";
        info.textContent = "Привет, пользователь Android!";
    } 
    else {
        btn.textContent = "Я кнопка для ПК";
        info.textContent = "Похоже, ты сидишь с компьютера.";
    }
};
