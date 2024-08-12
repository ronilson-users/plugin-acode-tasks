import plugin from '../plugin.json';
import style from './style.scss';

const sidebarApps = acode.require('sidebarApps');
const fs = acode.require('fs');

const multiPrompt = acode.require('multiPrompt');


class AcodePlugin {
constructor() {
this.getFormattedPath();
this.listFilesInDirectory();
}

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

async listFilesInDirectory() {
try {
const fileList = acode.require('fileList');
const list = await fileList();
list.forEach((item) => {
console.log(
'name', item.name,
'path', item.path,
'root', item.root,
'isConnected', item.isConnected
);
});



return
} catch (error) {
console.error('Erro ao listar arquivos:', error);
return [];
}
}


async init() {
try {
// Adiciona um ícone à barra lateral
acode.addIcon('sidebar-icon', this.baseUrl + 'assets/icon.png');

// Aplica estilos globais
this.globalStyles();

// Cria e configura o contêiner de controle de origem
this.containerSourceControl();

// Adiciona ouvintes de eventos
this.eventListeners();

} catch (error) {
// Manipula erros, se houver
}
}

// Método para aplicar estilos globais
globalStyles() {
this.$style = tag('style', { textContent: style, id: 'source-control' });
document.head.append(this.$style);
}

// Método para criar e configurar o contêiner de controle de origem
containerSourceControl() {

// Cria o contêiner principal da barra lateral
this.$containerControl = tag('div', { className: 'container sidebar-control' });

// Cria o cabeçalho da barra lateral com o título 'SOURCE CONTROL'
const $header = tag('div', {
className: 'header',
children: [

tag('h3', {
className: 'title-h',
textContent: 'SOURCE CONTROL'
}),

]
});

// Cria os botão init repo dentro do contêiner de controle
const $initRepo = tag('div', {
className: 'source-control-buttons',
children: [

tag("button", {
textContent: "INITIALIZE REPOSITORY",
className: 'init-repo',
onclick: () => this.initRepo(),
}),


tag("button", {
className: 'icon add btn-add',
onclick: () => this.collapsedArea(),
}),


]

});

// Adicionina botão init ao cabeçalho
$header.appendChild($initRepo);

// Create list element for staging
const stagingFiles = [
{
filename: 'file1.json',
directory: 'path/file1.json'
},
{
filename: 'file.js',
directory: 'path/file.js'
},
{
filename: 'file.html',
directory: 'path/file.html'
},
{
filename: 'file.scss',
directory: 'path/file.scss'
},
{
filename: 'file.ts',
directory: 'path/file.ts'
},
];

// Função para criar um item de lista para cada arquivo na área de Staging
const createListItem = (file) => {
const iconClass = acode.require('helpers').getIconForFile(file.filename);

const $listItem = tag('div', {
id: 'staging-files',
className: 'tile files-area ',
children: [

tag('span', {
className: `file-icon ${iconClass}`
}),

tag('span', {
className: 'text-sc',
textContent: file.filename
}),

tag('span', {
className: 'file-path',
textContent: file.directory
}),

tag('span', {
className: 'action-staging',
textContent: 'U',
children: [
// A U M
]
}),


// addStageChanges
tag("button", {
className: 'icon add btn-add',
onclick: this.collapsedArea.bind(this),
}),


]

});
return $listItem;
};

// Criação dos elementos Staging
const $staging = tag('div', {

className: 'tile staging',
children: [

// icon
tag('i', {
className: 'icon keyboard_arrow_down',
}),

// título
tag('span', {
className: 'text-sc',
textContent: 'STAGING',
onclick: this.collapsedArea.bind(this),
}),

// título
tag('span', {
className: 'cont-files',
textContent: '1'
}),

// action ícone
tag("button", {
className: 'icon more_vert btn-add',
onclick: () => this.collapsedArea(),
}),


]
});

// Criar lista de itens de arquivo para a área de Staging
const stagingListItems = stagingFiles.map(file => createListItem(file));

// Criação dos elementos CHANGES
const $changes = tag('div', {
className: 'tile staging',
children: [

// icon
tag('i', {
className: 'icon folder',
}),

// título
tag('span', {
className: 'text-sc',
textContent: 'CHANGES'
}),

// action ícone
tag("button", {
className: 'icon more_vert btn-add',
onclick: () => this.collapsedArea(),
}),

]
});

// Adicionar lista de itens de arquivo à área de conteúdo
this.$containerArea = tag('div', {
className: 'container container-control',
children: [
// botões deste contexto nao funciona
$staging,
...stagingListItems,
$changes

]
});

this.$containerFooter = tag('div', {
className: 'footer',
children: [

tag('span', {
textContent: 'error',
className: 'icon warningreport_problem'
}),

// action btn
tag("button", {
className: 'tile icon add ',
onclick: () => this.collapsedArea(),
}),


]
});



// Adiciona o cabeçalho e a área de conteúdo ao contêiner principal
this.$containerControl.append(
$header,
this.$containerArea,
this.$containerFooter
);


// Adiciona o contêiner de controle à barra lateral
sidebarApps.add('sidebar-icon', 'sidebar-app-control', 'Sidebar', (app) => {
app.append(this.$containerControl);
});
};

// Método para ocultar area files
collapsedArea() {
console.log('Clicou em STAGING');
// Exibir a área de arquivos
const areaFiles = document.getElementById('staging-files');
if (areaFiles) {
areaFiles.classList.toggle('hidden');
} else {
console.error('Elemento "staging-files" não encontrado.');
}
// Remova esta linha se não quiser exibir um toast
// window.toast('Clicou em STAGING', 2000);
}

// Função para a ação que você deseja executar
minhaAcao = () => {
// Adicione sua lógica de ação aqui
console.log('Ação executada!');
};

// Defina a função addStageChanges
async addStageChanges ()  {
console.log('Clicou no ícone de adição');
window.toast('Click Add ️', 4000);
};

// Método para mostrar menu action
actionMenu(){
// CONTEÚDO MENU
console.log('Clicou no MENU');
window.toast('Click MENU', 4000);
}

// unico que funciona
// Método inicializar o REPOSITÓRIO .
async initRepo() {

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
'https://example.com/help/'
);
window.toast('Click Repo ️', 4000);
};


async destroy() {
// Aqui você pode adicionar lógica para interromper a observação do diretório, se necessário
}
}

// Resto do código permanece o mesmo...

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