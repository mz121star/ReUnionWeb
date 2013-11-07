var TopicModel = require("./../models").Topic;

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
        TopicModel.find({GroupId: groupid})
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
        TopicModel.find()
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
exports.saveTopic = function (req, res) {
    var topic = new TopicModel(req.body);
    topic.OwnerId= req.session.user._id ;
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

/***
 * Get /topic/:id
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    var reg = /^\/api\/topic\/(?:([^\/]+?))\/?$/;
    var type=req.url.match(reg)[1];
    if(type) type=decodeURI(type);
    TopicModel.find({_id:type})
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, data) {
            if(err){
                return res.json(500,err);
            }
            return res.json(data);
        });

};