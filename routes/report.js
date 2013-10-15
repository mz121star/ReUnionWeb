var FeedsModel = require("./../models").Feeds;
var utils = require("./../libs/util");
var underscore = require("underscore");
exports.list = function (req, res) {

    FeedsModel.aggregate(
        { $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });
};

//产品活动柱状图
exports.TopicKeywordReport = function (req, res) {


    FeedsModel.aggregate(
        { $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            var keywords = [];
            /**
             * map
             * */
            for (var i = 0; i < docs.length; i++) {
                var obj = docs[i];
                var names = obj.name.split(";")
                names = underscore.uniq(names);
                for (var k in names) {
                    var keyword = names[k];
                    keywords.push({key: keyword, value: obj.value})
                }
            }
            /**
             * reduce
             */
            var result = {};
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];
                result[keyword.key] = result[keyword.key] ? (result[keyword.key] + keyword.value) : keyword.value;
            }

            var finalResult = [];
            var keys = underscore.keys(result);
            var values = underscore.values(result);
            for (var i = 0, len = keys.length > 10 ? 10 : keys.length; i < len; i++) {
                finalResult.push({name: keys[i], value: values[i], color: utils.randomColor()})
            }
            res.json(finalResult); // [ { maxAge: 98 } ]
        });
};
exports.TopicKeywordReportPost = function (req, res) {

    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTime: { $gte: startDate, $lte: endDate} }}
        , {  $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $limit: 10 }
        , { $project: {name: "$_id", value: 1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });

};
//饼图
exports.SearchSource = function (req, res) {

    var startDate = new Date("2013-08-01") , endDate = new Date("2013-08-31");
    FeedsModel.aggregate(
        { $match: { PublishTime: { $gte: startDate, $lte: endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });
};

exports.SearchSourcePost = function (req, res) {
    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTime: { $gte: startDate, $lte: endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });

};

exports.listPost = function (req, res) {

    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTime: { $gte: startDate, $lte: endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });

};

exports.SentimentAnalysis = function (req, res) {
    var params = req.body;
    var startDate = new Date("2013-08-01") , endDate = new Date("2013-08-31");
   FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date("2013-08-01"), $lte: new Date("2013-08-31")}, Semantic: {$gt: 0} }},
        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        function (err, docs) {
            var goodResult = [],badResult=[];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d]);

                /***
                 *second
                 */
                FeedsModel.aggregate(
                    { $match: { PublishTimeTemp: { $gte: new Date("2013-08-01"), $lte: new Date("2013-08-31")}, Semantic: {$lt: 0} }},
                    { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                    { $project: {name: "$_id", value: 1 }},
                    { $sort: { name: 1 } },
                    function (err, docs2) {

                        for (var d2 in docs2) {
                            docs2[d2].color = utils.randomColor();
                            badResult.push(docs2[d2]);
                        }

                        /**处理*/
                        var finalResult = [];
                        var pl = {
                            good: [],
                            normal: [],
                            bad: []
                        }
                         for( d in goodResult){
                             pl.good.push(goodResult[d].value) ;
                         }
                        for( d in badResult){
                            pl.bad.push(badResult[d].value) ;
                        }
                        finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
                        finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                        var result = {data: finalResult, labels: utils.dateRange("2013-08-01", '2013-08-31')}
                        return res.json(result);
                        /*结束*/
                    });

            }

        });

};
exports.SentimentAnalysisPost = function (req, res) {
    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$gt: 0} }},
        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        function (err, docs) {
            var goodResult = [],badResult=[];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d]);

                /***
                 *second
                 */
                FeedsModel.aggregate(
                    { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte:  new Date(endDate)}, Semantic: {$lt: 0} }},
                    { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                    { $project: {name: "$_id", value: 1 }},
                    { $sort: { name: 1 } },
                    function (err, docs2) {

                        for (var d2 in docs2) {
                            docs2[d2].color = utils.randomColor();
                            badResult.push(docs2[d2]);
                        }

                        /**处理*/
                        var finalResult = [];
                        var pl = {
                            good: [],
                            normal: [],
                            bad: []
                        }
                        for( d in goodResult){
                            pl.good.push(goodResult[d].value) ;
                        }
                        for( d in badResult){
                            pl.bad.push(badResult[d].value) ;
                        }
                        finalResult.push({name: "Good", value: pl.good, color: "#4572a7", line_width: 2});
                        finalResult.push({name: "Bad", value: pl.bad, color:"#aa4643", line_width: 2})
                        var result = {data: finalResult, labels: utils.dateRange(params.starttime,params.endtime)}
                        return res.json(result);
                        /*结束*/
                    });
            }
        });

};
exports.SentimentAnalysisColumn = function (req, res) {
    var params = req.body;
    var o = {};
    o.map = function () {
        if (this.PublishTime && this["PublishTime"].getFullYear() === 2013) {
            //var key = this.PublishTime..match(/-(\d*)/)[1];

            var key = this["PublishTime"].getFullYear() + "-" + (this["PublishTime"].getMonth() + 1) + "-" + this["PublishTime"].getDate();

            if (this.Semantic > 0) {
                emit({s: "好评", d: key}, 1);
            }
            if (this.Semantic < 0) {
                emit({s: "差评", d: key}, 1);
            }
        }

    }

    o.reduce = function (k, vals) {
        var total = 0;
        for (var i in vals) {
            total += vals[i];
        }
        return total;

    };


    o.finalize = function (k, reduced) {

        return {name: k, value: reduced}
    };

    o.out = { replace: 'SentimentAnalysisReportColumnForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        /* model.find().select("value")*/
        model.find()
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, docs);
                }
                var result = [];
                var temp1 = [], temp2 = [], temp3 = [];
                for (var d in docs) {
                    for (var d in docs) {
                        docs[d].value.color = utils.randomColor();
                        result.push(docs[d].value);
                    }

                    //处理数据
                    var finalResult = [];
                    var pl = {
                        good: [],
                        normal: [],
                        bad: []
                    }
                    for (var i in result) {
                        var v = result[i];
                        if (v.name.s === "好评") {
                            pl.good.push(v.value);
                        }
                        if (v.name.s === "差评") {
                            pl.bad.push(v.value);
                        }
                    }

                }
                finalResult.push({name: "Good", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "Bad", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                return res.json(finalResult);
            });
    });
};
exports.SentimentAnalysisColumnPost = function (req, res) {
    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$gt: 0} }},
        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        function (err, docs) {
            var goodResult = [],badResult=[];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d]);

                /***
                 *second
                 */
                FeedsModel.aggregate(
                    { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$lt: 0} }},
                    { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                    { $project: {name: "$_id", value: 1 }},
                    { $sort: { name: 1 } },
                    function (err, docs2) {

                        for (var d2 in docs2) {
                            docs2[d2].color = utils.randomColor();
                            badResult.push(docs2[d2]);
                        }

                        /**处理*/
                        var finalResult = [];
                        var pl = {
                            good: [],
                            normal: [],
                            bad: []
                        }
                        for( d in goodResult){
                            pl.good.push(goodResult[d].value) ;
                        }
                        for( d in badResult){
                            pl.bad.push(badResult[d].value) ;
                        }
                        finalResult.push({name: "Good", value: pl.good, color:"#4572a7", line_width: 2});
                        finalResult.push({name: "Bad", value: pl.bad, color: "#aa4643", line_width: 2})
                        var result = {data: finalResult, labels: utils.dateRange(params.starttime,params.endtime)}
                        return res.json(result);
                        /*结束*/
                    });
            }
        });
//    var params = req.body
//    var o = {};
//
//    o.map = function () {
//        if (this.PublishTime && this.PublishTime.getFullYear() === 2013) {
//            //var key = this.PublishTime..match(/-(\d*)/)[1];
//            var month = this["PublishTime"].getMonth() + 1;
//            var day = this["PublishTime"].getDate();
//            if (month < 10) {
//                month = "0" + month;
//            }
//            if (day < 10) {
//                day = "0" + day;
//            }
//            var key = this["PublishTime"].getFullYear() + "-" + month + "-" + day;
//            if (this.Semantic > 0) {
//                emit({s: "好评", d: key}, 1);
//            }
//            if (this.Semantic < 0) {
//                emit({s: "差评", d: key}, 1);
//            }
//        }
//
//    }
//
//    o.reduce = function (k, vals) {
//        var total = 0;
//        for (var i in vals) {
//            total += vals[i];
//        }
//        return total;
//
//    };
//
//
//    o.finalize = function (k, reduced) {
//
//        return {name: k, value: reduced}
//    };
//
//    o.out = { replace: 'SentimentAnalysisReportColumnForResultsPost' };
//    o.verbose = true;
//    FeedsModel.mapReduce(o, function (err, model, stats) {
//        if (err) {
//            return res.json(500, err);
//        }
//        model.find().sort({PublishTime: 'desc'}).select("value")
//            //*.where('value').gt(10)*//*
//
//            .exec(function (err, docs) {
//                if (!!!docs.length || err) {
//                    return res.json(500, docs);
//                }
//                var result = [];
//                var temp1 = [], temp2 = [], temp3 = [];
//                var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
//                for (var dl in docs) {
//                    if (new Date(docs[dl].value.name.d) >= startDate && new Date(docs[dl].value.name.d) <= endDate) {
//                        docs[dl].value.color = utils.randomColor();
//                        result.push(docs[dl].value);
//                    }
//                }
//                //处理数据
//                var finalResult = [];
//                var pl = {
//                    good: [],
//                    normal: [],
//                    bad: []
//                }
//                for (var i in result) {
//                    var v = result[i];
//                    if (v.name.s === "好评") {
//                        pl.good.push(v.value);
//                    }
//                    if (v.name.s === "差评") {
//                        pl.bad.push(v.value);
//                    }
//                }
//                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
//                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
//                //                    处理结束
//                var result = {data: finalResult, labels: utils.dateRange(params.starttime, params.endtime)}
//                return res.json(result);
//            });
//    });
};
exports.keyWordCloud = function (req, res) {

    FeedsModel.aggregate(
        { $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $project: {name: "$_id", value: 1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {


            var keywords = [];
            /**
             * map
             * */
            for (var i = 0; i < docs.length; i++) {
                var obj = docs[i];
                var names = obj.name.split(";")
                names = underscore.uniq(names);
                for (var k in names) {
                    var keyword = names[k];
                    keywords.push({key: keyword, value: obj.value})
                }
            }
            /**
             * reduce
             */
            var result = {};
            for (var i = 0; i < keywords.length; i++) {
                var keyword = keywords[i];
                result[keyword.key] = result[keyword.key] ? (result[keyword.key] + keyword.value) : keyword.value;
            }

            var finalResult = [];
            var keys = underscore.keys(result);
            var values = underscore.values(result);
            for (var i = 0, len = keys.length > 10 ? 10 : keys.length; i < len; i++) {
                finalResult.push({name: keys[i], value: values[i], color: utils.randomColor()})
            }
            res.json(finalResult); // [ { maxAge: 98 } ]
        });
};
exports.test = function (req, res) {
    FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date("2013-08-01"), $lte: new Date("2013-08-31")}, Semantic: {$lt: 0} }},
        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        { $project: {value: 1 }},
        function (err, docs2) {
                    var result=[];
            for (var d2 in docs2) {
                docs2[d2].color = utils.randomColor();
                result.push(docs2[d2]);
            }

            return res.json(result);
            /*结束*/
        });

    /*  var o = {};

     o.map = function () {

     var key = this.PublishTime.match(/\d*/
    /*)[0] + this.PublishTime.match(/-(\d*)/)[1];
     emit(key, 1);
     }
     o.reduce = function (k, vals) {
     var total = 0;
     for (var i in vals) {
     total += vals[i];
     }
     return total;

     };


     o.finalize = function (k, reduced) {
     return {name: k, value: reduced}
     }

     o.out = { replace: 'createdCollectionNameForResults' };
     o.verbose = true;
     FeedsModel.mapReduce(o, function (err, model, stats) {

     model.find().select("value")
     /*/
    /*.where('value').gt(10)*/
    /**/
    /*
     .exec(function (err, docs) {
     var result = [];
     for (var d in docs) {
     docs[d].value.color = utils.randomColor();
     result.push(docs[d].value);
     }
     return res.json(result);
     });
     });*/
};