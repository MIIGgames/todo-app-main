const taskList = document.querySelector('#task-list');
const addTaskButton = document.querySelector('#add-task');
const toggleThemeButton = document.querySelector('#toggle-theme');
const taskInput = document.querySelector('.footer input[type="text"]');

let isDragging = false;
let dragStartIndex, dragEndIndex;

// Adicionar nova tarefa
addTaskButton.addEventListener('click', () => {
  const newTaskText = taskInput.value.trim();
  
  if (newTaskText) {
    const newTask = createTaskElement(newTaskText);
    taskList.appendChild(newTask);
    taskInput.value = '';
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
  document.querySelector('#task-app').classList.toggle('dark');
});
