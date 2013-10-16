/**
 * Created with JetBrains WebStorm.
 * User: c-sailor.zhang
 * Date: 1/23/13
 * Time: 1:47 PM
 * To change this template use File | Settings | File Templates.
 */

var index = require('./index');
var user = require('./user');
var feeds=require('./feeds');
var reports=require('./report');
var topic=require('./topic');
var subscription=require('./subscription');
var alert=require('./alert') ;
var monitor=require('./monitor') ;
var chart=require('./chart');
var admintool=require('./admintool');
module.exports = function (app) {
    /***
     * Render Pages页面相关代码
     */
    app.get('/', index.index);
    app.get('/login',index.login);
    app.get('/logout', user.logout);
    app.post('/login', user.login);
     /**********************************************************API*************************************************************************/
    /***
     * Users
     */
    app.post('/api/signup', user.create);


    app.get('/api/checklogin', index.getLoginUser);

    /***
     * Feeds
     */
    app.post('/api/feeds', feeds.list);
    app.get('/api/feedsSourceType',feeds.sourcetype);

    /***
     * Report
     */
    app.get('/api/2DBarReprot',reports.list);
    app.get('/api/TopicKeywordReport',reports.TopicKeywordReport);
    app.get('/api/Test',reports.test);
    app.get('/api/SearchSource',reports.SearchSource);
    app.get('/api/SentimentAnalysis',reports.SentimentAnalysis);
    app.get('/api/KeyWordCloud',reports.keyWordCloud);
    app.get('/api/SentimentAnalysisColumn',reports.SentimentAnalysisColumn);

    app.post('/api/SentimentAnalysisPost',reports.SentimentAnalysisPost);
    app.post('/api/2DBarReprotPost',reports.listPost);
    app.post('/api/SearchSourcePost',reports.SearchSourcePost);
    app.post('/api/SentimentAnalysisColumnPost',reports.SentimentAnalysisColumnPost);
    app.post('/api/TopicKeywordReportPost',reports.TopicKeywordReportPost);

    /***
     * Topics
     */
    app.post('/api/topic',topic.saveTopic);
    app.get('/api/topic',topic.list);

    /***
     * Reports-subscription report
     */
    app.post('/api/subReport',subscription.saveReport);
    app.get('/api/subReport',subscription.list);
    app.put('/api/subReport',subscription.editReport);
    app.get('/api/subReportPreview/:id', subscription.subReportPreview);
    app.get('/api/sendPreviewMail/:id',subscription.sendReportPreviewByEmail);

    /***
     * Monitor
     */
    app.get('/api/monitor',monitor.list);
    app.get('/api/monitor/:id',monitor.getlistbyType);
    app.post('/api/monitor',monitor.save);
    app.put('/api/monitor/:id',monitor.edit);
    /***
     * Alert
     */
    app.get('/api/alert',alert.list);
    app.get('/api/alert/:id',alert.getById);
    app.post('/api/alert',alert.save);
    app.put('/api/alert/:id',alert.edit);
    /***
     * Chart
     */
    app.get('/api/chart',chart.list);
    app.get('/api/chart/:id',chart.getById);
    app.post('/api/chart',chart.save);


    /**********************************************************API*************************************************************************/
     app.get('/test',reports.test);
    app.post('/admintool',admintool.admintool);
};