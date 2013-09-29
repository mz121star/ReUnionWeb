var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {

     var result=[];
    FeedsModel
        .find({FromType: '微博'})
        .count(function (err, weibofeeds) {
            FeedsModel
                .find({FromType: '论坛'})
                .count(function (err, forumofeeds) {
                    FeedsModel
                        .find({FromType: /搜索/i})
                        .count(function (err, searchfeeds) {
                            result.push({name:"微博",value:weibofeeds,color: '#9d4a4a'}) ;
                            result.push({name:"论坛",value:forumofeeds,color: '#045004'});
                            result.push({name:"搜索",value:searchfeeds,color: '#B60A34'});
                                return res.json(result) ;

                        });
                });

        });
};

//产品活动柱状图
exports.TopicKeywordReport = function (req, res) {
    var result = [];
    FeedsModel
        .find({Keyword: /兰蔻/i})
        .count(function (err, chnkeyword) {
            FeedsModel
                .find({Keyword: /LANCOME/i})
                .count(function (err, engkeyword) {
                    FeedsModel
                        .find({Keyword: /香水/i})
                        .count(function (err, perfume) {
                            result.push({name: "香水", value: perfume, color: '#F0E68C'});
                            result.push({name: "兰蔻", value: chnkeyword, color: '#FF8C00'});
                            result.push({name: "LANCOME", value: engkeyword, color: '#FFD700'});
                            return res.json(result);
                        });

                });
        });
};
exports.SearchSource = function (req, res) {

    var result=[];
    FeedsModel
        .find({FromType: '微博'})
        .count(function (err, weibofeeds) {
            FeedsModel
                .find({FromType: '论坛'})
                .count(function (err, forumofeeds) {
                    FeedsModel
                        .find({FromType: /搜索/i})
                        .count(function (err, searchfeeds) {
                            result.push({name:"微博",value:weibofeeds,color: '#9d4a4a'}) ;
                            result.push({name:"论坛",value:forumofeeds,color: '#045004'});
                            result.push({name:"搜索",value:searchfeeds,color: '#B60A34'});
                            return res.json(result) ;

                        });
                });

        });
};

exports.SentimentAnalysis = function (req, res) {
    var o = {};
    o.map = function () { emit(this.FromType, {Semantic:this.Semantic}) } //{论坛:[{val:-5},{val:2},{}]
    o.reduce = function (k, vals) {
        var Semantic=0;
        values.forEach(function(val){
            Semantic+=val
        });
        return Semantic;
    }
    FeedsModel.mapReduce(o, function (err, results) {
        console.log(results)
    })
};
exports.test = function (req, res) {
    FeedsModel.aggregate(
        { $group: { _id: null ,count: { $sum: '$Keyword' } } }
        /* , { $project: { month_joined: { $month: "$joined" } } }*/
        /*   , { $sort: { "_id.month_joined": 1 } } */
        , function (err, res) {
            if (err) return err;
            return res.json(res); // [ { maxAge: 98 } ]
        })

};