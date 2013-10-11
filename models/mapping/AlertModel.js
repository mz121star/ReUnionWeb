var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    IsRegex:Boolean,
    MailTo:String,
    SMSTo:String,
    Type:String,
    Topics:Array,
    OwnerId:String,
    CreateDate:Date,
    UpdateDate:Date,
    Status:Number
}, {collection: 'Alert'});

mongoose.model('Alert', schema);
