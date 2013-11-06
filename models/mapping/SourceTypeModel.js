var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    name:String

}, {collection: 'SourceType'});

mongoose.model('SourceType', schema);
