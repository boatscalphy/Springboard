//Create localstorage

let listEntry = document.querySelector('input');
let todoList = document.querySelector('.container-list');
let submitBtn = document.querySelector('#submit-btn');
let clearBtn = document.querySelector('#clear-btn');

//Add event listeners to add todo items
listEntry.addEventListener('keypress',enterItem);
submitBtn.addEventListener('click', submitItem);

//Add event listenes to remove todo items and cross out todo items
clearBtn.addEventListener('click', clearList);

function submitItem() {
    if (listEntry.value.length > 0) {
        let newItem = `<div class="todo-list">
        <div class="todo-item">
            <div class="item">
                <p>${listEntry.value}</p>
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
        submitItem();
    }

}

function clearList() {
    todoList.innerHTML = ""
}

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
