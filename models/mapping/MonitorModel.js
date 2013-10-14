var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Url:String,
    Type:String

}, {collection: 'Monitor'});

mongoose.model('Monitor', schema);
