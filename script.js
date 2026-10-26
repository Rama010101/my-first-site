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
// === To-Do List с сохранением (localStorage) ===
const todoInput = document.querySelector('#todo-input');
const todoAddBtn = document.querySelector('#todo-add-btn');
const todoList = document.querySelector('#todo-list');

// 1. Загружаем задачи из localStorage (если есть) или создаем пустой массив
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 2. Функция для отрисовки всех задач на странице
function renderTasks() {
    todoList.innerHTML = ''; // очищаем список перед отрисовкой

    tasks.forEach((taskText, index) => {
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = taskText;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';
        
        // При клике на "Удалить" — удаляем задачу из массива и перерисовываем
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1); // удаляем 1 элемент по индексу
            saveTasks();            // сохраняем изменения
            renderTasks();          // перерисовываем
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// 3. Функция для сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// 4. Добавление новой задачи
todoAddBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText === '') return alert('Напиши задачу!');

    tasks.push(taskText); // добавляем в массив
    saveTasks();          // сохраняем
    renderTasks();        // перерисовываем
    todoInput.value = ''; // очищаем поле
    todoInput.focus();
});

// 5. Добавление по Enter
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        todoAddBtn.click();
    }
});

// 6. Запускаем отрисовку при загрузке страницы
renderTasks();