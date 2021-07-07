var mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

var agentDetailsSchema = new Schema({

    agent_id:
    {
        type: Number,
        require: "Enter agentID"
    },
    agent_email:
    {
        type: String
    },
    agent_password:
    {
        type: String
    },
    agent_name: {
        type: String
    },
    
    agent_location:
    {
        type: String
    },
    agent_phone:
    {
        type: String
    },
    agent_image:
    {
        type:String
    }
});

agentDetailsSchema.plugin(autoIncrement.plugin, {
    model: 'agentdetails',
    field: 'agent_id',
    startAt: 1001,
    incrementBy: 1
});

module.exports = mongoose.model('agentdetails', agentDetailsSchema);