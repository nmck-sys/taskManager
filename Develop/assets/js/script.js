// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Create a function to generate a unique task id
function generateTaskId() {
    const id = nextId++;
    localStorage.setItem('nextId', JSON.stringify(nextId));
    return id;
}

// Function to create a task card
function createTaskCard(id, title, date, description) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.setAttribute('data-id', id);

    taskCard.innerHTML = `
        <h3>${title}</h3>
        <p>${date}</p>
        <p>${description}</p>
        <button class="delete-btn" data-id="${id}">Delete</button>
    `;
    return taskCard;
}

// Function to render the task list
function renderTaskList() {
    const lists = ['to-do', 'in-progress', 'done'];
    lists.forEach(lane => {
        const taskContainer = document.getElementById(`${lane}-cards`);
        if (taskContainer) {
            taskContainer.innerHTML = '';
            const filteredTasks = taskList.filter(task => task.status === lane);
            filteredTasks.forEach(task => {
                const taskCard = createTaskCard(task.id, task.Title, task.Date, task.Description);
                taskContainer.appendChild(taskCard);
            });
        } else {
            console.error(`Element with ID ${lane}-cards not found.`);
        }
    });

    // Make tasks draggable and lanes droppable after rendering
    makeTasksDraggable();
    makeLanesDroppable();

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            const taskId = this.getAttribute('data-id');
            handleDeleteTask(taskId);
        });
    });
}

// Function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault(); // Prevent the default form submission

    const Title = document.getElementById('taskTitle').value;
    const Date = document.getElementById('taskDate').value;
    const Description = document.getElementById('taskDescription').value;

    const status = 'to-do';

    const addnewTask = {
        id: generateTaskId(),
        Title: Title,
        Date: Date,
        Description: Description,
        status: status
    };

    taskList.push(addnewTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle deleting a task
function handleDeleteTask(taskID) {
    const numericTaskID = Number(taskID); // Convert the taskID to a number
    taskList = taskList.filter(task => task.id !== numericTaskID);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = Number($(ui.helper).data('id')); // Get the task ID of the dragged task

    const dropTarget = $(this).closest('.card-body'); // Find the closest parent with class 'card-body'
    let newStatus = dropTarget.parent().attr('id'); // Get the ID of the parent card (like "to-do", "in-progress", or "done")

    if (!newStatus) {
        console.error('Drop target does not have a valid id attribute');
        return;
    }

    newStatus = newStatus.replace('-cards', ''); // Extract the new status from the lane's ID
    const task = taskList.find(task => task.id === taskId); // Find the task in the list

    if (task) {
        task.status = newStatus; // Update the task's status in the taskList
        localStorage.setItem('tasks', JSON.stringify(taskList)); // Save the updated taskList to localStorage

        $(ui.helper).remove(); // Remove the cloned helper (dragged item)
        $(`[data-id="${taskId}"]`).remove(); // Remove the original task card from its previous lane

        renderTaskList(); // Re-render the task list to reflect the changes
    }
}

// Function to make tasks draggable
function makeTasksDraggable() {
    $('.task-card').draggable({
        revert: 'invalid',
        helper: 'clone',
        start: function (event, ui) {
            $(ui.helper).css('z-index', 100);
        }
    });
}

// Function to make lanes droppable
function makeLanesDroppable() {
    $('.card-body').droppable({
        accept: '.task-card',
        hoverClass: 'lane-hover',
        drop: handleDrop
    });
}

// Function to clear all tasks
function clearAllTasks() {
    taskList = [];
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
}

$(document).ready(function () {
    $("#taskDate").datepicker({
        dateFormat: "yy-mm-dd"
    });

    $('#addButton').on('click', () => {
        $('#formModal').modal('show');
    });

    $('#taskForm').on('submit', handleAddTask); // Ensure this is correctly set up

    renderTaskList(); // Initial render of the task list
});