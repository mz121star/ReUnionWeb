/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */

var index = require('./index');
var user = require('./user');
var blog = require('./blog');
var kimiss=require('./kimiss');
var feeds=require('./feeds');
var reports=require('./report');
module.exports = function (app) {
    app.get('/', index.index);
    app.get('/list', user.list);
    app.get('/blog', blog.list);
    app.get('/user', user.list);

    app.post('/feeds', feeds.list);
    app.get('/feedsSourceType',feeds.sourcetype);
    app.post('/signup', user.create);
    app.post('/login', user.login);
    app.get('/logout', user.logout);
    app.get('/checklogin', index.getLoginUser);

    /***
     * Report
     */
    app.get('/2DBarReprot',reports.list);
};