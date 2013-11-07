var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    FromUrl:String,
    FromType:String,
    FromSite:String,
    PublishTime:Date,
    CrawlerTime:Date,
    Title:String,
    Keyword:String,
    Content:String,
    Author:String,
    Semantic:String,
    Cleanout:Number,

    Sentiment:Number //-1, 0 ,1


}, {collection: 'ResultData_Max_new_ENG'});

mongoose.model('Feeds', schema);
