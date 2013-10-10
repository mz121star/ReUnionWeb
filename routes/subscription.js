var ReportModel = require("./../models").Report;
var path = require('path');
var fs = require('fs');
var Handlebars = require('handlebars');
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
        report.Status = Math.abs(report.Status - 1);
        report.save(function (err, data) {
            if (err) {
                return res.json(500, err);
            }

            res.json(data);
        });

    });

}


exports.subReportPreview = function (req, res) {
    var reg = /(?!\/)([0-9A-Za-z]*$)/;
    var id = req.url.match(reg)[0];

    var tmpPath = path.normalize(__dirname + '/../ReportTemplate/defaultTemplate.tmp');
    fs.readFile(tmpPath, function (err, data) {

        if (err) throw err;
        var html = data + "";
        ReportModel.findById(id, function (err, report) {


            var template = Handlebars.compile(html);

            var data = { "title": report.Name, "hometown": "Somewhere, TX",
                "kids": [
                    {"name": "Jimmy", "age": "12"},
                    {"name": "Sally", "age": "4"}
                ]};
            var result = template(data);

            res.set('Content-Type', 'text/html');
            return res.send(result);
        });
    });


}