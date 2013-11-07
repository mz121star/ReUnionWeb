var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Description:String

}, {collection: 'TopicGroup'});

mongoose.model('TopicGroup', schema);
