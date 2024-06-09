import { addTaskToList } from './taskList.js'

export const taskForm = () => {
    const taskForm = document.forms.fmData
    taskForm.onsubmit = (event) => {
        event.preventDefault()
        let task = {}
        const fm = new FormData(event.target)
        fm.forEach((value, key) => {
            task[key] = value
        }) 
        addTaskToList(task)
        taskForm.reset()
    }
}
