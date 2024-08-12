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


// Container SOURCE CONTROL 

containerSourceControl() {
// Cria o contêiner principal da barra lateral
this.$containerControl = tag('div', { className: 'sidebar-control' });

// Cria o cabeçalho da barra lateral com o título 'SOURCE CONTROL'
const $header = tag('div', {
className: 'header',
children: [
tag('h3', {
className: 'title-h',
textContent: 'SOURCE CONTROL'
})
]
});

// Cria os botões init repo dentro do contêiner de controle
const $initRepo = tag('div', {
className: 'source-control-buttons',
children: [
// Botão de inicialização do repositório
tag("button", {
textContent: "INITIALIZE REPOSITORY",
className: 'init-repo',
onclick: () => this.initRepo()
}),


tag("button", {
className: 'icon add btn-add',
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
})


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

// Adiciona botão init ao cabeçalho
$header.appendChild($initRepo);

// Adiciona o cabeçalho ao contêiner principal
this.$containerControl.appendChild($header);

// Adiciona a área de conteúdo ao contêiner principal
this.$stagingArea = tag('div', { className: 'container container-control' });

// MENU STAGING
const $staging = tag('div', {
className: 'telha staging',

});

const iconStaging = tag('span',{
 className: 'icon keyboard_arrow_down arrow_down',
 
id: 'iconArrow',
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
});
iconStaging.addEventListener('click', () => {
 
 const areaFiles = document.getElementById('files-area');
if (areaFiles) {
areaFiles.classList.toggle('hidden');
} else {
console.error('Elemento "staging-files" não encontrado.');
}

window.toast('Clicou em arrow', 2000);

})

const titleStaging = tag('span', {
className: 'text-sc',
textContent: 'STAGING',
onclick: () => this.collapsedArea()
});

const contFileStaging  = tag('span', {
className: 'cont-files',
textContent: '1'
})

const vertStaging = tag('div', { 
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
})

$staging.appendChild(iconStaging)
$staging.appendChild(titleStaging)
$staging.appendChild(contFileStaging)
$staging.appendChild(vertStaging)
 
 


// ADICIONA MENU STAGING
this.$stagingArea.appendChild($staging);

// Recebe a lista de  arquivo para a área de Staging
const stagingFiles = [

{ filename: 'file1.json', directory: 'path/file1.json' },
{ filename: 'file.js', directory: 'path/file.js' },
{ filename: 'file.html', directory: 'path/file.html' },
{ filename: 'file.scss', directory: 'path/file.scss' },
{ filename: 'file.ts', directory: 'path/file.ts' }

];

// Função para criar um item de lista para cada arquivo na área de Staging
const createListItem = (file) => {
const iconClass = acode.require('helpers').getIconForFile(file.filename);

const $listItem = tag('div', {
className: 'telha files-area',
children: [

tag('span', { className: `file-icon ${iconClass}` }),

tag('span', { className: 'text-sc', textContent: file.filename }),

tag('span', { className: 'file-path', textContent: file.directory }),

tag('span', { className: 'action-staging', textContent: 'U' }),

tag('span', {
className: 'icon add btn-add',
onclick: () => this.collapsedArea.bind(this)
})

]

});

return $listItem;
};

const $stagingList = tag('div', { className: 'staging-list',
id: 'staging-files'
});

stagingFiles.forEach(file => {
const $listItem = createListItem(file);
$stagingList.appendChild($listItem);
});



// ADICIONA O STAGINGLIST A ÁREA DE PREPARAÇÃO
this.$stagingArea.appendChild($stagingList);

// MENU CHANGES
const $changes = tag('div', {
className: 'telha staging',
children: [

tag("i", { className: 'icon folder' }),
tag('span', { className: 'text-sc', textContent: 'CHANGES' }),

tag("span", {
className: 'icon more_vert btn-add',
onclick: () => this.collapsedArea.bind(this)
})
]
});

// ADICIONA MENU CHANGES ÁREA PREPARAÇÃO
this.$stagingArea.appendChild($changes);

// Adiciona a área de preparação  ao contêiner principal
this.$containerControl.appendChild(this.$stagingArea);

// Adiciona o rodapé ao contêiner principal
this.$containerFooter = tag('div', {
className: 'footer',
children: [

tag("span", { textContent: 'error', className: 'icon warningreport_problem' }),

tag("span", {
className: 'telha icon add ',
onclick: () => this.collapsedArea.bind(this)
})
]

});




this.$containerControl.appendChild(this.$containerFooter);

// Adiciona o contêiner de controle à barra lateral
sidebarApps.add('sidebar-icon', 'sidebar-app-control', 'Sidebar', (app) => {
app.append(this.$containerControl);
});


};

// Método para ocultar area files
collapsedArea() {
console.log('Clicou em STAGING');


const areaFiles = document.getElementById('staging-files');
if (areaFiles) {
areaFiles.classList.toggle('hidden');
} else {
console.error('Elemento "staging-files" não encontrado.');
}

window.toast('Clicou em STAGING', 2000);
}

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