var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {
    console.log(req.body.st);
    var sts = req.body.st;
    var queryCondition= {};
    if (sts) {
        var FromTypeReg = new RegExp(sts, "i") ;
    }

    if(FromTypeReg){
        queryCondition.FromType= FromTypeReg  ;
    }
/*    if(req.body.starttime&&req.body.endtime) {
        queryCondition.PublishTime={$gte:req.body.starttime,$lte:req.body.endtime } ;
    }*/
    var pageindex=  req.body.pageindex? req.body.pageindex*1-1:1;
    FeedsModel.find(queryCondition).count(function (err, count) {

        FeedsModel.find(queryCondition)
            .skip(pageindex)
            .limit(1)
            /*.select('childs')*/
            .exec(function (err, feeds) {
                if(err){
                    return res.json(500,err);
                }
                return res.json({
                    "feeds": feeds,
                    "count": count
                });
            });
    })



};
exports.sourcetype = function (req, res) {
    FeedsModel
        .find()
        /*.limit(20)*/
        .select('FromType')
        .distinct('FromType', function (err, feeds) {
            if(err){
                return res.json(500,err);
            }
            return res.json(feeds);
        });
}

