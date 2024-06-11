describe('Task Management', () => {
  beforeEach(() => {
    // Visit the Task Management application before each test
    cy.visit('http://127.0.0.1:5500/public/') 
  })

  it('should load the application', () => {
    cy.get('h1').should('contain', 'Task Management')
  })

  it('should create a new task', () => {
    cy.get('#task-form input[name="title"]').type('Test Task')
    cy.get('#task-form textarea[name="description"]').type('This is a test task.')
    cy.get('#task-form input[name="dueDate"]').type('2024-06-15')
    cy.get('#task-form select[name="status"]').select('To Do')

    cy.get('#task-form').then(form => {
      form.on('submit', event => {
        event.preventDefault()
      })
    })
    cy.get('#task-form button[type="submit"]').click()


    cy.get('.task').should('contain', 'Test Task')
    cy.get('.task').should('contain', 'This is a test task.')
    cy.get('.task').should('contain', '15.06.2024')
    cy.get('.task').should('contain', 'To Do')
  })

  it('should read and display tasks', () => {
    cy.get('.task').should('have.length.at.least', 1)
  })

  it('should update an existing task', () => {
    // Add a new task first
    cy.get('#task-form input[name="title"]').type('Task to be Updated')
    cy.get('#task-form textarea[name="description"]').type('Update this task.')
    cy.get('#task-form input[name="dueDate"]').type('2024-06-20')
    cy.get('#task-form select[name="status"]').select('In Progress')
    cy.get('#task-form ').then(form => {
      form.on('submit', e => {
        e.preventDefault()
      })
    })
    cy.get('#task-form button[type="submit"]').click()

    // Edit the task
    cy.get('.task').contains('Task to be Updated').parents('li').find('.edit_task').click()
    cy.get('#edit-title').clear().type('Updated Task')
    cy.get('#edit-description').clear().type('This task has been updated.')
    cy.get('#edit-dueDate').clear().type('2024-07-01')
    cy.get('#edit-status').select('Done')

    cy.get('#edit-task-form').then(form => {
      form.on('submit', event => {
        event.preventDefault()
      })
    })
    cy.get('#save_changes').click()

    // Validate the task has been updated
    cy.get('.task').should('contain', 'Updated Task')
    cy.get('.task').should('contain', 'This task has been updated.')
    cy.get('.task').should('contain', '01.07.2024')
    cy.get('.task').should('contain', 'Done')
  })

  it('should delete a task', () => {
    // Add a new task first
    cy.get('#task-form input[name="title"]').type('Task to be Deleted')
    cy.get('#task-form textarea[name="description"]').type('Delete this task.')
    cy.get('#task-form input[name="dueDate"]').type('2024-06-25')
    cy.get('#task-form select[name="status"]').select('To Do')

    cy.get('#task-form').then(form => {
      form.on('submit', event => {
        event.preventDefault()
      })
    })
    cy.get('#task-form button[type="submit"]').click()

    // Delete the task
    cy.get('.task').contains('Task to be Deleted').parents('li').find('.delete_task').click()

    // Validate the task has been deleted
    cy.get('.task').should('not.contain', 'Task to be Deleted')
  })
})
