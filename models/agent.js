var mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

var agentSchema = new Schema({
    cat_id: {
        type: Number
    },
    deal_id: {
        type: Number
    },
    agent_id:
    {
        type:Number,
        require:"Enter agentID"
    },
    agent_name: {
        type: String
    },
    agent_desc:
    {
        type: String
    },
    agent_location:
    {
        type: String
    },
    agent_phone:
    {
        type:String
    },
    agent_image:
    {
        type:String
    }
});

agentSchema.plugin(autoIncrement.plugin, {
    model: 'agents',
    field: 'agent_id',
    startAt: 1001,
    incrementBy: 1
});

module.exports = mongoose.model('agents', agentSchema);