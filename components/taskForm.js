import { addTaskToList } from './taskList.js'

// Function to handle the task form submission
export const taskForm = () => {
    // Get the form element by its name
    const taskForm = document.forms.fmData
    
    //Iterate over the FormData entries and populate the task object
    taskForm.onsubmit = (event) => {
        event.preventDefault()
        let task = {}
        const fm = new FormData(event.target)
        fm.forEach((value, key) => {
            task[key] = value
        }) 
        // Add the new task to the task list
        addTaskToList(task)
        //Resets the form fields to their initial state, clearing any input data
        taskForm.reset()
    }
}
