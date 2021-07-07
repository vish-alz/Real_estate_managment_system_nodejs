var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
autoIncrement = require('mongoose-auto-increment');



var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/greenhome', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
var db = mongoose.connection;
autoIncrement.initialize(db);
db.once("open", function () {
  console.log("Database created");
});
db.on("error", function (e) {
  console.log(e);
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require("./models/adminLogin");
require("./models/category");
require("./models/property");
require("./models/agent");
require("./models/user");
require("./models/agentDetails");

var adminController = require("./controller/adminController");
var app = express();

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

// view engine setup
app.use(express.static(__dirname + '/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(allowCrossDomain);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/upload', indexRouter);
app.use('/uploadproperty', indexRouter);

//admin API's
app.route("/createAdmin")
  .post(adminController.create_admin);

app.route("/loginAdmin")
  .post(adminController.admin_login);


//category API's

app.route("/category")
  .post(adminController.create_category)
  .get(adminController.list_categories);

app.route("/delCategory")
  .post(adminController.delete_category);

app.route("/editCategory")
  .post(adminController.get_category);

app.route("/updateCategory")
  .post(adminController.update_category);


//property API's  

app.route("/property")
  .post(adminController.create_properties)
  .get(adminController.list_properties);

app.route("/delproperty")
  .post(adminController.delete_property);

app.route("/getproperty")
  .post(adminController.get_properties);

app.route("/getSingleproperty")
  .post(adminController.get_single_property);

app.route("/getpropertyagent")
  .post(adminController.get_property_agent);

//agent API's

app.route("/agentAdmin")
  .post(adminController.create_agent)
  .get(adminController.list_agents);

app.route("/delagent")
  .post(adminController.delete_agent);


//User API's  

app.route("/user")
  .post(adminController.create_user)
  .get(adminController.list_users);


app.route("/userLogin")
  .post(adminController.user_login);




//agent API's

app.route("/agentLogin")
  .post(adminController.agent_login);

app.route("/agentRegister")
  .post(adminController.agent_register);

app.route("/agentData")
  .post(adminController.get_agent);

app.route("/editagentData")
  .post(adminController.get_agent_details);

app.route("/updateagentData")
  .post(adminController.update_agent);

module.exports = app;
