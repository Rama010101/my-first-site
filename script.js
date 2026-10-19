// 1. Находим кнопку на странице
const themeBtn = document.querySelector('#theme-toggle');

// 2. Добавляем "слушатель событий" (слушаем клик)
themeBtn.addEventListener('click', () => {
    
    // 3. Переключаем класс "dark-theme" на теге <body>
    document.body.classList.toggle('dark-theme');

    // 4. Меняем текст на кнопке в зависимости от темы
    if (document.body.classList.contains('dark-theme')) {
        themeBtn.textContent = '☀️ Светлая тема';
    } else {
        themeBtn.textContent = '🌙 Тёмная тема';
    }
});
// === Задание 1: Приветствие ===
const greetBtn = document.querySelector('#greet-btn');

greetBtn.addEventListener('click', () => {
    // 1. Спрашиваем имя (появится окошко ввода)
    let userName = prompt("Как тебя зовут?");
    
    // 2. Если пользователь нажал "Отмена" или ничего не ввел — не здороваемся
    if (userName) {
        // 3. Показываем приветствие
        alert("Привет, " + userName + "! Рад видеть тебя на моём сайте!");
    }
});
// === Задание 2: Счётчик кликов ===
const clickBtn = document.querySelector('#click-btn');
const counterDisplay = document.querySelector('#click-count');
let count = 0; // Начальное значение

clickBtn.addEventListener('click', () => {
    count = count + 1;           // Увеличиваем счётчик на 1
    counterDisplay.textContent = count; // Обновляем текст на странице
});