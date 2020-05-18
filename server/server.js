var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(function(req, res, next) {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
/*db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});*/

require('./app/route/users.route.js')(app);
require('./app/route/tasks.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

function initial(){

  let users = [
    {
      id: 1,
      firstname: "Joe",
      lastname: "Thomas",
      age: 36,
      email: "joe@mailinator.com"
    },
    {
      id: 2,
      firstname: "Peter",
      lastname: "Smith",
      age: 18,
      email: "peter@mailinator.com"
    },
    {
      id: 3,
      firstname: "Lauren",
      lastname: "Taylor",
      age: 31,
      email: "lauren@mailinator.com"
    },
    {
      id: 4,
      firstname: "Mary",
      lastname: "Taylor",
      age: 24,
      email: "mary@mailinator.com"
    },
    {
      id: 5,
      firstname: "David",
      lastname: "Moore",
      age: 25,
      email: "david@mailinator.com"
    },
    {
      id: 6,
      firstname: "Holly",
      lastname: "Davies",
      age: 27,
      email: "holly@mailinator.com"
    },
    {
      id: 7,
      firstname: "Michael",
      lastname: "Brown",
      age: 45,
      email: "michael@mailinator.com"
    }
  ]

  // Init data -> save to MySQL
  const Users = db.users;
  for (let i = 0; i < users.length; i++) { 
    Users.create(users[i]);  
  }
}