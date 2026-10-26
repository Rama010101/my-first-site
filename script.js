// ==========================================
// 1. ТЁМНАЯ ТЕМА
// ==========================================
const themeBtn = document.querySelector('#theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeBtn.textContent = document.body.classList.contains('dark-theme') ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    });
}

// ==========================================
// 2. КНОПКА "ПРИВЕТСТВИЕ"
// ==========================================
const greetBtn = document.querySelector('#greet-btn');
if (greetBtn) {
    greetBtn.addEventListener('click', () => {
        let userName = prompt("Как тебя зовут?");
        if (userName) alert("Привет, " + userName + "! Рад видеть тебя на моём сайте!");
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
        count++;
        counterDisplay.textContent = count;
    });
}

// ==========================================
// 4. TO-DO LIST С ФИЛЬТРАМИ И СОХРАНЕНИЕМ
// ==========================================
const todoInput = document.querySelector('#todo-input');
const todoAddBtn = document.querySelector('#todo-add-btn');
const todoList = document.querySelector('#todo-list');

// Загружаем задачи
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all'; // 'all', 'active', 'completed'

// Сохранение
function saveTasks() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Отрисовка
function renderTasks() {
    if (!todoList) return;
    todoList.innerHTML = '';

    // Фильтруем задачи
    let filteredTasks = tasks.filter(task => {
        const isCompleted = typeof task === 'object' ? task.completed : false;
        if (currentFilter === 'active') return !isCompleted;
        if (currentFilter === 'completed') return isCompleted;
        return true; 
    });

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task); // индекс в основном массиве
        let taskText = typeof task === 'string' ? task : task.text;
        let isCompleted = typeof task === 'object' ? task.completed : false;

        const li = document.createElement('li');
        if (isCompleted) li.classList.add('completed');

        const span = document.createElement('span');
        span.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.className = 'delete-btn';

        // Зачёркивание
        span.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof tasks[originalIndex] === 'string') {
                tasks[originalIndex] = { text: tasks[originalIndex], completed: true };
            } else {
                tasks[originalIndex].completed = !tasks[originalIndex].completed;
            }
            saveTasks();
            renderTasks();
        });

        // Удаление
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(originalIndex, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

// Добавление задачи
if (todoAddBtn && todoInput) {
    todoAddBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === '') return alert('Напиши задачу!');
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        todoInput.value = '';
        todoInput.focus();
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') todoAddBtn.click();
    });
}

// === Логика фильтров ===
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderTasks();
        });
    });
}
