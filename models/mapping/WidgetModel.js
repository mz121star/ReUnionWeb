/**
 * 注册的Widget
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    /***
     * 根据Name查找widget，规则为 widgets/[Name]/index.html
     */
    Name:String,
    Description:String,
    /***
     * 可选字段
     */
    ThumbPicUrl:String,
    /***
     * 可选字段，留以后使用
     */
    WidgetUrl:String,
    CreateDate:Date
}, {collection: 'Widget'});

mongoose.model('Widget', schema);
