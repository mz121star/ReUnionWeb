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
    if(req.body.starttime&&req.body.endtime) {
        queryCondition.PublishTime={$gte:req.body.starttime,$lte:req.body.endtime } ;
    }

    FeedsModel.find(queryCondition)
          .limit(20)
        /*.select('childs')*/
         .exec(function (err, feeds) {
            if(err){
                return res.json(500,err);
            }
            return res.json({
                "feeds": feeds,
                "count": feeds.length
            });
        });

    /* else {
     FeedsModel
     .find()
     .limit(20)
     */
    /*.select('childs')*/
    /*
     .exec(function (err, feeds) {
     return res.json({
     "feeds": feeds,
     "count": feeds.length
     });
     });
     }*/
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

