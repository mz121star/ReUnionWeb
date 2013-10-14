var MonitorModel = require("./../models").Monitor;

/***
 * Get /monitor
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    MonitorModel.find( )
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
 * Get /monitor/:type
 * @param req
 * @param res
 */
exports.getlistbyType = function (req, res) {

    var reg = /^\/api\/monitor\/(?:([^\/]+?))\/?$/;
    var type=req.url.match(reg)[1];
    if(type) type=decodeURI(type);
    MonitorModel.find({Type:type})
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, monitors) {
            if(err){
                return res.json(500,err);
            }
            return res.json(monitors);
        });

};
/***
 * POST /monitor
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.save = function (req, res) {
    var monitor = new MonitorModel(req.body);
    monitor.save(function(err,data){
        if(err){
            return res.json(500,err);
        }

        res.json(data);
    })
}

