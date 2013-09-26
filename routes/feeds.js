var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {
    console.log(req.body.st);
    var sts = req.body.st ;
    if (sts) {
        var reg=new RegExp(sts,"i")
        FeedsModel
            .find({FromType: reg})
            .limit(20)
            /*.select('childs')*/
            .exec(function (err, feeds) {
                return res.json({
                    "feeds": feeds,
                    "count": feeds.length
                });
            });
    }
    else {
        FeedsModel
            .find()
            .limit(20)
            /*.select('childs')*/
            .exec(function (err, feeds) {
                return res.json({
                    "feeds": feeds,
                    "count": feeds.length
                });
            });
    }
};
exports.sourcetype = function (req, res) {
    FeedsModel
        .find()
        /*.limit(20)*/
        .select('FromType')
        .distinct('FromType', function (err, feeds) {
            return res.json(feeds);
        });
}