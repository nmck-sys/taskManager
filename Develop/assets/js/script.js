// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return generate();
}
const taskID = generateTaskId();

// Todo: create a function to create a task card
function createTaskCard(myID, Title, Date, Description) {
    const taskCard = document.createElement('div');
    taskCard.className = 'taskCard';
    taskCard.draggable = true;
    taskCard.dataset.id = myID


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
const taskContainer = document.getElementById('task-container');
taskContainer.innerHTML = '';
if (taskList) {
    taskList.forEach(task => {
        const taskCard = createTaskCard(task.id, task.Title, task.Date, task.Description);
        taskContainer.appendChild(taskCard);
    }); {
        
    };
}

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
    const addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', () => {
                console.log('button works');
            });
        };
    });