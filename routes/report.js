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
