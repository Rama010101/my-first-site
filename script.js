// ==========================================
// 1. ТЁМНАЯ ТЕМА
// ==========================================
const themeBtn = document.querySelector('#theme-toggle');

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            themeBtn.textContent = '☀️ Светлая тема';
        } else {
            themeBtn.textContent = '🌙 Тёмная тема';
        }
    });
}

// ==========================================
// 2. КНОПКА "ПРИВЕТСТВИЕ"
// ==========================================
const greetBtn = document.querySelector('#greet-btn');

if (greetBtn) {
    greetBtn.addEventListener('click', () => {
        let userName = prompt("Как тебя зовут?");
        if (userName) {
            alert("Привет, " + userName + "! Рад видеть тебя на моём сайте!");
        }
    });
}

// ==========================================
// 3. СЧЁТЧИК КЛИКОВ
// ==========================================
const clickBtn = document.querySelector('#click-btn');
const counterDisplay = document.querySelector('#click-count');
let count = 0;

if (clickBtn && counterDisplay) {
    clickBtn.addEventListener('click', () => {
        count = count + 1;
        counterDisplay.textContent = count;
    });
}

// ==========================================
// 4. TO-DO LIST С СОХРАНЕНИЕМ И СТАТУСОМ
// ==========================================
const todoInput = document.querySelector('#todo-input');
const todoAddBtn = document.querySelector('#todo-add-btn');
const todoList = document.querySelector('#todo-list');

// Загружаем задачи из localStorage (если есть) или создаем пустой массив
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// Функция для сохранения задач в localStorage
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Функция для отрисовки всех задач на странице
function renderTasks() {
    if (!todoList) return; // если на странице нет списка, выходим
    todoList.innerHTML = ''; // очищаем список перед отрисовкой

    tasks.forEach((task, index) => {
        // Проверяем формат: старый (строка) или новый (объект)
        let taskText = typeof task === 'string' ? task : task.text;
        let isCompleted = typeof task === 'object' ? task.completed : false;

        const li = document.createElement('li');
        if (isCompleted) {
            li.classList.add('completed'); // добавляем класс для зачёркивания
        }

        // Создаём текст задачи
        const span = document.createElement('span');
        span.textContent = taskText;

        // Создаём кнопку удаления
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';

        // Обработчик клика на текст задачи (переключение статуса)
        span.addEventListener('click', (e) => {
            e.stopPropagation(); 
            
            // Если задача была строкой, превращаем её в объект
            if (typeof tasks[index] === 'string') {
                tasks[index] = { text: tasks[index], completed: true };
            } else {
                // Если объект, просто переключаем статус
                tasks[index].completed = !tasks[index].completed;
            }
            
            saveTasks();
            renderTasks(); // перерисовываем список
        });

        // Обработчик удаления
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            tasks.splice(index, 1); // удаляем 1 элемент по индексу
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Добавление новой задачи
if (todoAddBtn && todoInput) {
    todoAddBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return alert('Напиши задачу!');

        // Сохраняем задачу как объект с полем completed
        tasks.push({ text: taskText, completed: false });
        
        saveTasks();
        renderTasks();
        todoInput.value = '';
        todoInput.focus();
    });

    // Добавление по Enter
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            todoAddBtn.click();
        }
    });
}

// Запускаем отрисовку при загрузке страницы
renderTasks();