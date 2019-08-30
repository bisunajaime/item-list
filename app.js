var form = document.getElementById('addform');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');
var heading = document.getElementById('heading');
var nightMode = document.getElementById('dark');
var h3 = document.getElementsByClassName('h3');
var body = document.getElementById('body');
var btnSubmit = document.getElementById('btnSubmit');
var hr = document.querySelectorAll('[id=hr]');
var borderBlk = document.getElementsByClassName('border-black');
var input = document.getElementById('newInput');
var prompt = document.getElementsByClassName('prompt');
var item = document.getElementById('item');
var color = document.getElementById('color');

//validate input
item.addEventListener('keyup', function(e){
    if (parseInt(item.value) > 10 || parseInt(item.value) < 0){
        heading.innerHTML = "Invalid Input";
    }else{
        heading.innerHTML = "Item Lister";
    }
});
//form submit event
form.addEventListener('submit', addItem);
//delete event
itemList.addEventListener('click', removeItem);
// filter event
filter.addEventListener('keyup', filterItems);
//
var counter = 0;
input.addEventListener('click', function(e){
    var br = document.createElement('br');
    var label = document.createElement('label');
    var inputField = document.createElement("input");
    var container = document.getElementById('inputFields');
    var limit = document.getElementsByClassName('add');
    if(limit.length <= 4){
        label.innerHTML = "New Input";
        inputField.type = "text";
        inputField.className = "form-control add";
        inputField.name = "newInput";
        inputField.id = "input";
        container.appendChild(label);
        container.appendChild(inputField)
        container.appendChild(br);
    }else{
        counter++;
        prompt[0].classList.add('alert');
        prompt[0].classList.add('alert-danger');
        prompt[0].innerHTML = `Limit of 5 input fields(<b>${counter}</b> times clicked)`;
    }
});
nightMode.addEventListener('click', function(e){
    if (body.className == 'active') {
        //dark
        var rd = generateRandNum(150, 255);
        var gd = generateRandNum(150, 255);
        var bd = generateRandNum(150, 255);
        //light
        var rl = generateRandNum(0, 100);
        var gl = generateRandNum(0, 100);
        var bl = generateRandNum(0, 100);
        var backCol = heading.style.backgroundColor = `rgb(${rl}, ${gl}, ${bl})`;
        var headCol = heading.style.color = `rgb(${rd}, ${gd}, ${bd})`;
        btnSubmit.style.backgroundColor = headCol;
        btnSubmit.style.color = backCol;
        for(var i = 0; i < hr.length; i++){
            hr[i].style.backgroundColor = headCol;
        }
        for(var i = 0; i < borderBlk.length; i++){
            borderBlk[i].style.border = `1px solid ${headCol}`;
        }
        body.classList.remove('active');
        body.classList.toggle('dark');

        nightMode.innerHTML = `Night Mode Off (Colors: ${Math.round(rl)}, ${Math.round(gl)}, ${Math.round(bl)})`;

        colors.style.color = "white";
        colors.innerHTML = `(Dark): RGB(${Math.round(rl)}, ${Math.round(gl)}, ${Math.round(bl)})`;
    }else{
        //dark
        var rd = generateRandNum(150, 255);
        var gd = generateRandNum(150, 255);
        var bd = generateRandNum(150, 255);
        //light
        var rl = generateRandNum(0, 100);
        var gl = generateRandNum(0, 100);
        var bl = generateRandNum(0, 100);
        var backCol = heading.style.backgroundColor = `rgb(${rd}, ${gd}, ${bd})`;
        var headCol = heading.style.color = `rgb(${rl}, ${gl}, ${bl})`;
        btnSubmit.style.backgroundColor = headCol;
        btnSubmit.style.color = backCol;
        for (var i = 0; i < hr.length; i++) {
            hr[i].style.backgroundColor = headCol;
        }
        for (var i = 0; i < borderBlk.length; i++) {
            borderBlk[i].style.border = `1px solid ${headCol}`;
        }
        body.classList.remove('dark');
        body.classList.toggle('active');

        nightMode.innerHTML = `Night Mode On (Colors: ${Math.round(rd)}, ${Math.round(gd)}, ${Math.round(bd)})`;

        colors.style.color = "black";
        colors.innerHTML = `(Light): RGB(${Math.round(rd)}, ${Math.round(gd)}, ${Math.round(bd)})`;
    }
    heading.style.transition = '0.5s';
});
//
nightMode.addEventListener('click', function(e){
    for(var i = 0; i < h3.length; i++){
        h3[i].classList.toggle('dark-h3');
    }
    nightMode.classList.toggle('btn-secondary');
});

//generate random number for colors
function generateRandNum(min, max){
    return Math.random() * (max - min) + min;
}

//add item event
function addItem(e){
    e.preventDefault();
    //get inp val
    var newItem = document.getElementById('item').value;
    if(newItem.trim().length != 0){
        //create new li elem
        var li = document.createElement('li');
        li.className = 'list-group-item';
        // add text node with inp val
        li.appendChild(document.createTextNode(newItem));

        // create del btn elem
        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        // append text node
        deleteBtn.appendChild(document.createTextNode('X'));

        li.appendChild(deleteBtn);

        //append li to list
        itemList.appendChild(li);
        removePrompt();
    }else{
        prompt[0].classList.add('alert');
        prompt[0].classList.add('alert-danger');
        prompt[0].innerHTML = "Invalid Input.";
    }
    document.getElementById('addform').reset();
}

function removePrompt(){
    prompt[0].classList.remove('alert');
    prompt[0].classList.remove('alert-danger');
    prompt[0].innerHTML = "";
}

function removeItem(e){
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure?')) {
            // targets the parent element which is the li
            // button -> child of li' li -> parent of button
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
        
    }
}

function filterItems(e){
    // convert to lowercase
    var text = e.target.value.toLowerCase();
    // get list from ul
    var items = itemList.getElementsByTagName('li');
    // Convert to array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) > -1) {
            item.style.display = 'block';
            removePrompt();
        }else{
            prompt[0].classList.add('alert');
            prompt[0].classList.add('alert-danger');
            prompt[0].innerHTML = "Query not Found.";
            prompt[0].style.transition = "0.25s";
            item.style.display = 'none';
        }
    });
}