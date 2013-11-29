/**
 * 注册的Widget
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    /***
     * 主要用来匹配路径的，根据Name查找widget，规则为 widgets/[Name]/index.html
     */
    Name:String,
    /***
     * Dashboard 的标题
     */
    Title:String,

    /***
     * 插件的尺寸，6,12
     */
    Size:String,
    /***
     * 插件的高度，6,12
     */
    Height:String,
    /***
     * 插件的描述
     */
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
