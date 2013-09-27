var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {

    var result = [];
    FeedsModel
        .find({FromType: '微博'})
        .count(function (err, weibofeeds) {
            FeedsModel
                .find({FromType: '论坛'})
                .count(function (err, forumofeeds) {
                    FeedsModel
                        .find({FromType: /搜索/i})
                        .count(function (err, searchfeeds) {
                            result.push({name: "微博", value: weibofeeds, color: '#9d4a4a'});
                            result.push({name: "论坛", value: forumofeeds, color: '#045004'});
                            result.push({name: "搜索", value: searchfeeds, color: '#B60A34'});
                            return res.json(result);

                        });
                });

        });
};


exports.TopicKeywordReport = function (req, res) {
    //TODO

};
exports.test = function (req, res) {
    /*  FeedsModel.aggregate(
     { $group: { _id:{name:'$FromType'} ,value: { $sum: '$Semantic' } } }
     , { $project: {_id:0, name:"$_id.name",value:1 } }
     */
    /*   , { $sort: { "_id.month_joined": 1 } } */
    /*
     , function (err, d) {
     if (err) return err;
     return res.json(d); // [ { maxAge: 98 } ]
     })*/

    FeedsModel.aggregate(
        { $group: { _id: {time: '$CrawlerTime', semantic: "$Semantic"}, value: { $sum: '$Semantic' } } }
        , { $project: {_id: 0, time: "$_id.time", value: 1 } }
        , {$match: {}}

        , function (err, d) {
            if (err) return err;
            return res.json(d); // [ { maxAge: 98 } ]
        })

};