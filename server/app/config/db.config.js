const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.users = require('../model/users.model.js')(sequelize, Sequelize);
db.tasks = require('../model/tasks.model.js')(sequelize, Sequelize);
db.auth_token = require('../model/auth_token.model.js')(sequelize, Sequelize);


module.exports = db;