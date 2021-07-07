var mongoose = require('mongoose');
var Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

var propertySchema = new Schema({
    cat_id: {
        type: Number,
        required: 'Enter CategoryID'
    },
    property_id: {
        type: Number,
        required: 'Enter propertyID'
    },
    property_title: {
        type: String,
        required: 'Enter property Name'
    },
    property_image:
    {
        type: String
    },
    location:
    {
        type: String
    },
    valid_for:
    {
        type:String
    },
    valid_on:
    {
        type:String
    },
    price:
    {
        type:String
    },
    timings:
    {
        type:String
    },
    details:
    {
        type:String
    },
    agent_id:
    {
        type:Number
    }
});

propertySchema.plugin(autoIncrement.plugin, {
    model: 'propertys',
    field: 'property_id',
    startAt: 101,
    incrementBy: 1
});

module.exports = mongoose.model('propertys', propertySchema);