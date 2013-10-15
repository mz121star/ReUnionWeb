var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    LongName:String,
    Description:String,
    Thumbnail  :String,
    Status:Number
}, {collection: 'Chart'});

mongoose.model('Chart', schema);
