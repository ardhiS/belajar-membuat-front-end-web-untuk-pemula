const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

function addTaskToCompleted(taskElement) {
    const taskTitle = taskElement.querySelector('.inner > h2').innerText;
    const taskTimestamp = taskElement.querySelector('.inner > p').innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    listCompleted.append(newTodo);
    taskElement.remove();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = document.querySelector('.inner > h2').innerText;
    const taskTimestamp = taskElement.querySelector('.inner > p').innerText;
    
    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    listUncompleted.append(newTodo);
    taskElement.remove();
}

function removeTaskFromCompleted(taskElement) {
    taskElement.remove();
}

function createTrashButton() {
    return createdButton('trash-button', function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}


function createCheckButton() {
    return createdButton('check-button', function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}

function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);

    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;
    const todo = makeTodo(textTodo, timestamp);
    uncompletedTODOList.append(todo);
}


document.addEventListener('DOMContentLoaded', function(){
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function(event){
        event.preventDefault();
        addTodo();
    });
});

function makeTodo(data, timestamp, isCompleted) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = data;

    const textTimesstamp = document.createElement('p');
    textTimesstamp.innerText = timestamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimesstamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);

    if(isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
            );
    } else {
        container.append(createCheckButton());
    }

    return container;
}


function createdButton(buttonTypeClass, eventListener) {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', function(event){
        eventListener(event);
    });
    return button;
}

function createUndoButton () {
    return createdButton('undo-button', function(event){
        undoTaskFromCompleted(event.target.parentElement);
    })
}
