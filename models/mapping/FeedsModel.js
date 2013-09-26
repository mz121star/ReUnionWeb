var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({

}, {collection: 'ResultData'});

mongoose.model('Feeds', schema);
