let sdk = acode.require("acode.sdk");
let logger = sdk.getLogger(plugin.id);

logger.debug('Hello');
logger.info('Helpful info.');
logger.warning('File not found.');
logger.error('Error.');

import plugin from '../plugin.json';
import style from './style.scss';

const Alert = acode.require("Alert");
const fsOperation = acode.require("fsOperation");

class AcodePlugin {
constructor() {
this.listar();
}

async listar() {
try {
const fileList = acode.require('fileList');
const list = await fileList();
const rootUrl = list.length > 0 ? list[0].root.url: '';
console.log('Caminho da raiz:', rootUrl);

this.pathUrlFormated(rootUrl);
console.log(list);
//alert("Listar os arquivos:");
return list;
} catch (err) {
console.error("Ocorreu um erro ao listar os arquivos:", err.message);
alert("Ocorreu um erro ao listar os arquivos: " + err.message);
return [];
}
}

pathUrlFormated(rootUrl) {
if (rootUrl.search(/com.termux/) > -1) {
rootUrl = rootUrl.split("::").pop();
} else if (rootUrl.search(/file:\/\//) > -1) {
rootUrl = rootUrl.split("///").pop();
}
if (!rootUrl.endsWith('/')) {
rootUrl += '/';
}
console.log('Inicializar em:', rootUrl);
return rootUrl;
}

async init($page) {
try {
logger.info('Helpful info.');
} catch (error) {
console.error('Erro ao inicializar:', error);
logger.error('Error.', error);
}

let command = {
name: "Config",
description: "Acode tasks Engine",
bindKey: { win: "Ctrl-y" },
exec: this.run.bind(this),
};
editorManager.editor.commands.addCommand(command);

$page.id = "plugin.acode.tasks";
$page.settitle("Acode tasks");
this.$page = $page;

this.$page.style.backgroundColor = '#ebeae7bf';

this.$style = this.createElement("style", { textContent: style });

document.head.append(this.$style);
logger.error('Error.');
alert("Iniciou Page tasks:");

$page.style.overflowY = 'hidden';
$page.style.overflowX = 'hidden';

const saveBtn = this.createElement("span", { className: "icon save", dataset: { action: "save" } });

const addBtn = this.createElement("span", { className: "icon add", dataset: { action: "new" } });

const atualizeBtn = this.createElement("span", { className: "icon replay", dataset: { action: "atualiza" } });

this.$page.header.append(saveBtn, addBtn, atualizeBtn);

saveBtn.onclick = this.saveClick.bind(this);

addBtn.onclick = this.addClick.bind(this);
atualizeBtn.onclick = this.atualizeClick.bind(this);

const main = this.createElement('main', { className: 'mainDiv' });
document.body.append(main);

const tabsElement = this.createElement("section", { className: "tabsElement" });
main.append(tabsElement);

const todoTab = this.createElement("div", {
className: "todoTab",
textContent: "All Tasks",
onclick: () => {
console.log('Clicou em All Tasks');
}
});

const progressTab = this.createElement("div", {
className: "progressTab",
textContent: "Progressed",
onclick: () => {
console.log('Clicou em Progressed');
}
});

tabsElement.append(todoTab, progressTab);

const todoDiv = this.createElement('div', { className: 'todoDiv' });

const progressDiv = this.createElement('div', { className: 'progressDiv' });

const todoList = this.createElement('div', { className: 'todo-list', id: 'todo-list' },

this.createElement('h3', {}, 'Todo list'),

this.createElement('div', { className: 'add-task', id: 'add-task-id' },

this.createElement('input', { placeholder: 'Adicione o Título Tarefa', id: 'new-task', type: 'text' }),

this.createElement('button', { className: 'btn-add icon add', onclick: this.addTask.bind(this) })
),

this.createElement('ul', { id: 'task-list' })
);

main.append(todoDiv, todoList);

todoDiv.appendChild(todoList);
main.appendChild(todoDiv);
main.appendChild(progressDiv);

window.addEventListener('load', this.loadTasks.bind(this));



createElement(tag, attributes = {}, ...children) {
const element = document.createElement(tag);
for (let key in attributes) {
element[key] = attributes[key];
}
for (let child of children) {
if (typeof child === 'string') {
child = document.createTextNode(child);
}
element.appendChild(child);
}
return element;
}

createTaskElement(taskTitle) {
const task = this.createElement('li', { className: 'task' });

const taskBox = this.createElement('div', { className: 'taskTitleBox' },

this.createElement('input', { type: 'checkbox', onchange: this.toggleTaskCompleted.bind(this) }),

this.createElement('span', {id:'taskTitle-id', className: 'text' }, taskTitle),

this.createElement('span', { className: 'btn-add icon add', onclick: this.addSubtask.bind(this) }),

this.createElement('span', { className: 'btn-delete icon clearclose', onclick: this.deleteTask.bind(this) })
);

const progressContainer = this.createElement('div', { className: 'progress' },

this.createElement('div', { className: 'progress-bar' })
);

const subtasksList = this.createElement('ul', { className: 'subtasks' });

task.append(taskBox, progressContainer, subtasksList);

return task;

}

addTask() {
const taskTitle = document.getElementById('new-task').value;

if (taskTitle.trim() === '') return;

const task = this.createTaskElement(taskTitle);

document.getElementById('task-list').appendChild(task);

document.getElementById('new-task').value = '';

this.saveTasks();
}

addSubtask(event) {
const taskElement = event.target.closest('.task');

const subtaskTitle = prompt('Enter subtask title:');

if (subtaskTitle && subtaskTitle.trim() !== '') {
const subtask = this.createElement('li', {},
this.createElement('input', { type: 'checkbox', onchange: (e) => { this.toggleTaskCompleted(e); 

this.updateProgress(taskElement); } }),

this.createElement('span', { className: 'subtask-title', id: 'subtask-title' }, subtaskTitle),

this.createElement('button', { className: 'btn-delete icon clearclose', onclick: (e) => { this.deleteTask(e);

this.updateProgress(taskElement); } })
);

const subtasksContainer = taskElement.querySelector('.subtasks');

if (subtasksContainer) {
subtasksContainer.appendChild(subtask);

this.updateProgress(taskElement);
}
}
this.saveTasks();
}

deleteTask(event) {
const taskElement = event.target.closest('li');

const parentTaskElement = taskElement.closest('.task');

if (taskElement) {
taskElement.remove();
}

if (parentTaskElement) {
this.updateProgress(parentTaskElement);
}

this.saveTasks();
}

toggleTaskCompleted(event) {
const taskElement = event.target.closest('li');

if (!taskElement) return;

const span = taskElement.querySelector('span');

if (span) {
if (event.target.checked) {
span.setAttribute('completed');
} else {
span.removeAttribute('completed');
}
}

const parentTaskElement = taskElement.closest('.task');

if (parentTaskElement) {
this.updateProgress(parentTaskElement);
}

this.saveTasks();
}

updateProgress(taskElement) {
if (!taskElement) return;

const subtasks = taskElement.querySelectorAll('.subtasks li');

const progressBar = taskElement.querySelector('.progress-bar');

if (!progressBar) return;

let progress = 0;
if (subtasks.length > 0) {
const completedCount = Array.from(subtasks).filter(subtask =>
subtask.querySelector('input[type="checkbox"]').checked).length;
progress = (completedCount / subtasks.length) * 100;
}

progressBar.style.width = progress + '%';

const spanElement = taskElement.querySelector('.text');
if (spanElement) {
if (progress === 100) {
spanElement.setAttribute('completed');
} else {
spanElement.removeAttribute('completed');
}
}

this.saveTasks();
}

getReferences() {
const todoTab = document.querySelector(".todoTab");

const progressTab = document.querySelector(".progressTab");

const todoDiv = this.$page.querySelector(".todoDiv");

const progressDiv = this.$page.querySelector(".progressDiv");

return {
todoTab,
progressTab,
todoDiv,
progressDiv,
};
}

saveClick() {
alert("savedClick");
}

addClick() {
alert("addClick");
}

atualizeClick() {
alert("atualizeClick");
}

async run() {
this.$page.show();

const references = this.getReferences();

// Inicialmente, mostra apenas a div da aba All Tasks e oculta as outras
references.todoDiv.style.display = "block";
references.progressDiv.style.display = "none";

// Adiciona a borda apenas à aba All Tasks inicialmente
references.todoTab.style.borderBottom = "1.5px solid #915eff";
references.progressTab.style.borderBottom = "none";

references.todoTab.addEventListener("click", () => {
references.todoDiv.style.display = "block";
references.progressDiv.style.display = "none";

references.todoTab.style.borderBottom = "1.5px solid #915eff";
references.progressTab.style.borderBottom = "none";

console.log("Clicou na aba All Tasks");
});

references.progressTab.addEventListener("click", () => {
references.todoDiv.style.display = "none";
references.progressDiv.style.display = "block";

references.todoTab.style.borderBottom = "none";

references.progressTab.style.borderBottom = "1.5px solid #915eff";

console.log("Clicou na aba Progressed");
});

// Carregar tarefas salvas ao carregar a página
//window.addEventListener('load', this.loadTasks.bind(this));

//this.loadTasks();
}

async destroy() {
let command = {
name: "Acode tasks",
description: "Community Acode tasks",
exec: this.run.bind(this),
};
editorManager.editor.commands.removeCommand(command);
localStorage.removeItem('tasks');
console.log("removido");
alert('Removido');
}

async loadTasks() {
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.getElementById('task-list');
taskList.innerHTML = '';
tasks.forEach(task => {
const taskElement = this.createTaskElement(task.title);
taskElement.querySelector('input[type="checkbox"]').checked = task.completed;
task.subtasks.forEach(subtask => {
const subtaskElement = this.createElement('li', {},
this.createElement('input', { type: 'checkbox', onchange: (e) => { this.toggleTaskCompleted(e); this.updateProgress(taskElement); } }),
this.createElement('span', { className: 'subtask-title' }, subtask.title),
this.createElement('button', { className: 'btn-delete icon clearclose', onclick: (e) => { this.deleteTask(e); this.updateProgress(taskElement); } })
);
subtaskElement.querySelector('input[type="checkbox"]').checked = subtask.completed;
taskElement.querySelector('.subtasks').appendChild(subtaskElement);
});
taskList.appendChild(taskElement);
this.updateProgress(taskElement);
});
}

saveTasks() {
 (alert)('salvou')
const tasks = [];
const taskListItems = document.querySelectorAll('.task');
taskListItems.forEach(taskItem => {
const taskTitle = taskItem.querySelector('.text').textContent;
const taskCompleted = taskItem.querySelector('input[type="checkbox"]').checked;
const subtasks = Array.from(taskItem.querySelectorAll('.subtasks li')).map(subtaskItem => {
return {
title: subtaskItem.querySelector('.subtask-title').textContent,
completed: subtaskItem.querySelector('input[type="checkbox"]').checked
};
});
tasks.push({ title: taskTitle, completed: taskCompleted, subtasks: subtasks });
});
localStorage.setItem('tasks', JSON.stringify(tasks));
}
}

if (window.acode) {
const acodePlugin = new AcodePlugin();
acode.setPluginInit(
plugin.id,
(baseUrl, $page, { cacheFileUrl, cacheFile }) => {
if (!baseUrl.endsWith("/")) {
baseUrl += "/";
}
acodePlugin.baseUrl = baseUrl;
acodePlugin.init($page, cacheFile, cacheFileUrl);
}
);
acode.setPluginUnmount(plugin.id, () => {
acodePlugin.destroy();
});
}