var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({

    SalePrice : String,
    FromSite : String,
    ProductURL : String,
    Price : String,
    ProductId : String,
    ImageURL : String,
    CommentURL : String,
    FromType : String,
    CrawlerTime : Date,
    Brand : String,
    category : String,
    Retailer : String,
    Name : String


}, {collection: 'ResultData_Max_new_Shop'});

mongoose.model('FeedsShop', schema);
