module.exports = (sequelize, Sequelize) => {
	const Auth_token = sequelize.define('auth_tokens', {
	  access_token: {
			type: Sequelize.STRING
	  },
	  user_id: {
		  type: Sequelize.STRING
	  }
	},{
	    timestamps: false
	});
	
	return Auth_token;
}