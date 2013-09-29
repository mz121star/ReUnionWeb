var TopicModel = require("./../models").Topic;
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
            return res.json({
                "feeds": feeds,
                "count": feeds.length
            });
        });

};
/***
 * POST /topic
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.saveTopic = function (req, res) {
    var topic = new TopicModel(req.body);
    topic.save(function(err,date){
        if (err) {
            return res.json({err: err});
        }

        res.json(data);
    })

}