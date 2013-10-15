var ChartModel = require("./../models").Chart;
var path = require('path');
var fs = require('fs');
/*var Handlebars = require('handlebars');
 var nodemailer = require("nodemailer");
 var config = require('../config');*/
/***
 * Get /api/chart
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    ChartModel.find()
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
 * Get /api/chart/:id
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    var reg = /^\/api\/chart\/(?:([^\/]+?))\/?$/;
    var type=req.url.match(reg)[1];
    if(type) type=decodeURI(type);
    ChartModel.find({_id:type})
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, chart) {
            if(err){
                return res.json(500,err);
            }
            return res.json(chart);
        });

};
/***
 * POST /api/chart/
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.save = function (req, res) {
    var chart = new ChartModel(req.body);
    chart.save(function (err, data) {
        if (err) {
            return res.json(500, err);
        }

        res.json(data);
    })
}


/***
 * Put  /api/chart/
 * @param req
 * @param res
 */
exports.edit = function (req, res) {
    //var report = new ReportModel(req.body);
    var id = req.body._id;
    /*  AlertModel.findById(id, function (err, report) {
     report.Status = Math.abs(report.Status - 1);
     report.save(function (err, data) {
     if (err) {
     return res.json(500, err);
     }

     res.json(data);
     });

     });*/

}

