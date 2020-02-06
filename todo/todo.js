let listEntry = document.querySelector('input');
let todoList = document.querySelector('.container-list');
let submitBtn = document.querySelector('#submit-btn');
let clearBtn = document.querySelector('#clear-btn');
//Create object to maintain todo items;
let todo = {};
//Add event listeners to add todo items
listEntry.addEventListener('keypress',enterItem);
submitBtn.addEventListener('click', submitItem);

//Add event listeners to remove todo items and cross out todo items
clearBtn.addEventListener('click', clearList);

//Check localstorage if there are items in localstorage build out todo variable with the todo items using submitItem function.
function init() {
    let storage = JSON.parse(localStorage.getItem('todo-list')) || {};
    if (Object.keys(storage).length > 0) {
        for (key in storage) {
            console.log(storage[key].checked);
            submitItem(storage[key].value, storage[key].checked);
        }
    }
}

function submitItem(value, checked = false) {
    let numItem = Object.keys(todo).length ? parseInt(Object.keys(todo)[Object.keys(todo).length -1]) + 1 : 1;
    value.length > 0 ? value : value = listEntry.value;
    if (value.length > 0) {
        todo[numItem] = {
            'value': value,
            'checked': checked,
        }
        localStorage.setItem('todo-list',JSON.stringify(todo))
        let newItem = `<div class="todo-list">
        <div class="todo-item" data-entry="${numItem}">
            <div class="item ${todo[numItem].checked ? "checked" : ""}">
                <p>${value}</p>
            </div>
            <div>
                <button class='btn check-btn ${todo[numItem].checked ? "uncheck-btn" : ""}'>${todo[numItem].checked ? "Uncheck" : "Check"}</button>
            </div>
            <div class="${todo[numItem].checked ? "" : "hidden"}">
                <button class='btn delete-btn'>Delete</button>
            </div>
        </div>
    </div>`;
        todoList.insertAdjacentHTML('beforeend',newItem);
        listEntry.value = "";
        
        let itemCheckBtn = document.querySelectorAll('.check-btn');
        itemCheckBtn[itemCheckBtn.length-1].addEventListener('click', checkItem);
        let itemDeleteBtn = document.querySelectorAll('.delete-btn');
        itemDeleteBtn[itemDeleteBtn.length-1].addEventListener('click', deleteItem);
    }
}

function enterItem(e) {
    if (e.charCode === 13) {
        submitItem(listEntry.value);
    }
}

//function to clear all todo list items
function clearList() {
    todoList.innerHTML = ""
    localStorage.clear();
    todo = {};
}

function checkItem(e) {
    let itemNum = e.toElement.parentElement.parentElement.dataset.entry;
    todo[itemNum].checked = todo[itemNum].checked ? false : true;
    localStorage.setItem('todo-list', JSON.stringify(todo));
    let buttonElement = e.toElement;
    let todoItemClass = e.toElement.parentElement.previousElementSibling.classList;
    todoItemClass.toggle('checked');
    let deleteBtnClass = e.toElement.parentElement.nextElementSibling
    deleteBtnClass.classList.toggle('hidden')
    buttonElement.classList.toggle('uncheck-btn');
    
    if (buttonElement.innerText === 'Check') {
        buttonElement.innerText = 'Uncheck';
    }

    else {
        buttonElement.innerText = 'Check';
    }
}

function deleteItem(e) {
    //use dataset of entry to locate the key that needs to be deleted from the todo list.
    let itemNum = e.toElement.parentElement.parentNode.dataset['entry'];
    delete todo[itemNum];
    //remove todo item from DOM
    e.toElement.parentElement.parentNode.parentNode.remove()
    // update localstorage.
    localStorage.setItem('todo-list',JSON.stringify(todo));
}

init();