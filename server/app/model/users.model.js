module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define('users', {
	  full_name: {
			type: Sequelize.STRING
	  },
	  designation: {
			type: Sequelize.STRING
	  },
	  is_active: {
		  type: Sequelize.INTEGER
	  },
	  role_id: {
		  type: Sequelize.INTEGER
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  password: {
	  	type: Sequelize.STRING
	  },
	  dob: {
	  	type: Sequelize.DATE
	  },
	  created_at: {
	  	type: Sequelize.DATE
	  },
	  updated_at: {
	  	type: Sequelize.DATE
	  }
	},{
	    timestamps: false
	}
	);
	
	return Users;
}