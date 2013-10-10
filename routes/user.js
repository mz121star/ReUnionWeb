/*
 * GET users listing.
 */

var UsersModel = require("./../models").Users;

var path = require('path');

exports.list = function (req, res) {

//    var fluffy = new KimissModel({ name: 'fluffy' });
//    fluffy.save(function (err, fluffy) {
//
//
//    });

    res.send("list");
};

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
