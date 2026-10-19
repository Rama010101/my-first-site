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