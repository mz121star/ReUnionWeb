var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Name:String,
    Keyword:String,
    SearchCondition:{
        SourceType:Array,
        ProfessionalSite:Array,
        StartDate:Date,
        EndDate:Date
    },
    OwnerId:String,
    CreateDate:Date,
    UpdateDate:Date
}, {collection: 'Topic_ge'});

mongoose.model('Topic', schema);
