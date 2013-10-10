var ReportModel = require("./../models").Report;

/***
 * Get /subReport
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    ReportModel.find()
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, subs) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(subs);
        });

};
/***
 * POST /subReport
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.saveReport = function (req, res) {
    var report = new ReportModel(req.body);
    report.save(function (err, data) {
        if (err) {
            return res.json(500, err);
        }

        res.json(data);
    })
}


/***
 * Put /subReport
 * @param req
 * @param res
 */
exports.editReport = function (req, res) {
    //var report = new ReportModel(req.body);
    var id = req.body._id;
    ReportModel.findById(id, function (err, report) {
        report.Status=Math.abs(report.Status-1);
        report.save(function (err, data) {
            if (err) {
                return res.json(500, err);
            }

            res.json(data);
        });

    });

}
