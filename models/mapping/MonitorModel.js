var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Url:String,
    Type:String,
    status:Number,
    Comment:String

}, {collection: 'Monitor'});

mongoose.model('Monitor', schema);
