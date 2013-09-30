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
var topic=require('./topic');
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
    app.post('/2DBarReprot',reports.listPost);
    app.get('/TopicKeywordReport',reports.TopicKeywordReport);
    app.get('/Test',reports.test);
    app.get('/SearchSource',reports.SearchSource);
    app.post('/SearchSource',reports.SearchSourcePost);
    app.get('/SentimentAnalysis',reports.SentimentAnalysis);
    app.get('/KeyWordCloud',reports.keyWordCloud);


    /***
     * Topics
     */
    app.post('/topic',topic.saveTopic);
    app.get('/topic',topic.list);

};