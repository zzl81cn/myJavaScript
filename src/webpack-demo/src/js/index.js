require('../css/index.css');

function create(){
    const elem = document.createElement('div');
    elem.classList.add('box');
    elem.innerHTML = 'Hello World haha1';
    document.body.appendChild(elem);
}
create();
