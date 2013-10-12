var FeedsModel = require("./../models").Feeds;
var utils = require("./../libs/util");
var underscore = require("underscore");
exports.list = function (req, res) {
    /*    var o = {};
     o.map = function () {
     emit(this.FromType, 1);
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

     o.out = { replace: '2dbarReportForResults' };

     o.verbose = true;

     FeedsModel.mapReduce(o, function (err, model, stats) {
     if (err) {
     return res.json(500, err);
     }
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

   /* var o = {};
    o.map = function () {
        var keywords = this.Keyword.split(';');
        for (var i in keywords) {
            if (keywords[i].trim() !== "");
            emit(keywords[i], 1);
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
    }

    o.out = { replace: 'createdCollectionNameForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().select("value").limit(10)
            /*//*.where('value').gt(10)*//**//*
            .exec(function (err, docs) {
                var result = [];
                for (var d in docs) {
                    if (docs[d].value.name.trim() !== "") {
                        docs[d].value.color = utils.randomColor();
                        result.push(docs[d].value);
                    }
                }
                return res.json(result);
            });
    });*/

    FeedsModel.aggregate(
        { $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            var keywords=[];
           /**
            * map
            * */
            for(var i=0;i<docs.length;i++){
                var obj=docs[i];
                var names=obj.name.split(";")
                 names= underscore.uniq(names);
                for(var k in names){
                    var keyword=names[k];
                     keywords.push({key:keyword,value:obj.value})
                }
            }
            /**
             * reduce
             */
             var result={};
            for(var i=0; i<keywords.length; i++) {
                var keyword = keywords[i];
                result[keyword.key] = result[keyword.key] ? (result[keyword.key] + keyword.value) : keyword.value;
            }

            var finalResult=[];
             var keys=underscore.keys(result);
            var values=underscore.values(result);
            for(var i= 0,len=keys.length>10?10:keys.length;i<len;i++){
                finalResult.push({name:keys[i],value:values[i],color: utils.randomColor()})
            }
            res.json(finalResult); // [ { maxAge: 98 } ]
        });
};
exports.TopicKeywordReportPost = function (req, res) {

    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match : { PublishTime : { $gte :startDate, $lte :endDate} }}
        ,{  $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $limit : 10 }
        , { $project: {name:"$_id",  value:1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });
//    var o = {};
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
//            var keywords = this.Keyword.split(';');
//            for (var i in keywords) {
//                if (keywords[i].trim() !== "");
//                emit({s:keywords[i],d:key}, 1);
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
//    };
//
//    o.finalize = function (k, reduced) {
//        return {name: k, value: reduced}
//    }
//
//    o.out = { replace: 'createdCollectionNameForResults' };
//    o.verbose = true;
//    FeedsModel.mapReduce(o, function (err, model, stats) {
//        if (err) {
//            return res.json(500, err);
//        }
//        model.find().select("value").limit(10)
//            //*.where('value').gt(10)*//*
//            .exec(function (err, docs) {
//                var result = [];
//                for (var d in docs) {
//                    if (docs[d].value.name.trim() !== "") {
//                        docs[d].value.color = utils.randomColor();
//                        result.push(docs[d].value);
//                    }
//                }
//                return res.json(result);
//            });
//    });
};
//饼图
exports.SearchSource = function (req, res) {
  /*  var o = {};
    o.map = function () {
        emit(this.FromType, 1);
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

    o.out = { replace: '2dpieReportForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().select("value")
            /*//*.where('value').gt(10)*//**//*
            .exec(function (err, docs) {
                var result = [];
                for (var d in docs) {
                    docs[d].value.color = utils.randomColor();
                    result.push(docs[d].value);
                }
                return res.json(result);
            });
    });*/
    var startDate = new Date("2013-08-01") , endDate = new Date("2013-08-31");
    FeedsModel.aggregate(
        { $match : { PublishTime : { $gte :startDate, $lte :endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
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
        { $match : { PublishTime : { $gte :startDate, $lte :endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });
//
//    var o = {};
//    var finalResult = [];
//    o.map = function () {
//        if (this.PublishTime && this.PublishTime.getFullYear() === 2013) {
//            var month = this["PublishTime"].getMonth() + 1;
//            var day = this["PublishTime"].getDate();
//            if (month < 10) {
//                month = "0" + month;
//            }
//            if (day < 10) {
//                day = "0" + day;
//            }
//            var key = this["PublishTime"].getFullYear() + "-" + month + "-" + day;
//
//            emit({s: this.FromType, d: key}, 1);
//        }
//    }
//    o.reduce = function (k, vals) {
//        var total = 0;
//        for (var i in vals) {
//            total += vals[i];
//        }
//        return total;
//    };
//
//    o.finalize = function (k, reduced) {
//        return {name: k, value: reduced}
//    }
//
//    o.out = { replace: '2dpieReportForResultsPost' };
//    o.verbose = true;
//    FeedsModel.mapReduce(o, function (err, model, stats) {
//        if (err) {
//            return res.json(500, err);
//        }
//        model.find().select("value")
//            //*.where('value').gt(10)*//*
//            .exec(function (err, docs) {
//                var result = [];
//                var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
//                for (var dl in docs) {
//                    if (new Date(docs[dl]._id.d) >= startDate && new Date(docs[dl]._id.d) <= endDate) {
//                        docs[dl].value.color = utils.randomColor();
//                        if (params.st != '') {
//                            var cname = params.st.split("|");
//                            for (var n in cname) {
//                                if (docs[dl].value.name == cname[n]) {
//                                    result.push(docs[dl].value);
//                                }
//                            }
//                        } else {
//                            result.push(docs[dl].value);
//                        }
//                    }
//                }
//                var weiboCount = 0;
//                var shopCount = 0;
//                var searchCount = 0;
//                var luntanCount = 0;
//                for (var i in result) {
//                    var v = result[i];
//                    if (v.name.s === "微博") {
//                        weiboCount = weiboCount + v.value;
//                    }
//                    else if (v.name.s === "商城") {
//                        shopCount = shopCount + v.value;
//                    }
//                    else if (v.name.s === "搜索引擎") {
//                        searchCount = searchCount + v.value;
//                    }
//                    else if (v.name.s === "论坛") {
//                        luntanCount = luntanCount + v.value;
//                    }
//                }
//                finalResult.push({name: "微博", value: weiboCount, color: utils.randomColor(), line_width: 2});
//                finalResult.push({name: "商城", value:shopCount, color: utils.randomColor(), line_width: 2});
//                finalResult.push({name: "搜索引擎", value: searchCount, color: utils.randomColor(), line_width: 2});
//                finalResult.push({name: "论坛", value: luntanCount, color: utils.randomColor(), line_width: 2});
//
////                        reunionCore.GetSourceType(function (d) {
////                            var index=0;
////                            var pl = [];
////                            for( j in d){
////                                for (i in result) {
////                                    if(result[i].name.s===d[index]){
////                                        pl.push({k:d[index],v:result[i].value.value});
////                                    }
////                                }
////                                finalResult.push({name: d[index], value: pl[], color: utils.randomColor()});
////                                index=index+1;
////                            }
////                        })
//                FeedsModel.aggregate(
//                    { $group: { _id: "$FromType", value: { $sum: 1 }}}
//                    , { $project: {name:"$_id",  value:1 }}
//                    /* , { $project: { _id: 0, maxAge: 1 }}*/
//                    , function (err, docs) {
//                        var result = [];
//                        for (var d in docs) {
//                            docs[d].color = utils.randomColor();
//                            result.push(docs[d]);
//                        }
//                        return res.json(result);
//                        res.json(result); // [ { maxAge: 98 } ]
//                    });
//                return res.json(finalResult);
//            });
//    });
};

exports.listPost = function (req, res) {

    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match : { PublishTime : { $gte :startDate, $lte :endDate} }},
        {  $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        , function (err, docs) {
            var result = [];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                result.push(docs[d]);
            }
            return res.json(result);
            res.json(result); // [ { maxAge: 98 } ]
        });
//
//    var params = req.body;
//    var o = {};
//    var startDate = params.startDate , endDate = params.endDate;
//    o.map = function () {
////        if (!!startDate && !!endDate) {
////            if (this.PublishTime > new Date(startDate) && this.PublishTime < new Date(endDate)) {
////                emit(this.FromType, 1);
////            }
////        }
////        else{
//        emit(this.FromType, 1);
////        }
//    }
//    o.reduce = function (k, vals) {
//        var total = 0;
//        for (var i in vals) {
//            total += vals[i];
//        }
//        return total;
//    };
//
//    o.finalize = function (k, reduced) {
//        return {name: k, value: reduced}
//    }
//
//    o.out = { replace: '2dbarReportForResultsPost' };
//    o.verbose = true;
//    FeedsModel.mapReduce(o, function (err, model, stats) {
//        if (err) {
//            return res.json(500, err);
//        }
//        model.find().select("value")
//            //*.where('value').gt(10)*//*
//            .exec(function (err, docs) {
//                var result = [];
//                for (var d in docs) {
//                    docs[d].value.color = utils.randomColor();
//                    if (params.st != '') {
//                        var cname = params.st.split("|");
//                        for (var n in cname) {
//                            if (docs[d].value.name == cname[n]) {
//                                result.push(docs[d].value);
//                            }
//                        }
//                    } else {
//                        result.push(docs[d].value);
//                    }
//                }
//                return res.json(result);
//            });
//    });
};

exports.SentimentAnalysis = function (req, res) {
    var params = req.body;
    var o = {};

    o.map = function () {

        if (this.PublishTime && this.PublishTime.getFullYear() === 2013) {
            var key = this.PublishTime.getMonth() + 1;

            if (this.Semantic > 0) {
                emit({s: "好评", d: key}, 1);
            }
//            if (this.Semantic == 0) {
//                emit({s: "中评", d: key}, 1);
//            }
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

    o.out = { replace: 'SentimentAnalysisReportForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, "No Data");
                }
                var result = [];
                var temp1 = [], temp2 = [], temp3 = [];
                for (var d in docs) {

                    var result = [];
                    for (var d in docs) {
                        docs[d].value.color = utils.randomColor();
                        result.push(docs[d].value);
                    }

                    //处理数据
                    var finalResult = [];
                    var pl = {
                        good: [],
//                        normal: [],
                        bad: []
                    }
                    for (var i in result) {
                        var v = result[i];
//                        if (v.name.s === "中评") {
//                            pl.normal.push(v.value);
//                        }
                        if (v.name.s === "好评") {
                            pl.good.push(v.value);
                        }
                        if (v.name.s === "差评") {
                            pl.bad.push(v.value);
                        }
                    }

                }
                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
//                finalResult.push({name: "中评", value: pl.normal, color: utils.randomColor(), line_width: 2})
                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                return res.json(finalResult);
            });
    });
};
exports.SentimentAnalysisPost = function (req, res) {
    var params = req.body;
    var o = {};
    o.map = function () {
        if (this.PublishTime && this.PublishTime.getFullYear() === 2013) {
            //var key = this.PublishTime..match(/-(\d*)/)[1];
            var month = this["PublishTime"].getMonth() + 1;
            var day = this["PublishTime"].getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var key = this["PublishTime"].getFullYear() + "-" + month + "-" + day;
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

    o.out = { replace: 'SentimentAnalysisReportColumnForResultsPost' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().sort({PublishTime: 'desc'}).select("value")
            //*.where('value').gt(10)*//*

            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, docs);
                }
                var result = [];
                var temp1 = [], temp2 = [], temp3 = [];
                var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
                for (var dl in docs) {
                    if (new Date(docs[dl].value.name.d) >= startDate && new Date(docs[dl].value.name.d) <= endDate) {
                        docs[dl].value.color = utils.randomColor();
                        result.push(docs[dl].value);
                    }
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
                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                var result = {data: finalResult, labels: utils.dateRange(params.starttime, params.endtime)}
                return res.json(result);
            });
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
                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                return res.json(finalResult);
            });
    });
};
exports.SentimentAnalysisColumnPost = function (req, res) {
    var params = req.body
    var o = {};

    o.map = function () {
        if (this.PublishTime && this.PublishTime.getFullYear() === 2013) {
            //var key = this.PublishTime..match(/-(\d*)/)[1];
            var month = this["PublishTime"].getMonth() + 1;
            var day = this["PublishTime"].getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            var key = this["PublishTime"].getFullYear() + "-" + month + "-" + day;
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

    o.out = { replace: 'SentimentAnalysisReportColumnForResultsPost' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().sort({PublishTime: 'desc'}).select("value")
            //*.where('value').gt(10)*//*

            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, docs);
                }
                var result = [];
                var temp1 = [], temp2 = [], temp3 = [];
                var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
                for (var dl in docs) {
                    if (new Date(docs[dl].value.name.d) >= startDate && new Date(docs[dl].value.name.d) <= endDate) {
                        docs[dl].value.color = utils.randomColor();
                        result.push(docs[dl].value);
                    }
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
                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                var result = {data: finalResult, labels: utils.dateRange(params.starttime, params.endtime)}
                return res.json(result);
            });
    });
};
exports.keyWordCloud = function (req, res) {

    FeedsModel.aggregate(
        { $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {


            var keywords=[];
            /**
             * map
             * */
            for(var i=0;i<docs.length;i++){
                var obj=docs[i];
                var names=obj.name.split(";")
                names= underscore.uniq(names);
                for(var k in names){
                    var keyword=names[k];
                    keywords.push({key:keyword,value:obj.value})
                }
            }
            /**
             * reduce
             */
            var result={};
            for(var i=0; i<keywords.length; i++) {
                var keyword = keywords[i];
                result[keyword.key] = result[keyword.key] ? (result[keyword.key] + keyword.value) : keyword.value;
            }

            var finalResult=[];
            var keys=underscore.keys(result);
            var values=underscore.values(result);
            for(var i= 0,len=keys.length>10?10:keys.length;i<len;i++){
                finalResult.push({name:keys[i],value:values[i],color: utils.randomColor()})
            }
            res.json(finalResult); // [ { maxAge: 98 } ]
        });
};
exports.test = function (req, res) {
    var o = {};

    o.map = function () {
        if (this.PublishTime.match(/\d*/)[0] === "2013") {
            var key = this.PublishTime.match(/-(\d*)/)[1];
            if (this.Semantic > 0) {
                emit({s: "好评", d: key}, 1);
            }
            if (this.Semantic > 0) {
                emit({s: "中评", d: key}, 1);
            }
            if (this.Semantic > 0) {
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

    o.out = { replace: 'createdCollectionNameForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {

        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                var result = [];
                for (var d in docs) {
                    docs[d].value.color = utils.randomColor();
                    result.push(docs[d].value);
                }
                return res.json(result);
            });
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