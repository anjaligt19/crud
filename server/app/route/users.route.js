var multer = require('multer');
var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');

module.exports = function(app) {
 
    const users = require('../controller/users.controller.js');
 
    // Create a new User
    app.post('/api/users', users.create);

    // Check email exists or not
    app.get('/api/users/checkEmailExists/', users.checkEmailExists);
 
    // Retrieve all User
    app.get('/api/usersbyrole/:id', users.findAll);
 
    // Retrieve a single User by Id
    app.get('/api/users/:userId', users.findById);

    // Retrieve a single User by Id
    app.delete('/api/logout/:access_token', users.logout);

    

    //Autheticate
    app.get('/api/authenticate/', users.authenticate);
 
    // Update a User with Id
    app.put('/api/users', users.update);
 
    // Delete a Users with Id
    app.delete('/api/users/:userId', users.delete);

    
}