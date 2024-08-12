import plugin from '../plugin.json';
import style from './style.scss';
import { stat } from 'fs/promises';
import { fs } from '@isomorphic-git/lightning-fs';



const sidebarApps = acode.require('sidebarApps');

const multiPrompt = acode.require('multiPrompt');



class AcodePlugin {
constructor() {
this.getFormattedPath();
this.listFilesInDirectory();
}

// Formata o caminho do arquivo ativo, removendo prefixos específicos, se aplicável
getFormattedPath() {
let path = editorManager.activeFile?.location;
if (!path) {
return false;
}
if (path.search(/com\.termux/) > -1) {
path = path.split("::").pop();
} else if (path.search(/file:\/\/\//) > -1) {
path = path.split("///").pop();
}
console.log('path', path);
return path;
}

// Lista todos os arquivos no diretório atual
async listFilesInDirectory() {
try {
const fileList = acode.require('fileList');
const list = await fileList();
list.forEach((item) => {
console.log(
'name', item.name,
'path', item.path,
'root', item.root,

);
});
return;
} catch (error) {
console.error('Erro ao listar arquivos:', error);
return [];
}
}

async init() {
try {
acode.addIcon('sidebar-icon', this.baseUrl + 'assets/icon.png');


this.globalStyles();
this.containerSourceControl();




} catch (error) {
console.error('Erro ao inicializar:', error);
}
}


// Aplica estilos globais ao documento
globalStyles() {
this.$style = tag('style', { textContent: style, id: 'source-control' });
document.head.append(this.$style);
}

// Cria o contêiner de controle na barra lateral
containerSourceControl() {
this.$containerControl = this.createContainerControl();


const $header = this.createHeader();


const $initRepo = this.createInitRepoButton();

const dropdownMenu = this.createDropdownMenu();


$header.appendChild(dropdownMenu);
$header.appendChild($initRepo);


const $staging = this.createStagingArea();

const stagingListItems = this.createStagingListItems();

const $changes = this.createChangesArea();

const $stagedChanges = this.createStagedChangesArea();


this.$containerArea = this.createContainerArea($staging, stagingListItems, $changes, $stagedChanges);


this.$containerFooter = this.createFooterContainer();


this.$containerControl.append($header, this.$containerArea, this.$containerFooter);


sidebarApps.add('sidebar-icon', 'sidebar-app-control', 'Sidebar', (app) => {
app.append(this.$containerControl);
});
}

// Método para mostrar Container-control
createContainerControl() {
const $containerControl = tag('div', { className: 'sidebar-control' });

return $containerControl
}

// Método para criar Header
createHeader() {
const $header = tag('div', {
className: 'header',
children: [
tag('h3', {
className: 'title-h',
textContent: 'SOURCE CONTROL'
})
]
});

return $header;
}

// Cria o botão de inicialização do repositório
createInitRepoButton() {
const  $initRepoButton = tag('div', {
className: 'source-control-buttons',
children: [
tag("button", {
textContent: "INITIALIZE REPOSITORY",
className: 'init-repo',
onclick: () => this.handleInitializeRepo()
}),

// button auxiliares
tag("button", {
className: 'icon replay btn-add',
onclick: () => this.toggleDropdownMenu()
})
]
});

return  $initRepoButton;
}

// Solicita as credenciais do repositório
async credencialRepo() {

const myPrompt = await multiPrompt(
'Usuario github , token , repo',
[
{ type: 'text',
id: 'usuario do git',
placeholder: 'user id'
},
{
type: 'url',
id: 'urlRepo',
placeholder: 'https://e.g'
},
{
type: 'text',
id: 'tokenRepo',
placeholder: 'token'
},

],
'https://github.com/settings/tokens'
);
window.toast('Click Repo ️', 4000);
};

// Manipula a inicialização do repositório
handleInitializeRepo() {
this.credencialRepo();
}

// Método para criar AREA PREPARAÇÃO
createContainerArea($staging, stagingListItems, $changes, $stagedChanges) {
 
/**
* ------ ÁREA DE PREPARAÇÃO ----- *
* CHANGES
* STAGING
* ...stagingListItems
* STAGED-CHANGES
*
*/

const $containerArea = tag('div', {
className: 'container container-control',
children: [

$changes,
// ...changesListItems,

$staging,
...stagingListItems,

$stagedChanges
// ...$stagedChangesListItems

]
});

return $containerArea;
}

// Cria a área de preparação (staging) para os arquivos
createStagingArea() {
const $staging = tag('div', {
className: 'telha staging',
children: [
tag('i', { 
 className: 'icon keyboard_arrow_down' }),
 
tag('span', { 
 className: 'text-sc', 
 textContent: 'STAGING' }),
 
tag('span', { 
 className: 'cont-files', 
 textContent: '1' }),
 
tag("i", {
className: 'icon more_vert btn-add',
onclick: () => this.abrirMenu()
})
]
});

return $staging;
}

// Cria a área de mudanças para os arquivos
createChangesArea() {
const $changes = tag('div', {
className: 'telha staging',
children: [
tag('i', { 
 className: 'icon keyboard_arrow_down' }),

tag('span', { 
 className: 'text-sc', 
 textContent: 'CHANGES' }),
 
tag('span', { 
 className: 'cont-files', 
 textContent: '1' }),
 
tag("i", {
className: 'icon more_vert btn-add',
onclick: () => this.abrirMenu(),
children:[]
})
]
});

return $changes;
}

// Cria a área de mudanças preparadas (staged changes)
createStagedChangesArea() {
const $stagedChanges = tag('div', {
className: 'telha staging',
children: [
tag('i', { 
 className: 'icon keyboard_arrow_down' }),

tag('span', { 
 className: 'text-sc', 
 textContent: 'STAGED CHANGES' }),

tag('span', { 
 className: 'cont-files', 
 textContent: '1' }),

tag("i", {
className: 'icon more_vert btn-add',

onclick: () => this.abrirMenu(),
children:[]

})
]
});

return $stagedChanges;
}

/** Método para Visualizar Arquivos
* changesListItems
* stagingListItems 👍
* stagingListItems
*/

// Cria a área de mudanças preparadas (staged changes)
createStagingListItems() {

// arquivos devem ser inserido pela dependências git
const stagingFiles = [
{ filename: 'file1.json', directory: 'path/file1.json' },
{ filename: 'file.js', directory: 'path/file.js' },
{ filename: 'file.html', directory: 'path/file.html' },
{ filename: 'file.scss', directory: 'path/file.scss' },
{ filename: 'file.ts', directory: 'path/file.ts' },
];

const stagingListItems = stagingFiles.map(file => {
const iconClass = acode.require('helpers').getIconForFile(file.filename);

// implementar dropDownMenu nas areas
const $listItem = tag('div', {
id: 'staging-files',
className: 'telha-files files-area',
children: [
tag('span', { className: `file-icon ${iconClass}` }),
tag('span', {
className: 'files-sub text-sc',

// sub-text file path

children: [
tag('span', { 
 className: 'text-sc', 
 textContent: file.filename }),

tag('span', { 
 className: 'file-path', 
 textContent: file.directory }),
]

}),

tag('span', { 
 className:'action-staging',
 textContent: 'U' }),

tag("span", {
 className: 'icon documents', 
 onclick: (event) => {
  
// criar function diff
console.log(`Clicou no arquivo: ${file.filename}`);


} }),
tag("span", {
className: 'icon add ',
onclick: (event) => {
console.log(`Botão clicado para o arquivo: ${file.filename}`);
},
children: [
tag('span', {
className: 'dropdown-area',
id: 'drop-area',
children: [
tag('span', { textContent: 'All' }),
tag('span', { textContent: 'Add' }),
tag('span', { textContent: 'Commit' }),
tag('span', { textContent: 'Push' }),
]
})

]
}),
],
});
return $listItem;
});
return stagingListItems;
}

// Método para criar dropDownMenu
createDropdownMenu() {
const $dropDownMenu = tag('div', {
className: 'dropdown-menu',
id: 'dropMenu',
children: [
tag('span', { textContent: 'Opção 1' }),
tag('span', { textContent: 'Opção 2' }),
tag('span', { textContent: 'Opção 3' })
]
});

return  $dropDownMenu;

}

// Exibe ou oculta o menu dropdown
toggleDropdownMenu() {
const dropdownMenu = document.getElementById('drop-area');
if (dropdownMenu) {
dropdownMenu.classList.toggle('show');
} else {
console.error("Elemento '.dropdown-menu' não encontrado.");
}
}

toggleDiffFile(){} 

// Cria o contêiner do Footer
createFooterContainer() {

const $containerFooter = tag('div', {
className: 'footer',
children: [

tag('span', {
textContent: 'error',
className: 'icon warningreport_problem',
}),

tag("span", {
className: 'icon add',

}),

tag("span", {
className: 'icon settings',

}),

]
});

return $containerFooter;

}

// Destrói o contêiner de controle na barra lateral
async destroy() {

this.containerSourceControl.remove()
}

}



if (window.acode) {
const acodePlugin = new AcodePlugin();
acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
if (!baseUrl.endsWith('/')) {
baseUrl += '/';
}
acodePlugin.baseUrl = baseUrl;
await acodePlugin.init($page, cacheFile, cacheFileUrl);
});
acode.setPluginUnmount(plugin.id, () => {
acodePlugin.destroy();
});
}