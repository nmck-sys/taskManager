// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return generate();
}
const taskID = generateTaskId();

// Todo: create a function to create a task card
function createTaskCard(Title, Date, Description) {
    const taskCard = document.createElement('div');
    taskCard.className = 'taskCard';
    const CardTitle = document.createElement('h3');
    CardTitle.textContent = Title;
    const dueDate = document.createElement('h4');
    dueDate.textContent = Date
    const cardDescription = document.createElement('p');
    cardDescription.textContent = Description;

    taskCard.appendChild(CardTitle);
    taskCard.appendChild(dueDate);
    taskCard.appendChild(cardDescription);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});