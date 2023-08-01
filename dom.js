/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advanceWalkBtn');
    element.addEventListener('click', function () {
        advanceWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advanceModifyBtn');
    element.addEventListener('click', function () {
        advanceModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });


    element = document.getElementById('advancedAddBtn');
    element.addEventListener('click', function () {
        advancedAdd();
    });


    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeDeleteBtn');
    element.addEventListener('click', function () {
        safeDelete();
    });

    element = document.getElementById('deleteBySelector');
    element.addEventListener('click', function () {
        deleteBySelector();
    });

    element = document.getElementById('basicClone');
    element.addEventListener('click', function () {
        clone();
    });

    element = document.getElementById('advancedClone');
    element.addEventListener('click', function () {
        advancedClone();
    });
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);
}

function advanceWalk() {
    let root;
    root = document.documentElement;
    traverseDOM(root,0);
}

//recursively traverse the DOM
function traverseDOM(element,level) {

    let nodeName = element.nodeName;
    var textField = document.getElementById('myTextField');
    textField.value += `(${level})`;
    textField.value += nodeName;
    textField.value += "\n";
    
    level++;

    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];

        //levels determines how many indentation 
        for (let i = 0; i < level; i++) {
            textField.value += "    ";
        }

        traverseDOM(child,level);
    }
}


function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    var textField = document.getElementById('myTextField');
    textField.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`;
    textField.value += `\n-------------------\n`;
    
    console.log(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"
}

function advanceModify() {

    //part 1
    let element = document.getElementById('myHeading1');
    element.textContent = 'DOM Manipulation is Fun!';

    //part 2
    let randomValue = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    let colorValue = "--darkcolor" + randomValue;
    const root = document.querySelector(':root');
    const color = getComputedStyle(root).getPropertyValue(colorValue); 
    element.style.color = color;
    alert(color);

    //part 3
    const ps = document.querySelectorAll('p');
    ps.forEach(p => {
        p.classList.toggle('shmancy');
    });
}


function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function advancedAdd() {

    const element = document.getElementById('selectToAdd');
    const selected = element.value;

    const date = new Date();
    const formattedDate = date.toLocaleString(); 

    let newElement;
    if (selected == "text") {
        const content = "New Text Node " + formattedDate + "\n";
        newElement = document.createTextNode(content);
    }

    else if (selected == "comment") {
        const content = "New Comment " + formattedDate;
        newElement = document.createComment(content);
    }

    else {
        newElement = document.createElement('p');
        newElement.textContent = 'New Element ' + formattedDate;    
        newElement.className = 'new';
    }
    newElement.value += formattedDate;
    let addBox = document.getElementById('addBox');
    addBox.appendChild(newElement);
}


function remove() {
  document.body.removeChild(document.body.lastChild);
}


function safeDelete() {
    let element = document.body.lastChild;
    
    if (element.id == "controls") {
        
        if (element.previousElementSibling)  {
            console.log("got here");
            document.body.removeChild(element.previousElementSibling);
        }
        else {
            alert("warning: nothing left to delete!");
        }

    } else {
        document.body.removeChild(element);
    }

    console.log("deleting<" + element.nodeName + "> :" + element.nodeValue);
}

function deleteBySelector() {

    const selector = document.getElementById('deleteSelector').value;
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
        element.remove();
    });
}

function clone() {
    const toClone = document.getElementById('toClone');
    const cloned = toClone.cloneNode(true); 
    document.body.appendChild(cloned); 
}

function advancedClone() {
    const template = document.getElementById('template');
    const body = document.body;
    const card = template.content.cloneNode(true);

    const random = Math.floor(Math.random() * 1000) + 1;
    const title = "Card:" + random;
    const image = `https://source.unsplash.com/random/?software&` + random;
    const text = "This is a text for Card:" + random;

    card.querySelector('.card-title').textContent = title;
    card.querySelector('.card-image').src = image;
    card.querySelector('.card-text').textContent = text;

    body.appendChild(card);
}

window.addEventListener('DOMContentLoaded', init);