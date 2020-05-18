module.exports = function(app) {
 
    const task = require('../controller/task.controller.js');
 
    // Create a new Task
    app.post('/api/task', task.create);

    // Update a User with Id
    app.put('/api/task', task.update);
 

    // Retrieve all Task
    app.get('/api/tasks', task.findAll);

    // Retrieve a single Task by Id
    app.get('/api/task/:id', task.findById);

    // Delete a Task with Id
    app.delete('/api/task/:id', task.delete);

    // Get Users Tasks
    app.get('/api/getUsersTasks/:id', task.getUsersTasks);
}