/*
 * GET users listing.
 */

var UsersModel = require("./../models").Users;

var path = require('path');



exports.create = function (req, res) {
    var createUser = new UsersModel(req.body);
    UsersModel.findOne({name: req.body.name}, function (err, user) {
        if (err)
            return res.json({err: err});
        if (user) {
            return res.json({err: "用户名已经存在"});
        }
        createUser.save(function (err, user) {
            if (err) {
                return res.json({err: err});
            }
            req.session["user"] = user;
            res.json();
        });
    });

};

/***
 * 【危险API】需要防止用户名密码泄露，此处只显示用户小插件的配置   （废除）
 * @param req
 * @param res
 */
exports.getById = function (req, res) {

    var reg = /^\/api\/user\/(?:([^\/]+?))\/?$/;
    var type = req.url.match(reg)[1];
    if (type) type = decodeURI(type);
    req.session["user"]
    UsersModel.find({_id: type})
        /*.limit(20)*/
        .select('widgets')
        .exec(function (err, user) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(user);
        });

};
exports.getWidgets=function(req,res){
   var id= req.session["user"]._id
    UsersModel.find({_id: id})
        /*.limit(20)*/
        .select('widgets')
        .exec(function (err, user) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(user);
        });
}
exports.login = function (req, res) {
    UsersModel.findOne({name: req.body.name}, function (err, user) {
        if (err)
            return res.json({err: err});
        if (!user) {
            return res.json({err: '用户名不存在'});
        }
        if (!user.authenticate(req.body.password))
            return res.json({err: '密码错误'});
        req.session["user"] = user;
        res.redirect('/');
    });
};

exports.logout = function (req, res) {
    req.session["user"] = null;
    res.json("1") ;
};
