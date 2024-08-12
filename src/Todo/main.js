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
const fileList = acode.require('fileList'); const list = await fileList(); // Obtém o caminho da raiz apenas uma vez, assumindo que todos os itens na lista têm o mesmo caminho da raiz
const rootUrl = list.length > 0 ? list[0].root.url: ''; console.log('Caminho da raiz:', rootUrl);

this.pathUrl(rootUrl); console.log(list); alert("Listar os arquivos:"); return list;
// Se necessário retornar a lista de arquivos
} catch (err) {
console.error("Ocorreu um erro ao listar os arquivos:", err.message);
alert("Ocorreu um erro ao listar os arquivos: " + err.message);
return []; // Retorna uma lista vazia em caso de erro
}
} pathUrl(rootUrl) {
if (rootUrl.search(/com.termux/) > -1) { rootUrl = rootUrl.split("::").pop(); } else if (rootUrl.search(/file:\/\//) > -1) {
rootUrl = rootUrl.split("///").pop();
}
// Adiciona uma barra no final do caminho, se não houver
if (!rootUrl.endsWith('/')) { rootUrl += '/'; } console.log('Inicializar  em:', rootUrl); return rootUrl;
}


async init($page) {
try {





} catch (error) {
console.error('Erro ao inicializar:', error);
logger.error('Error.', error);
}


// Configuração do comando
let command = {
name: "Config ",
description: "Acode tasks Engine",
bindKey: {
win: "Ctrl-y"
},
exec: this.run.bind(this),
};
editorManager.editor.commands.addCommand(command);

// Configuração da página
$page.id = "plugin.acode.tasks";
$page.settitle("Acode tasks");
this.$page = $page;

// Estilo da página
this.$page.style.backgroundColor = '#010101';
this.$style = tag("style", { textContent: style });


document.head.append(this.$style);
logger.error('Error.');
alert("Iniciou Page tasks:");

/* remove header */
// $page.header.remove();
$page.style.overflowY = 'hidden';
$page.style.overflowX = 'hidden';



// Button Header
const saveBtn = tag("span", { className: "icon save", dataset: { action: "save-acont" } });

const addBtn = tag("span", { className: "icon add", dataset: { action: "new-contacts" } });

const atualizeBtn = tag("span", { className: "icon replay", dataset: { action: "atualiza-contacts" } });


this.$page.header.append(...[saveBtn, addBtn, atualizeBtn]);


// eventos buttons
saveBtn.onclick = this.saveClick.bind(this);

addBtn.onclick = this.addClick.bind(this);

atualizeBtn.onclick = this.atualizeClick.bind(this);


// Abas da págin
const tabsElement = tag("section", { className: "tabsElement" });

this.$page.append(tabsElement);

const tasksTab = tag("div", {
className: "tasksTab",
textContent: "All Tasks",
onclick: (event) => {
console.log('Clicou em all Tasks');

}
});

const activeTab = tag("div", {
className: "activeTab",
textContent: "Active",
onclick: (event) => {
console.log('Clicou na aba Feed');

}
});


tabsElement.append(tasksTab, activeTab);


// Área principal da página
const main = tag("main", { className: "mainDiv" });


this.$page.append(main);

// Divs para cada aba
const taskDiv = tag("div", { className: "taskDiv" });

const form = tag("form", {
id: "todo-form",
className: 'form-container',
children: [
tag('div', {
className: 'form-control',
children: [
tag('input', {
className: 'input-task',
id: 'task-input',
type: 'text',
placeholder: 'Adicione o Titulo da Tarefas'
}),
tag('button', {
className: 'btn-add',
children: [
tag('i', { className: 'icon add' })
]
}),
]
}),
tag( 'textarea', {
 className:'task-description',
 textContent:'descreva a tarefa',
 id:'',
 row:'4',
 cols:'50'
 
})
]
});

const formEdit = tag("form", {
id: "edit-form",
className: 'form-container',
children: [
tag('div', {
className: 'form-control',
children: [
tag('input', {
className: 'input-task',
id: 'input-edit',
type: 'text',
}),
tag('button', {
className: 'btn-edit',
children: [
tag('span', { className: 'icon edit' })
]
}),
tag('button', {
className: 'btn-edit',
children: [
tag('span', { className: 'icon add' })
]
}),
tag('button', {
className: 'btn-edit',
children: [
tag('span', { className: 'icon edit' })
]
}),
]
})
]
});

const toolBar = tag('div', {
className: 'toolBar',
id: 'toolBar',
children: [
tag('div', {
className: 'search',
id: 'search', 
children: [

tag('form', {
id: 'form-search',
className : 'form-search',
children: [
tag('input', {
className: 'input-search',
id: 'search-input',
type: 'text',
placeholder: 'Buscar tasks'
}),

tag('button', {
className: 'btn-search',
id: 'search-button', // Alterado de 'erase-button' para 'search-button'
children: [
tag('span', { className: 'icon search  ' }),


]
}),
]
}),
]
})
]
});

 

form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('.input-task');
        if (input.value === '') return;
       // this.addTaskList(input.value);
console.log('edit task', input.value);
       
    });

    formEdit.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('.input-edit');
        if (input.value === '') return;
        console.log('edit task', input.value);
    });



toolBar.addEventListener('submit', (e) => {
e.preventDefault();

/* event Listeners para o form  */
const input = document.querySelector('.search-input')

if (input.value === '') return;

console.log('busca ')

});



taskDiv.appendChild(form)
taskDiv.appendChild(toolBar)
taskDiv.appendChild(formEdit)


const activeDiv = tag("div", {
textContent: "activeDiv",
className: "activeDiv"
});

main.appendChild(taskDiv);
main.appendChild(activeDiv);


}

addCheckbox() {
            const textarea = document.getElementById('task-desc');
            
            // Insert checkbox HTML at the cursor position
            const checkboxHtml = ' <input type="checkbox"> ';
            textarea.value = textarea.value.substring(0, start) + checkboxHtml + textarea.value.substring(end);
            

}

getReferences() {
const tasksTab = document.querySelector(".tasksTab");
const activeTab = document.querySelector(".activeTab");


const taskDiv = this.$page.querySelector(".taskDiv")
const activeDiv = this.$page.querySelector(".activeDiv");


return {
tasksTab,
activeTab,

taskDiv,
activeDiv,

};
}

saveClick() {
alert("savedClick");
//funciona
}

addClick() {
alert("addClick");
//funciona

}

atualizeClick() {
alert("atualizeClick");
//funciona
}

async run() {
this.$page.show();

const references = this.getReferences();

// Inicialmente, mostra apenas a div da aba Profile e oculta as outras
references.taskDiv.style.display = "block";
references.activeDiv.style.display = "none";

// Adiciona a borda apenas à aba Profile inicialmente
references.tasksTab.style.borderBottom = "1.5px solid #915eff";
references.activeTab.style.borderBottom = "none";


references.tasksTab.addEventListener("click", () => {
references.taskDiv.style.display = "block";
references.activeDiv.style.display = "none";

references.tasksTab.style.borderBottom = "1.5px solid #915eff";
references.activeTab.style.borderBottom = "none";

console.log("Clicou na aba Profile");
});

references.activeTab.addEventListener("click", () => {
references.taskDiv.style.display = "none";
references.activeDiv.style.display = "block";

references.tasksTab.style.borderBottom = "none";
references.activeTab.style.borderBottom = "1.5px solid #915eff";


console.log("Clicou na aba Feed");
});


}

async destroy() {
let command = {
name: "Acode tasks",
description: " Community Acode tasks",
exec: this.run.bind(this),
};
editorManager.editor.commands.removeCommand(command);
}
} // fim da  classe AcodePlugin

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