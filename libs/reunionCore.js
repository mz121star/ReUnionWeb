var SourceTypeModel = require("./../models").SourceType;

exports.GetSourceType = function (callback) {
    SourceTypeModel
        .find()
        /*.limit(20)*/
        .select('name')
        .distinct('name',  function (err, feeds) {
            if(err){
                return null;
            }
          callback(feeds);
        });
}

