var TopicGroupModel = require("./../models").TopicGroup;

/***
 * Get /topic
 * @param req
 * @param res
 */
exports.list = function (req, res) {
    var id= req.session["user"]._id
    var querstring = req.url;
    var groupid = querstring.match(/groupid=(\w+)/);
    if(groupid) groupid=new RegExp(groupid[1],"gmi");

    if (groupid) {
        TopicGroupModel.find({GroupId: groupid,OwnerId:id})
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
        TopicGroupModel.find({OwnerId:id})
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
    /***
     *为group添加用户
     */
    var id= req.session["user"]._id
    topic.OwnerId=id;
    topic.save(function(err,data){
        if(err){
            return res.json(500,err);
        }

        res.json(data);
    })
}

/***
 * delete /topicgroup/:id
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.delete=function(req,res){
    var reg = /^\/api\/topicgroup\/(?:([^\/]+?))\/?$/;
    var id=req.url.match(reg)[1];
    if(id) id=decodeURI(id);
    TopicGroupModel.findById(id,function(err, group) {
        if(err){
            return res.json(500,err);
        }

        group.remove(function (err, data) {
            if (err) {
                return res.json(500, err);
            }

            res.json(data);
        })
    });
}
