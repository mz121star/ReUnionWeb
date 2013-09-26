var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {

    FeedsModel
        .find()
        /*.limit(20)
        .select('childs')*/
        .exec(function (err, feeds) {
            return res.json(feeds);
        });
};
exports.sourcetype=function(req,res){
    FeedsModel
        .find()
        /*.limit(20)
         .select('childs')*/
        .distinct('FromType',function (err, feeds) {
            return res.json(feeds);
        });
}