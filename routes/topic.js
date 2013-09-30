var TopicModel = require("./../models").Topic;

/***
 * Get /topic
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    TopicModel.find( )
        .limit(20)
        /*.select('childs')*/
        .exec(function (err, feeds) {
            if(err){
                return res.json(500,err);
            }
            return res.json(feeds);
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
    topic.save(function(err,data){
        if(err){
            return res.json(500,err);
        }

        res.json(data);
    })
}

