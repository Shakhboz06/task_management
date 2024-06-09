import { faker } from 'https://esm.sh/@faker-js/faker';
import { tasks } from './taskList.js';

const options = ['To Do', 'In Progress', 'Done']
for (let i = 0; i < 9; i++) {
    let obj = {
        title: faker.lorem.words(4),
        description: faker.lorem.words(5),
        dueDate: faker.date.future(),
        status: faker.helpers.arrayElement(options)
    }
    tasks.push(obj)
}

