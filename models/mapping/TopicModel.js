var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    SearchCondition:{SourceType:Array,ProfessionalSite:Array},
    OwnerId:String,
    CreateDate:Date,
    UpdateDate:Date
}, {collection: 'Topic'});

mongoose.model('Topic', schema);
