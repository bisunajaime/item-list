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

//form submit event
form.addEventListener('submit', addItem);
//delete event
itemList.addEventListener('click', removeItem);
// filter event
filter.addEventListener('keyup', filterItems);
//
nightMode.addEventListener('click', function(e){
    if (body.className == 'active') {
        var backCol = heading.style.backgroundColor = `rgb(${generateRandNum(0, 100)}, ${generateRandNum(0, 100)}, ${generateRandNum(0, 100)})`;
        var headCol = heading.style.color = `rgb(${generateRandNum(150, 255)}, ${generateRandNum(150, 255)}, ${generateRandNum(150, 255)})`;
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

        nightMode.innerHTML = "Day";
    }else{
        var backCol = heading.style.backgroundColor = `rgb(${generateRandNum(150, 255)}, ${generateRandNum(150, 255)}, ${generateRandNum(150, 255)})`;
        var headCol = heading.style.color = `rgb(${generateRandNum(0, 100)}, ${generateRandNum(0, 100)}, ${generateRandNum(0, 100)})`;
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

        nightMode.innerHTML = "Night";
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
    }else{
        alert('Invalid input');
    }
    document.getElementById('addform').reset();
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
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        }else{
            item.style.display = 'none';
        }
    })
    
}