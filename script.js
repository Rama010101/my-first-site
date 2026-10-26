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
// === To-Do List (Список задач) ===
const todoInput = document.querySelector('#todo-input');
const todoAddBtn = document.querySelector('#todo-add-btn');
const todoList = document.querySelector('#todo-list');

// Функция для добавления задачи
todoAddBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim(); // получаем текст, убираем пробелы по краям

    // Если поле пустое — не добавляем
    if (taskText === '') {
        alert('Напиши задачу!');
        return;
    }

    // Создаём новый элемент <li>
    const li = document.createElement('li');
    
    // Создаём текст задачи
    const span = document.createElement('span');
    span.textContent = taskText;
    
    // Создаём кнопку удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'delete-btn';
    
    // Добавляем обработчик клика на кнопку удаления
    deleteBtn.addEventListener('click', () => {
        li.remove(); // удаляет весь <li> из списка
    });

    // Собираем всё вместе: <li><span>Текст</span><button>Удалить</button></li>
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Добавляем <li> в <ul>
    todoList.appendChild(li);

    // Очищаем поле ввода после добавления
    todoInput.value = '';
    todoInput.focus(); // возвращаем курсор в поле
});

// Бонус: добавлять задачу по нажатию Enter
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        todoAddBtn.click();
    }
});