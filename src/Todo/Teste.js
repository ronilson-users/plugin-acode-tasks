import plugin from '../plugin.json';
import style from './style.scss';

const sdk = acode.require("acode.sdk");
const logger = sdk.getLogger(plugin.id);
const Alert = acode.require("Alert");
const fsOperation = acode.require("fsOperation");

class TaskManager {
constructor() {
this.loadTasks();
}

saveTasks() {
const tasks = [];
document.querySelectorAll('#task-list > li').forEach(taskItem => {
const task = {
text: taskItem.querySelector('label').textContent,
subtasks: []
};
taskItem.querySelectorAll('ul > li').forEach(subtaskItem => {
task.subtasks.push({
text: subtaskItem.querySelector('label').textContent
});
});
tasks.push(task);
});
localStorage.setItem('tasks', JSON.stringify(tasks));
}

loadTasks() {
const tasks = JSON.parse(localStorage.getItem('tasks'));
if (tasks) {
tasks.forEach(task => {
const taskItem = this.createTaskElement(task.text);
task.subtasks.forEach(subtask => {
const subtaskItem = this.createSubtaskElement(subtask.text);
taskItem.querySelector('ul').appendChild(subtaskItem);
});
document.getElementById('task-list').appendChild(taskItem);
});
}
}

createTaskElement(taskText) {
const taskItem = document.createElement('li');
taskItem.innerHTML = `
<input type="checkbox">
<label class="task-title">${taskText}</label>
<button onclick="addSubtaskInput(this)" class="add-btn">Adicionar Subtarefa</button>
<button onclick="editTask(this)" class="edit-btn">Editar</button>
<button onclick="deleteTask(this)" class="delete-btn">Excluir</button>
<ul></ul>
`;
return taskItem;
}

createSubtaskElement(subtaskText) {
const subtaskItem = document.createElement('li');
subtaskItem.innerHTML = `
<input type="checkbox">
<label>${subtaskText}</label>
<button onclick="editTask(this)" class="edit-btn">Editar</button>
<button onclick="deleteTask(this)" class="delete-btn">Excluir</button>
`;
return subtaskItem;
}

addTask() {
const taskText = document.getElementById('new-task').value;
if (taskText === '') return;

const taskList = document.getElementById('task-list');
const taskItem = this.createTaskElement(taskText);
taskList.appendChild(taskItem);
document.getElementById('new-task').value = '';
this.saveTasks();
}

addSubtaskInput(button) {
const subtaskInput = document.createElement('div');
subtaskInput.classList.add('add-subtask');
subtaskInput.innerHTML = `
<input type="text" placeholder="Adicionar nova subtarefa...">
<button onclick="addSubtask(this)" class="add-btn">Adicionar Subtarefa</button>
`;
button.parentElement.appendChild(subtaskInput);
}

addSubtask(button) {
const subtaskText = button.previousElementSibling.value;
if (subtaskText === '') return;

const subtaskList = button.parentElement.parentElement.querySelector('ul');
const subtaskItem = this.createSubtaskElement(subtaskText);
subtaskList.appendChild(subtaskItem);
button.parentElement.remove();
this.saveTasks();
}

editTask(button) {
const taskItem = button.parentElement;
const taskLabel = taskItem.querySelector('label');
const currentText = taskLabel.textContent;

const input = document.createElement('input');
input.type = 'text';
input.value = currentText;

const saveButton = document.createElement('button');
saveButton.textContent = 'Salvar';
saveButton.onclick = () => {
if (input.value !== '') {
taskLabel.textContent = input.value;
taskItem.insertBefore(taskLabel, input);
taskItem.removeChild(input);
taskItem.removeChild(saveButton);
button.style.display = 'inline';
this.saveTasks();
}
};

taskItem.insertBefore(input, taskLabel);
taskItem.insertBefore(saveButton, taskLabel);
taskItem.removeChild(taskLabel);
button.style.display = 'none';
}

deleteTask(button) {
const taskItem = button.parentElement;
taskItem.remove();
this.saveTasks();
}
}

class AcodePlugin {
constructor() {
this.taskManager = new TaskManager();
this.listar();
}

async listar() {
try {
const fileList = acode.require('fileList');
const list = await fileList();
const rootUrl = list.length > 0 ? list[0].root.url: '';
console.log('Caminho da raiz:', rootUrl);
this.pathUrl(rootUrl);
console.log(list);
alert("Listar os arquivos:");
return list;
} catch (err) {
console.error("Ocorreu um erro ao listar os arquivos:", err.message);
alert("Ocorreu um erro ao listar os arquivos: " + err.message);
return [];
}
}

pathUrl(rootUrl) {
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
this.setupPage($page);
logger.info('Page initialized successfully.');
alert("Iniciou Page tasks:");
} catch (error) {
console.error('Erro ao inicializar:', error);
logger.error('Error.', error);
}
}

setupPage($page) {
let command = {
name: "Config",
description: "Acode tasks Engine",
bindKey: {
win: "Ctrl-y"
},
exec: this.run.bind(this),
};
editorManager.editor.commands.addCommand(command);

$page.id = "plugin.acode.tasks";
$page.settitle("Acode tasks");
this.$page = $page;
this.$page.style.backgroundColor = '#010101';
this.$style = tag("style", { textContent: style });

document.head.append(this.$style);

const saveBtn = this.createButton("icon save", "save-acont", this.saveClick.bind(this));
const addBtn = this.createButton("icon add", "new-contacts", this.addClick.bind(this));
const atualizeBtn = this.createButton("icon replay", "atualiza-contacts", this.atualizeClick.bind(this));

this.$page.header.append(saveBtn, addBtn, atualizeBtn);

const tabsElement = tag("section", { className: "tabsElement" });
this.$page.append(tabsElement);

const todoTab = this.createTab("todoTab", "All TodoList");
const progressTab = this.createTab("progressTab", "In Progress");
const completedTab = this.createTab("completedTab", "Completed");

tabsElement.append(todoTab, progressTab, completedTab);

const main = tag("main", { className: "mainDiv" });
this.$page.append(main);

const todoDiv = tag("div", { id: "todoDiv", className: "todoDiv" });

const progressedDiv = tag("div", { textContent: "progressedDiv", className: "progressedDiv" });

const completedDiv = tag("div", { textContent: "completedDiv", className: "completedDiv" });

main.append(todoDiv, progressedDiv, completedDiv);

const todoList = this.createTodoList();
todoDiv.appendChild(todoList);

main.appendChild(todoDiv);
main.appendChild(progressedDiv);
main.appendChild(completedDiv);

this.setupTabEvents(todoTab, progressTab, completedTab, todoDiv, progressedDiv, completedDiv);
}

createButton(className, action, onClickHandler) {
return tag("span", {
className,
dataset: { action },
onclick: onClickHandler
});
}

createTab(className, textContent) {
return tag("div", {
className,
textContent,
onclick: (event) => {
console.log(`Clicou na aba ${textContent}`);
}
});
}

createTodoList() {
return tag('div', {
className: 'todo-list',
id: 'todo-list',
children: [
tag('h3', { textContent: 'Todo list' }),
tag('div', {
className: 'add-task',
id: 'add-task-id',
children: [
tag('input', {
placeholder: 'Adicione o Título Tarefa',
id: 'new-task',
type: 'text',
}),
tag('button', {
className: 'btn-add',
onclick: this.taskManager.addTask.bind(this.taskManager),
children: [
tag('span', { className: 'icon add' })
]
}),
]
}),
tag('ul', { id: 'task-list' }),
]
});
}

setupTabEvents(todoTab, progressTab, completedTab, todoDiv, progressedDiv, completedDiv) {
 
todoTab.addEventListener("click", () => {
todoDiv.style.display = "block";
progressedDiv.style.display = "none";
completedDiv.style.display = "none";
this.updateTabBorder(todoTab, progressTab, completedTab);
});

progressTab.addEventListener("click", () => {
todoDiv.style.display = "none";
progressedDiv.style.display = "block";
completedDiv.style.display = "none";
this.updateTabBorder(progressTab, todoTab, completedTab);
});

completedTab.addEventListener("click", () => {
todoDiv.style.display = "none";
progressedDiv.style.display = "none";
completedDiv.style.display = "block";
this.updateTabBorder(completedTab, todoTab, progressTab);
});
}

updateTabBorder(activeTab, ...otherTabs) {
activeTab.style.borderBottom = "1.5px solid #915eff";
otherTabs.forEach(tab => tab.style.borderBottom = "none");
}

saveClick() {
alert("Saved!");
}

addClick() {
alert("Add new task!");
}

atualizeClick() {
alert("Update tasks!");
}

async run() {
this.$page.show();
const references = this.getReferences();
references.todoDiv.style.display = "block";
references.progressedDiv.style.display = "none";
references.completedDiv.style.display = "none";
this.updateTabBorder(references.todoTab, references.progressTab, references.completedTab);
}

getReferences() {
return {
todoTab: this.$page.querySelector(".todoTab"),
progressTab: this.$page.querySelector(".progressTab"),
completedTab: this.$page.querySelector(".completedTab"),

todoDiv: this.$page.querySelector(".todoDiv"),
progressedDiv: this.$page.querySelector(".progressedDiv"),
completedDiv: this.$page.querySelector(".completedDiv")
};
}

async destroy() {
let command = {
name: "Acode tasks",
description: "Community Acode tasks",
exec: this.run.bind(this),
};
editorManager.editor.commands.removeCommand(command);
}
}

if (window.acode) {
const acodePlugin = new AcodePlugin();
acode.setPluginInit(plugin.id, (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
if (!baseUrl.endsWith("/")) {
baseUrl += "/";
}
acodePlugin.baseUrl = baseUrl;
acodePlugin.init($page, cacheFile, cacheFileUrl);
});
acode.setPluginUnmount(plugin.id, () => {
acodePlugin.destroy();
});
}