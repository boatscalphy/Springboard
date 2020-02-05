let todoItems = JSON.parse(localStorage.getItem('todo-list')) || [];
let listEntry = document.querySelector('input');
let todoList = document.querySelector('.container-list');
let submitBtn = document.querySelector('#submit-btn');
let clearBtn = document.querySelector('#clear-btn');

//Create object to maintain todo items;
let todo = {}
//Add event listeners to add todo items
listEntry.addEventListener('keypress',enterItem);
submitBtn.addEventListener('click', submitItem);

//Add event listeners to remove todo items and cross out todo items
clearBtn.addEventListener('click', clearList);

//Load todo items in localStorage
function init() {
    if (todoItems.length > 0) {
        for (items of todoItems) {

        }
    }
}

function submitItem(value) {
    value.length > 0 ? value : value = listEntry.value;
    if (value.length > 0) {
        todoItems.push(value);
        localStorage.setItem('todo-list',JSON.stringify(todoItems))
        let newItem = `<div class="todo-list">
        <div class="todo-item">
            <div class="item">
                <p>${value}</p>
            </div>
            <div>
                <button class='btn check-btn'>Check</button>
            </div>
            <div class='hidden'>
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

function clearList() {
    todoList.innerHTML = ""
    localStorage.clear();
    todoItems = [];
}

//Could have used event delegation instead -- potentially refactor later.
function checkItem(e) {
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
    e.toElement.parentElement.parentNode.parentNode.remove()
}