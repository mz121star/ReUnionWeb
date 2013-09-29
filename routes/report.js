var FeedsModel = require("./../models").Feeds;
var utils = require("./../libs/util");
exports.list = function (req, res) {
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

    o.out = { replace: '2dbarReportForResults' };
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
};

//产品活动柱状图
exports.TopicKeywordReport = function (req, res) {

    var o = {};
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
};
exports.SearchSource = function (req, res) {
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

    o.out = { replace: '2dpieReportForResults' };
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
};

exports.SentimentAnalysis = function (req, res) {
    var o = {};

    o.map = function () {
        if (this.PublishTime.match(/\d*/)[0] === "2013") {
            var key = this.PublishTime.match(/-(\d*)/)[1];
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

        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
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
exports.keyWordCloud=function(req,res){
    var o = {};
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

    o.out = { replace: 'keywordsColudForResults' };
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
}
exports.test = function (req, res) {
    var o = {};

    o.map = function () {
        if (this.PublishTime.match(/\d*/)[0] === "2013") {
            var key = this.PublishTime.match(/-(\d*)/)[1];
            var a
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

    o.out = { replace: 'testReportForResults' };
    o.verbose = true;
    FeedsModel.mapReduce(o, function (err, model, stats) {

        model.find().select("value")
            //*.where('value').gt(10)*//*
            .exec(function (err, docs) {
                var result = [];

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