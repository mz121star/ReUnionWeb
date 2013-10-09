var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Receiver:String,
    Type:String,
    Topics:Array,
    OwnerId:String,
    CreateDate:Date,
    UpdateDate:Date,
    Status:Number
}, {collection: 'SubReport'});

mongoose.model('Report', schema);
