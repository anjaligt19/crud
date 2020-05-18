const db = require('../config/db.config.js');
const sequelize = db.sequelize;


var Request = require("request");
const Tasks = db.tasks;
// Post a Task
exports.create = (req, res) => {	
	// Save to MySQL database
	let tasks = req.body;
	console.log(tasks, 'req data');
	
	Tasks.create(tasks).then(result => {		
		// Send created user to client
		res.json(result);
	});
};

// Update a Task
exports.update = (req, res) => {
	let task = req.body;
	let id = req.body.id;
	Tasks.update(task, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a task with id = " + id});
				   });	
};

// Fetch all Tasks
exports.findAll = (req, res) => {
	sequelize.query("SELECT t.id,t.name,t.description,t.status,u.full_name FROM `tasks` as t LEFT JOIN users as u on u.id=t.user_id order by t.id desc").then(function(data){
	  	res.json({status:true,result_code:2000
        ,message:"Record fetched successfully"
        ,data:data[0]});
	});
};

// Find a Task by Id
exports.findById = (req, res) => {	
	Tasks.find({where: {id: req.params.id},attributes: ['id', 'name', 'description', 'status', 'user_id']}).then(user => {
	
		res.json(user);
	})
};

exports.getUsersTasks = (req, res)=> {
	let taskData = {};
	Tasks.findAll({where: {status: 0, user_id: req.params.id},attributes: ['id', 'name', 'description', 'status', 'user_id']}).then(toDoRes => {
		taskData.toDoTask = toDoRes;
		Tasks.findAll({where: {status: 1, user_id: req.params.id},attributes: ['id', 'name', 'description', 'status', 'user_id']}).then(inProgRes => {
				taskData.inProgTask = inProgRes;
				Tasks.findAll({where: {status: 2, user_id: req.params.id},attributes: ['id', 'name', 'description', 'status', 'user_id']}).then(compRes => {
						taskData.compTask = compRes;
						res.json(taskData);
				});
			});
		
	})
}



// Delete a Task by Id
exports.delete = (req, res) => {
	
	Tasks.destroy({
	  where: { id: req.params.id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a task with id = ' + req.params.id});
	});
};