export function getCurrentFileType(session){
/*
    returns the file type of current file
    */
const sName = session.getMode().$id;
const sParts = sName.split("/");
return sessionNmeParts[sessionNmeParts.length - 1];
}



areaFiles.innerHTML = `
<ul>
<li>${iconClass}</li>
<li>${filename}</li>
<li>path/file.js</li>
<li>U</li>
</ul>


`;

// CONTEÚDO DE 'STAGING'
tag('div', {
className: 'tile',
children: [
     // icon
     tag('i', {
     className: 'icon folder',
     }),
     // título
     tag('span', {
     className: 'text-sc',
     textContent: 'STAGING'
     }),
     // action ícone
     tag('span', {
     className: 'icon more_vert',
     id: '',
     onclick: () => this.actionMenu(),
     })
]
}),

// AREA DOS ARQUIVOS STAGING
tag('div', {
  className: 'tile container-area-file',
 children: []
}),

// CONTEÚDO DE CHANGES'
tag('div', {
className: 'tile light',
children: [
// icon
tag('span', {
className: 'icon folder',
}),
// título
tag('span', {
className: 'text-sc',
textContent: 'CHANGES'
}),
// action ícone
tag('span', {
className: 'icon more_vert',
id: '',
onclick: () => this.actionMenu(),
})
]
}),

// AREA DOS ARQUIVOS CHANGES
tag('div', {
className: 'tile container-area-file',
children: [],
id: 'files-changes'
}),

// CONTEÚDO DE STAGED-CHANGES'
tag('div', {
className: 'tile light',
children: [
// icon
tag('span', {
className: 'icon folder',
}),
// título
tag('span', {
className: 'text-sc',
textContent: 'STAGED-CHANGES'
}),
// action ícone
tag('span', {
className: 'icon more_vert',
id: ''
})
]
}),

// AREA DOS ARQUIVOS STAGED-CHANGES
tag('div', {
className: 'tile container-area-file',
children: [],
id: 'files-staged-changes'
}),




const createListItem = (file) => {
const $listItem = tag('div', {
className: 'tile files'
});
const iconClass = acode.require('helpers').getIconForFile(file.filename);
const $icon = tag('span', {
className: `file-icon ${iconClass}`
});
const $filename = tag('span', {
 className: 'file-name'
textContent: file.filename
});


return $listItem;
};