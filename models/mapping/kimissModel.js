var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    namespace:String
}, {collection: 'kimiss'});

mongoose.model('kimiss', schema);
