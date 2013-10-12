var ReportModel = require("./../models").Report;
var path = require('path');
var fs = require('fs');
var Handlebars = require('handlebars');
var nodemailer = require("nodemailer");
var config = require('../config');
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

var getTemplate=function(req,callback){
    var reg = /(?!\/)([0-9A-Za-z]*$)/;
    var id = req.url.match(reg)[0];

    var tmpPath = path.normalize(__dirname + '/../ReportTemplate/defaultTemplate.tmp');
    fs.readFile(tmpPath, function (err, data) {

        if (err) throw err;
        var html = data + "";
        ReportModel.findById(id, function (err, report) {


            var template = Handlebars.compile(html);

            var data = { "title": report.Name, abs_path:""};
            var result = template(data);

            callback({data:result,title:report.Name,emailto:report.Receiver});
        });
    });

}
exports.subReportPreview = function (req, res) {
    getTemplate(req,function(d){
        res.set('Content-Type', 'text/html');
        return res.send(d.data);
    });

}

exports.sendReportPreviewByEmail= function (req, res) {
    getTemplate(req,function(d){


    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",{
        host: config.emailSection.SMTPServer,
        auth: {
            user: config.emailSection.AuthUser,
            pass: config.emailSection.AuthPassword
        }
    });

// setup e-mail data with unicode symbols
    var mailOptions = {
        from: config.emailSection.From, // sender address
        to: d.emailto, // list of receivers
        subject:config.emailSection.PreTitle+d.title+" ✔", // Subject line
        text: "Reunion ✔", // plaintext body
        html: d.data // html body
    }

// send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
           res.json(500,error);
        }else{
            res.json(200,response);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
    });
}