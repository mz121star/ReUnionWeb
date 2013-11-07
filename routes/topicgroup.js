var TopicGroupModel = require("./../models").TopicGroup;

/***
 * Get /topic
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    var querstring = req.url;
    var groupid = querstring.match(/groupid=(\w+)/);
    if(groupid) groupid=new RegExp(groupid[1],"gmi");

    if (groupid) {
        TopicGroupModel.find({GroupId: groupid})
            /*.limit(20)*/
            /*.select('childs')*/
            .exec(function (err, subs) {
                if (err) {
                    return res.json(500, err);
                }
                return res.json(subs);
            });
    }
    else {
        TopicGroupModel.find()
            /*.limit(20)*/
            /*.select('childs')*/
            .exec(function (err, subs) {
                if (err) {
                    return res.json(500, err);
                }
                return res.json(subs);
            });
    }



};
/***
 * POST /topic
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.save = function (req, res) {
    var topic = new TopicGroupModel(req.body);
    topic.save(function(err,data){
        if(err){
            return res.json(500,err);
        }

        res.json(data);
    })
}

/***
 * delete /topic
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.delete=function(req,res){
    var reg = /^\/api\/topic\/(?:([^\/]+?))\/?$/;
    var id=req.url.match(reg)[1];
    if(id) id=decodeURI(id);
    TopicModel.findById(id,function(err, topic) {
        if(err){
            return res.json(500,err);
        }

        topic.remove(function (err, data) {
            if (err) {
                return res.json(500, err);
            }

            res.json(data);
        })
    });
}
