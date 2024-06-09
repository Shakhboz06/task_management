let tasks = []

export const taskList = () => {
    renderTaskList()
}

export const addTaskToList = task => {
    tasks.push(task)
    renderTaskList()
}

export const renderTaskList = () => {
    const taskList = document.getElementById('task-list')
    taskList.innerHTML = ''

    tasks.forEach((task, index) => {
        const elem = document.createElement('li')
        elem.className = 'task'
        const date = new Date(task.dueDate).toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' })
        elem.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <span>${task.description}</span>
        <p>Due Date: ${date}</p>
        <p>Status: <span class="${task.status === "To Do" ? "red" : task.status === "In Progress" ? "blue" : "green"}">${task.status}</span></p>
      </div>
      <div class="btns">
        <button onclick="editTask(${index})" class="edit_task">Edit</button>
        <button onclick="deleteTask(${index})" class="delete_task">Delete</button>
      </div>`
        elem.querySelector('.edit_task').onclick = () => editTask(index)
        elem.querySelector('.delete_task').onclick = () => deleteTask(index)
        taskList.append(elem)
    })
}

const deleteTask = index => {
    tasks.splice(index, 1)
    renderTaskList()
}

const editTask = index => {
    const task = tasks[index]
    const modal = document.getElementById('editModal')
    modal.classList.add('active')

    document.getElementById('edit-title').value = task.title
    document.getElementById('edit-description').value = task.description
    document.getElementById('edit-dueDate').value = task.dueDate
    document.getElementById('edit-status').value = task.status
    document.getElementById('edit-task-form').onsubmit = (event) => {
        event.preventDefault()
        saveChanges(index)
    }
}

const saveChanges = index => {
    tasks[index] = {
        title: document.getElementById('edit-title').value,
        description: document.getElementById('edit-description').value,
        dueDate: document.getElementById('edit-dueDate').value,
        status: document.getElementById('edit-status').value,
    }

    document.getElementById('editModal').classList.remove('active')
    renderTaskList()
}

document.querySelector('.close').onclick = () => document.getElementById('editModal').classList.remove('active')

