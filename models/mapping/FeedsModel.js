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
    Cleanout:Number

}, {collection: 'ResultData_Max'});

mongoose.model('Feeds', schema);
