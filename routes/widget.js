var WidgetModel = require("./../models").Widget;
var path = require('path');
var fs = require('fs');
var underscore = require('underscore');
/*var Handlebars = require('handlebars');
 var nodemailer = require("nodemailer");
 var config = require('../config');*/
/***
 * Get /widget
 * @param req
 * @param res
 */
exports.list = function (req, res) {
     var isIds=false
    var querstring = req.url;
    var groupid = querstring.match(/ids=([\w|,]+)/);
    if(querstring.indexOf("ids")>0) isIds=true;
    if(groupid)  groupid=  groupid[1].split(",")

    if (groupid||isIds) {

        WidgetModel.find({_id: {$in:groupid}})
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
        WidgetModel.find()
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

/*exports.getByName=function(req,res){
    var Name=req.session["user"].name;
    WidgetModel.find()
        *//*.limit(20)*//*
        *//*.select('childs')*//*
        .exec(function (err, subs) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(subs);
        });
}*/
/***
 * Get /alert/:id
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    var reg = /^\/api\/widget\/(?:([^\/]+?))\/?$/;
    var type = req.url.match(reg)[1];
    if (type) type = decodeURI(type);
    WidgetModel.find({_id: type})
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, monitors) {
            if (err) {
                return res.json(500, err);
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
    var widget = new WidgetModel(req.body);
    widget.save(function (err, data) {
        if (err) {
            return res.json(500, err);
        }

        res.json(data);
    })
}


/***
 * Put /alert/:id {data}
 * @param req
 * @param res
 */
exports.edit = function (req, res) {
    var reg = /^\/api\/widget\/(?:([^\/]+?))\/?$/;
    var id = req.url.match(reg)[1];
    if (id) id = decodeURI(id);
    WidgetModel.findById(id, function (err, obj) {
        if (err) {
            return res.json(500, err);
        }
        obj = underscore.extend(alert, req.body);
        obj.save(function (err, data) {
            if (err) {
                return res.json(500, err);
            }

            res.json(data);
        })
    });

}

