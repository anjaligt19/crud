module.exports = (sequelize, Sequelize) => {
	const Tasks = sequelize.define('tasks', {
	  name: {
			type: Sequelize.STRING
	  },
	  description: {
			type: Sequelize.STRING
	  },
	  status: {
		  type: Sequelize.INTEGER
	  },
	  user_id: {
		  type: Sequelize.STRING
	  }
	},{
	    timestamps: false
	});
	
	return Tasks;
}