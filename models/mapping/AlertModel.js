var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Keyword:String,
    IsRegex:Boolean,
    MailTo:String,
    SMSTo:String,
    Type:String,
    Topics:Array,
    AlertStartTime:Date,
    AlertEndTime:Date,
    OwnerId:String,
    CreateDate:Date,
    UpdateDate:Date,
    Status:Number
}, {collection: 'Alert'});

mongoose.model('Alert', schema);
