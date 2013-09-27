var FeedsModel = require("./../models").Feeds;
exports.list = function (req, res) {
  //搜索来源柱状图
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
//情感分析折线图
exports.SentimentAnalysisReport=function(req,res){
//    var result = [];
//    FeedsModel
//        .find({Semantic:{ $gt: 0 }})
//        .count(function (err, gtzero) {
//            result.push({name: "好评", value: gtzero, color: '#FF0000'});
//            FeedsModel
//                .find({Semantic: 0})
//                .count(function (err, zero) {
//                    FeedsModel
//                        .find({Semantic: { $lt: 0 }})
//                        .count(function (err, ltzero) {
//                            result.push({name: "好评", value: perfume, color: '#FF0000'});
//                            result.push({name: "中评", value: chnkeyword, color: '#FF4500'});
//                            result.push({name: "差评", value: engkeyword, color: '#0000CD'});
//                        });
//                });
//        });
};
    //搜索来源饼图
exports.SearchSource=function(req,res){
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
                            var allCount=weibofeeds+forumofeeds+searchfeeds;
                            result.push({name: "微博", value: weibofeeds/allCount, color: '#9d4a4a'});
                            result.push({name: "论坛", value: forumofeeds/allCount, color: '#045004'});
                            result.push({name: "搜索", value: searchfeeds/allCount, color: '#B60A34'});
                            return res.json(result);

                        });
                });

        });
}
