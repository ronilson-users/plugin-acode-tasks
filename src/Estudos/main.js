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


// init repo
function handleInitializeRepository() {
this.credencialRepo();
}




// Cria o contêiner principal da barra lateral
this.$containerControl = tag('div', { className: 'sidebar-control' });

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
onclick: handleInitializeRepository.bind(this),
}),

// botoes para acoes
tag("button", {
className: 'icon  btn-add',
onclick: function() {
// Seleciona o menu suspenso pelo seu ID
console.log("Elemento '.dropdown-menu' clicado");
const dropdownMenu = document.getElementById('dropMenu');
if (dropdownMenu) {
// Toggle a visibilidade do menu suspenso
dropdownMenu.classList.toggle('show');
} else {
console.error("Elemento '.dropdown-menu' não encontrado.");
}
}
}),


]

});

// Cria o menu suspenso
const dropdownMenu = tag('div', {
className: 'dropdown-menu',
id: 'dropMenu',
children: [
tag('span', { textContent: 'Opção 1' }),
tag('span', { textContent: 'Opção 2' }),
tag('span', { textContent: 'Opção 3' })
// Adicione mais itens de menu conforme necessário
]
});

// Adiciona o menu suspenso ao cabeçalho
$header.appendChild(dropdownMenu);

// Adicionina botão init ao cabeçalho
$header.appendChild($initRepo);

// Recupera os aequivos para staging
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

// Lista de arquivo na área de Staging
const $listItem = tag('div', {
id: 'staging-files',
className: 'telha-files files-area ',
children: [
// tipo de arquivo
tag('span', {
className: `file-icon ${iconClass}`
}),

// Nome do arquivo e path do arquivo
tag('span', {
className: 'files-sub text-sc',
children: [
 
tag('span', {
className: 'text-sc',
textContent: file.filename,
}),

tag('span', {
className: 'file-path',
textContent: file.directory,
}),
],
}),

// action-staging-file
tag('span', {
className: 'action-staging',
textContent: 'U',
}),

// ver arquivo diff
tag("span", {
className: 'icon documents',
}),

// Criação do botão e adição do evento de clique
tag("span", {
className: 'icon add ',
onclick: (event) => {
event.stopPropagation(); // Evita que o clique propague para o elemento pai
// Adicione aqui a ação específica para o botão
console.log(`Botão clicado para o arquivo: ${file.filename}`);
// Criar e exibir o menu suspenso específico para o arquivo
const contextMenu = createContextMenu(file);
contextMenu.style.left = `${event.pageX}px`;
contextMenu.style.top = `${event.pageY}px`;
document.body.appendChild(contextMenu);
// Evento para fechar o menu suspenso quando o usuário clicar fora dele
document.addEventListener('click', closeContextMenu);
}
}),
],
});

return $listItem;
};

// Função para criar o menu suspenso específico para o arquivo clicado
const createContextMenu = (file) => {
const $contextMenu = tag('ul', {
className: 'context-menu',
children: [

tag('li', {
textContent: 'Editar',
onclick: () => {
// Ação específica para editar o arquivo
console.log(`Editar ${file.filename}`);
}
}),
tag('li', {
textContent: 'Excluir',
onclick: () => {
// Ação específica para excluir o arquivo
console.log(`Excluir ${file.filename}`

);
},
children: [
tag('i', {
className: 'icon copy'
}),

]
}),
tag('li', {
 className: 'icon clclose-current-tab',
textContent: 'Fechar',
onclick: () => {
// Ação para fechar $contextMenu


},
children: [
tag('i', {
className: 'icon copy'
}),

]
}),
]
});
return $contextMenu;
};

// Função para fechar o menu suspenso quando o usuário clicar fora dele
const closeContextMenu = () => {
const contextMenu = document.querySelector('.context-menu');
if (contextMenu) {
contextMenu.parentNode.removeChild(contextMenu); // Remove o menu suspenso
}
// Remove o evento de fechar o menu suspenso
document.removeEventListener('click', closeContextMenu);
};



// Criação dos elementos Staging
const $staging = tag('div', {

className: 'telha staging',
children: [

// icon
tag('i', {
className: 'icon keyboard_arrow_down',
}),

// título
tag('span', {
className: 'text-sc',
textContent: 'STAGING',

}),

// cont files
tag('span', {
className: 'cont-files',
textContent: '1'
}),

// action ícone
tag("i", {
className: 'icon more_vert btn-add',
onclick: function() {
// Seleciona o menu suspenso pelo seu ID
console.log("Elemento '.dropdown-menu' clicado");
const dropdownMenu = document.getElementById('dropMenu');
if (dropdownMenu) {
// Toggle a visibilidade do menu suspenso
dropdownMenu.classList.toggle('show');
} else {
console.error("Elemento '.dropdown-menu' não encontrado.");
}
}



}),


]
});

// Criar lista de itens de arquivo para a área de Staging
const stagingListItems = stagingFiles.map(file => createListItem(file));





// Criação dos elementos CHANGES
const $changes = tag('div', {
className: 'telha staging',
children: [

// icon
tag('i', {
className: 'icon keyboard_arrow_down',
}),

// título
tag('span', {
className: 'text-sc',
textContent: 'CHANGES'
}),

// cont files
tag('span', {
className: 'cont-files',
textContent: '1'
}),

// action ícone
tag("span", {
className: 'icon more_vert btn-add',

}),

]
});


// Criação dos elementos STAGED CHANGES
const $stagedChanges = tag('div', {
className: 'telha staging',
children: [

// icon
tag('i', {
className: 'icon keyboard_arrow_down',
}),

// título
tag('span', {
className: 'text-sc',
textContent: ' STAGED CHANGES'
}),

// cont files
tag('span', {
className: 'cont-files',
textContent: '1'
}),

// action ícone
tag("span", {
className: 'icon more_vert btn-add',

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
$changes,
$stagedChanges

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
tag("span", {
className: 'telha icon add ',

}),


]
});



// Adiciona o cabeçalho e a área de conteúdo ao contêiner principal
this.$containerControl.append(
...[
$header,
this.$containerArea,
this.$containerFooter]
);


// Adiciona o contêiner de controle à barra lateral
sidebarApps.add('sidebar-icon', 'sidebar-app-control', 'Sidebar', (app) => {
app.append(this.$containerControl);
});
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


// Método credencial do REPOSITÓRIO .
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