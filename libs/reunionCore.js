var FeedsModel = require("./../models").Feeds;

exports.GetSourceType = function (callback) {
    FeedsModel
        .find()
        /*.limit(20)*/
        .select('FromType')
        .distinct('FromType', function (err, feeds) {
            if(err){
                return null;
            }
          callback(feeds);
        });
}

