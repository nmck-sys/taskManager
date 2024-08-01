// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
}

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
    const lists = ['todo', 'in-progress', 'done'];
    lanes.array.forEach(lists => {
        const taskContainer = document.getElementById();
        taskContainer.innerHTML = '';
        const filteredTasks = taskList.filter(task => task.status === lane);
        filteredTasks.forEach(task => {
            const taskCard = createTaskCard(task.id, task.Title, task.Date, task.Description);
            taskContainer.appendChild(taskCard);
        });
        $(taskContainer).sortable({
            connectWith: ".card-body",
            placeholder: "ui-state-highlight",
            revert: true,
            start: function (event, ui) {
                ui.placeholder.height(ui.item.height());
            },
            stop: function (event, ui) {
                handleDrop(event, ui);
            }
        }).disableSelection();
    });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();

    const Title = document.getElementById('taksTitle').value;
    const Date = document.getElementById('taskDate').value;
    const Description = document.getElementById('taskDescription').value;
    const status = 'todo';

    const addnewTask = {
        id: generateTaskId(),
        Title: Title,
        Date: Date,
        Description: Description,
        status: status
    };

    taskList.push(addnewTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(taskID){
    taskList = taskList.filter(task => task.id !== taskID);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = $(ui.item).data('id');
    const dropnewStatus = ui.item.closest('card-body').attr('id').replace('-cards', '');
    const task = taskList.find(task => task.id === taskId);
    if (task) {
        task.status = dropnewStatus;
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
$("taskDate").datepicker();
$('#addButton').on('click', () => {
    $('formModal').modal('show');
});
$('#taskForm').on('submit', handleAddTask);
renderTaskList();
});