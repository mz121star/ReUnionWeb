var AlertModel = require("./../models").Alert;
var path = require('path');
var fs = require('fs');
/*var Handlebars = require('handlebars');
var nodemailer = require("nodemailer");
var config = require('../config');*/
/***
 * Get /subReport
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    AlertModel.find()
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
 * Get /alert/:id
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    var reg = /^\/api\/alert\/(?:([^\/]+?))\/?$/;
    var type=req.url.match(reg)[1];
    if(type) type=decodeURI(type);
    AlertModel.find({_id:type})
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
 * POST /subReport
 * {name:"topicName"}
 * @param req
 * @param res
 */
exports.save = function (req, res) {
    var alert = new AlertModel(req.body);
    alert.save(function (err, data) {
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

