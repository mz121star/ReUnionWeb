var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({

}, {collection: 'ResultData_Max'});

mongoose.model('Feeds', schema);
