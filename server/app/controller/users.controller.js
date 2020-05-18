const db = require('../config/db.config.js');
const Users = db.users;
const Auth_token = db.auth_token;
var multer = require('multer');
var jwt = require('jsonwebtoken');
const sequelize = db.sequelize;


var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

var upload = multer({ storage : storage }).array('userPhoto',2);


// Post a User
exports.create = (req, res) => {	
	// Save to MySQL database
	let users = req.body;
	
	Users.create(users).then(result => {		
		// Send created user to client
		res.json(result);
	});
};


 
// Fetch all Users
exports.findAll = (req, res) => {
	Users.findAll({order: [
            ['id', 'DESC']
        ], where: {
	    [db.sequelize.Op.not]: [{id: req.params.id}],
	    [db.sequelize.Op.or]: [{role_id:2}]
	  }}).then(Users => {
	  // Send all Users to Client
	  res.json(Users);
	});
};

// Find a User by Id
exports.findById = (req, res) => {	
	Users.find({where: {id: req.params.userId},attributes: ['id', 'full_name', 'dob', 'email', 'designation', 'is_active']}).then(user => {
	
		res.json(user);
	})
};

//checkEmailExists
exports.checkEmailExists = (req, res)=> {
	console.log(req.query, 'req.query');
	if(req.query.id==0)
	{
		Users.find({where: {email: req.query.email.toString()},attributes: ['id']}).then(user => {
			res.json(user);
		})
	}else{
		sequelize.query("SELECT id from users where email='"+ req.query.email + "'  and id!="+req.query.id).then(function(data){
			console.log(data.length, 'data', data[0].length);
			if(data[0].length==0)
			{
				res.send(null)
			}else{
				res.json({status:true,result_code:2000
		        ,message:"Record fetched successfully"
		        ,data:data[0]});

			}
	  		});
	}
	
}
 
// Update a User
exports.update = (req, res) => {
	let user = req.body;
	let id = req.body.id;
	Users.update(user, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"updated successfully a user with id = " + id});
				   });	
};
 
// Delete a User by Id
exports.delete = (req, res) => {
	const id = req.params.userId;
	Users.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'deleted successfully a user with id = ' + id});
	});
};

// Delete a access_token
exports.logout = (req, res) => {
	const token = req.params.access_token;
	Auth_token.destroy({
	  where: { access_token: token }
	}).then(() => {
	  res.status(200).json({msg:'logout successfully.'});
	});
};

// authenticate user
exports.authenticate = (req, res) => {
	let access_data = {};
	Users.find({where: {email: req.query.email, password: req.query.password, is_active: 1},attributes: ['id', 'full_name', 'dob', 'email', 'designation', 'role_id']}).then(users => {
		if(users!=null)
		{
			var expiry = new Date();
  			expiry.setDate(expiry.getDate() + 7);

			  var access_token = jwt.sign({
			    email: req.query.email,
			    exp: parseInt(expiry.getTime() / 1000),
			  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!

			  users.dataValues.access_token = access_token;
			  access_data.user_id=users.id;
			  access_data.access_token = access_token;

			  Auth_token.destroy({
				  where: { user_id: users.id }
				}).then(result => {
				  Auth_token.create(access_data).then(result => {	;
					console.log(users, 'users')	
					// Send created user to client
						res.json(users);
					});
				});

				
			  
			//res.json(users);
		}else{
			res.status(401).json({message:'Invalid Login Credentials', data: {}});
		}
	})
};
