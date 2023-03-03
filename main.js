const taskList = document.querySelector('#task-list');
const addTaskButton = document.querySelector('#add-task');
const toggleThemeButton = document.querySelector('#toggle-theme');
const taskInput = document.querySelector('.footer input[type="text"]');

let isDragging = false;
let dragStartIndex, dragEndIndex;

// Load tasks from local storage on page load
window.addEventListener('load', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((taskText) => {
    const newTask = createTaskElement(taskText);
    taskList.appendChild(newTask);
  });
});

// Adicionar nova tarefa
addTaskButton.addEventListener('click', () => {
  const newTaskText = taskInput.value.trim();

  if (newTaskText) {
    const newTask = createTaskElement(newTaskText);
    taskList.appendChild(newTask);
    taskInput.value = '';

    // Save tasks to local storage
    const tasks = [...taskList.children].map(task => task.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Criar elemento de tarefa
function createTaskElement(text) {
  const newTask = document.createElement('li');
  newTask.draggable = true;
  newTask.dataset.index = taskList.children.length;
  newTask.innerHTML = `
    <input type="checkbox">
    <span>${text}</span>
    <button class="delete-task">Excluir</button>
  `;
  return newTask;
}

// Excluir tarefa
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-task')) {
    event.target.parentElement.remove();
    updateTasksIndexes();

    // Save tasks to local storage
    const tasks = [...taskList.children].map(task => task.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Reordenar tarefas por arrastar e soltar
function handleDragStart(event) {
  dragStartIndex = parseInt(event.currentTarget.dataset.index);
  isDragging = true;
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragDrop(event) {
  dragEndIndex = parseInt(event.currentTarget.dataset.index);
  swapTasks();
}

function handleDragEnd() {
  isDragging = false;

  // Save tasks to local storage
  const tasks = [...taskList.children].map(task => task.querySelector('span').textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function swapTasks() {
  const taskItems = [...taskList.children];
  const task1 = taskItems[dragStartIndex].querySelector('span').textContent;
  const task2 = taskItems[dragEndIndex].querySelector('span').textContent;
  taskItems[dragStartIndex].querySelector('span').textContent = task2;
  taskItems[dragEndIndex].querySelector('span').textContent = task1;
  updateTasksIndexes();
}

function updateTasksIndexes() {
  const taskItems = [...taskList.children];
  taskItems.forEach((item, index) => {
    item.dataset.index = index;
  });
}

taskList.addEventListener('dragstart', handleDragStart);
taskList.addEventListener('dragover', handleDragOver);
taskList.addEventListener('drop', handleDragDrop);
taskList.addEventListener('dragend', handleDragEnd);

// Alternar tema
toggleThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.querySelector
  document.querySelector('#task-app').classList.toggle('dark');
});