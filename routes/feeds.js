var FeedsModel = require("./../models").Feeds;
var reunionCore = require("./../libs/reunionCore");
exports.list = function (req, res,next) {

    var sts = req.body.st, topicKeyword = req.body.keyword;
    var queryCondition = {};
    if (sts) {
        var FromTypeReg = new RegExp(sts, "i");
    }

    if (FromTypeReg) {
        queryCondition.FromType = FromTypeReg;
    }

    var querykeyword = [];

    if (topicKeyword) {
        var keywords = topicKeyword.split(" ");
        if (keywords.length > 1) {

            for (var i in keywords) {
                querykeyword.push({Content: new RegExp(keywords[i], "gmi")})
            }

        }
        else {
            var topicKeywordRegex = new RegExp(topicKeyword, "gmi");
            queryCondition.Content = topicKeywordRegex;
        }
    }
    if (req.body.starttime && req.body.endtime) {
        queryCondition.PublishTime = {$gte: new Date(req.body.starttime), $lte: new Date(req.body.endtime) };
    }
    var pageindex = req.body.pageindex ? req.body.pageindex * 20 - 20 : 0;
    FeedsModel.find(queryCondition).count(function (err, count) {
        if(err){
            return res.json(500, err);
        }
        var query = FeedsModel.find(queryCondition)
        if (querykeyword.length > 0)
            query.and(querykeyword);

        query.sort({PublishTime: 'desc'})
            .skip(pageindex)
            .limit(50)
            /*.select('childs')*/
            .exec(function (err, feeds) {
                if (err) {
                       return res.json(500, err);
                }
                FeedsModel.count(function(err,totalcount){
                    FeedsModel.find({CrawlerTime:{$gte: new Date(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+ " 00:00:00")}}).count(function (err, Todaycount){
                        FeedsModel.find().distinct('FromSite',function(err,countsites){
                            return res.json({
                                "feeds": feeds,
                                "count": count / 50 > 1 ? count / 50 : 1 ,
                                "totalcount":totalcount,
                                todaycount:Todaycount ,
                                countsites:countsites.length
                            });
                        })

                    })
                })

            });
    })


};
/***
 * {time:new Date}
 * @param req
 * @param res
 * Return {data:{},time:""}
 */
exports.getNewFeeds=function(req,res){
     var params=req.body;
     var searchTime=new Date(params.time)||new Date(new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+ " 00:00:00");
    FeedsModel.find({CrawlerTime:{$gte: searchTime}})
        .sort({CrawlerTime:"desc"})
        .limit(10)
        /*.select('childs')*/
        .exec(function (err, feeds) {
            if(err){
                return res.json(500,err);
            }
            if(!!!feeds[0]){
                return res.json(404,{});
            }
            return res.json({data:feeds,time:feeds[0].CrawlerTime||new Date()});
        });

} ;
exports.sourcetype = function (req, res) {
    reunionCore.GetSourceType(function (d) {
        return res.json(d);
    })
    /*    FeedsModel
     .find()
     */
    /*.limit(20)*/
    /*
     .select('FromType')
     .distinct('FromType', function (err, feeds) {
     if(err){
     return res.json(500,err);
     }
     return res.json(feeds);
     });*/
}

