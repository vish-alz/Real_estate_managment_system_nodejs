var mongoose = require('mongoose'),

AdminLogin = mongoose.model('adminlogins');
category = mongoose.model('categories');
property = mongoose.model('propertys');
agent = mongoose.model('agents');
user = mongoose.model('users');

agentDetails = mongoose.model('agentdetails');

//admin API's

exports.create_admin = function (req, res) {
  var admin = new AdminLogin(req.body);
  admin.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.admin_login = function (req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  AdminLogin.find({ $and: [{ "username": username }, { "password": password }] }, function (err, data) {
    if (err)
      res.send(err);
    if (data.length >0) {
      res.json({ "result": "success" });
    }
    else {
      res.json({ "result": "failed" });
    }
  });
};

//Category API's

exports.create_category = function (req, res) {
  var cat = new category(req.body);
  cat.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.list_categories = function (req, res) {
  category.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.delete_category = function (req, res) {
  category.remove({
    _id: req.body.id
  }, function (err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Data successfully deleted' });
  });
};

exports.get_category = function (req, res) {
  var id = req.body.id;
  category.find({ _id: id }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.update_category = function (req, res) {
  category.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};



//property API's

exports.create_properties = function (req, res) {
  var propertyData = new property(req.body);
  propertyData.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.list_properties = function (req, res) {
  property.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.delete_property = function (req, res) {
  property.remove({
    _id: req.body.id
  }, function (err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Data successfully deleted' });
  });
};


exports.get_properties = function (req, res) {
  var id = req.body.id;
  property.find({cat_id: id }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


//agent API's


exports.create_agent = function (req, res) {
  var agentData = new agent(req.body);
  agentData.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.list_agents = function (req, res) {
  agentDetails.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.delete_agent = function (req, res) {
  agent.remove({
    _id: req.body.id
  }, function (err, data) {
    if (err)
      res.send(err);
    res.json({ message: 'Data successfully deleted' });
  });
};


//user API's


exports.create_user = function (req, res) {
  var userData = new user(req.body);
  userData.save(function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.list_users = function (req, res) {
  user.find({}, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};


exports.user_login = function (req, res) {
  let username = req.body.user_email;
  let password = req.body.user_password;
  console.log(req.body);
  user.find({ $and: [{ "user_email": username }, { "user_password": password }] }, function (err, data) {
    if (err)
      res.send(err);
    if (data.length > 0) {
      res.json({ "result": "success" });
    }
    else {
      res.json({ "result": "failed" });
    }
  });
};



//Showproperty API

exports.get_single_property=function(req,res)
{
  var id = req.body.id;
  property.aggregate([
    {"$match":{"property_id":parseInt(id)}},
    {"$lookup":{
      "from":"agentdetails",
      "localField":"agent_id",
      "foreignField":"agent_id",
      "as":"propertyCompleteData"
    }}, 
  ]).exec(function(err,result)
  {
    if(err)
    {
      throw(err);
    }
    res.json(result);
  });
}


exports.get_property_agent = function (req, res) {
  let agentID = req.body.id;
  console.log(agentID);
  property.find({ "agent_id": agentID } , function (err, data) {
    if (err)
      res.send(err);
    
    res.json(data);
  });
};

//agent Section API

exports.agent_login = function (req, res) {
  let email = req.body.agent_email;
  let password = req.body.agent_password;
  agentDetails.find({ $and: [{ "agent_email": email }, { "agent_password": password }] }, function (err, data) {
    if (err)
      res.send(err);
    console.log(data);  
    if (data.length > 0) {
      res.json({ "result": "success","agentId":data[0].agent_id});
    }
    else {
      res.json({ "result": "failed" });
    }
  });
};


exports.agent_register = function (req, res) {
  var agent = new agentDetails(req.body);
  agent.save(function (err, data) {
   
        res.json({ "result": "success" });
      
  });
};

exports.get_agent = function (req, res) {
  let agentID = req.body.id;
  console.log(agentID);
  agentDetails.find({ "agent_id": agentID } , function (err, data) {
    if (err)
      res.send(err);
    
    res.json(data);
  });
};


exports.get_agent_details = function (req, res) {
  var id = req.body.id;
  agentDetails.find({ _id: id }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};

exports.update_agent = function (req, res) {
  agentDetails.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, data) {
    if (err)
      res.send(err);
    res.json(data);
  });
};
