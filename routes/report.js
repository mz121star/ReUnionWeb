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
    FeedsModel.aggregate(
        { $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            if (err) return handleError(err);
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
            if (err) return handleError(err);


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
    FeedsModel.aggregate(
        { $group: { _id: "$FromType", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            if (err) return handleError(err);
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
    var o = {};
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

    o.out = { replace: '2dpieReportForResultsPost' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                var result = [];
                for (var d in docs) {
                    docs[d].value.color = utils.randomColor();
                    if (params.st != '') {
                        var cname = params.st.split("|");
                        for (var n in cname) {
                            if (docs[d].value.name == cname[n]) {
                                result.push(docs[d].value);
                            }
                        }
                    } else {
                        result.push(docs[d].value);
                    }
                }
                return res.json(result);
            });
    });
};

exports.listPost = function (req, res) {
    var params = req.body;
    var o = {};
    var startDate = params.startDate , endDate = params.endDate;
    o.map = function () {
//        if (!!startDate && !!endDate) {
//            if (this.PublishTime > new Date(startDate) && this.PublishTime < new Date(endDate)) {
//                emit(this.FromType, 1);
//            }
//        }
//        else{
        emit(this.FromType, 1);
//        }
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

    o.out = { replace: '2dbarReportForResultsPost' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {
        if (err) {
            return res.json(500, err);
        }
        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                var result = [];
                for (var d in docs) {
                    docs[d].value.color = utils.randomColor();
                    if (params.st != '') {
                        var cname = params.st.split("|");
                        for (var n in cname) {
                            if (docs[d].value.name == cname[n]) {
                                result.push(docs[d].value);
                            }
                        }
                    } else {
                        result.push(docs[d].value);
                    }
                }
                return res.json(result);
            });
    });
};

exports.SentimentAnalysis = function (req, res) {
    var o = {};

    o.map = function () {

        if (this.PublishTime&&this.PublishTime.getFullYear() === 2013) {
            var key = this.PublishTime.getMonth()+1;

            if (this.Semantic > 0) {
                emit({s: "好评", d: key}, 1);
            }
            if (this.Semantic == 0) {
                emit({s: "中评", d: key}, 1);
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
                        normal: [],
                        bad: []
                    }
                    for (var i in result) {
                        var v = result[i];
                        if (v.name.s === "中评") {
                            pl.normal.push(v.value);
                        }
                        if (v.name.s === "好评") {
                            pl.good.push(v.value);
                        }
                        if (v.name.s === "差评") {
                            pl.bad.push(v.value);
                        }
                    }

                }
                finalResult.push({name: "好评", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "中评", value: pl.normal, color: utils.randomColor(), line_width: 2})
                finalResult.push({name: "差评", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                return res.json(finalResult);
            });
    });
};
exports.SentimentAnalysisColumn = function (req, res) {
    var o = {};

    o.map = function () {
        if (this.PublishTime&&this["PublishTime"].getFullYear() === 2013) {
            //var key = this.PublishTime..match(/-(\d*)/)[1];

            var key = this["PublishTime"].getMonth()+1;

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
        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, docs);
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
    var o = {};

    o.map = function () {
        if (this.PublishTime.getFullYear() === 2013) {
            //var key = this.PublishTime..match(/-(\d*)/)[1];
            var key = this.PublishTime.getMonth() + 1;
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
        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                if (!!!docs.length || err) {
                    return res.json(500, docs);
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
               // var result={data:finalResult,labels:utils.dateRange(sta)}
                return res.json(finalResult);
            });
    });
};
exports.keyWordCloud = function (req, res) {

    FeedsModel.aggregate(
        { $group: { _id: "$Keyword", value: { $sum: 1 }}}
        , { $project: {name:"$_id",  value:1 }}
        /* , { $project: { _id: 0, maxAge: 1 }}*/
        , function (err, docs) {
            if (err) return handleError(err);


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