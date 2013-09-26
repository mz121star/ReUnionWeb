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
                            result.push({name:"微博",value:weibofeeds}) ;
                            result.push({name:"论坛",value:forumofeeds});
                            result.push({name:"搜索",value:searchfeeds});
                                return res.json(result) ;

                        });
                });

        });
};
