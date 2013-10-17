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
            var goodResult = [],badResult=[],normalResult=[];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d]);
            }
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
                        FeedsModel.aggregate(
                            { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte:  new Date(endDate)}, Semantic: 0 }},
                            { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                            { $project: {name: "$_id", value: 1 }},
                            { $sort: { name: 1 } },
                            function (err, docs3) {

                                for (var d3 in docs3) {
                                    docs3[d3].color = utils.randomColor();
                                    normalResult.push(docs3[d3]);
                                }

                                /**处理*/
                                var finalResult = [];
                                var pl = {
                                    good: [],
                                    normal: [],
                                    bad: []
                                }
                                for( var g in goodResult){
                                    pl.good.push(goodResult[g].value) ;
                                }
                                for( var b in badResult){
                                    pl.bad.push(badResult[b].value) ;
                                }
                                for( var n in normalResult){
                                    pl.normal.push(normalResult[n].value) ;
                                }
                                finalResult.push({name: "Positive", value: pl.good, color: "#4572a7", line_width: 2});
                                finalResult.push({name: "Neutral", value: pl.normal, color: "#959700", line_width: 2});
                                finalResult.push({name: "Negative", value: pl.bad, color:"#aa4643", line_width: 2})
                                var result = {data: finalResult, labels: utils.dateRange(params.starttime,params.endtime)}
                                return res.json(result);
                                /*结束*/
                            });
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
                finalResult.push({name: "Positive", value: pl.good, color: utils.randomColor(), line_width: 2});
                finalResult.push({name: "Bad", value: pl.bad, color: utils.randomColor(), line_width: 2})
                //                    处理结束
                return res.json(finalResult);
            });
    });
};
exports.SentimentAnalysisPost = function (req, res) {
    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    /*added by miaozhuang*/
    endDate = utils.getEndDate(startDate, endDate, 30);
    /*End*/
    FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$gt: 0} }},
        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        function (err, docs) {
            var goodResult = [], badResult = [], normalResult = [];
            //TODO 此处循环需要替换，替换为补齐时间的函数  ，参考docs2内的     /*miaozhuang add*/起始内容
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d]);
            }
            FeedsModel.aggregate(
                { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$lt: 0} }},
                { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                { $project: {name: "$_id", value: 1 }},
                { $sort: { name: 1 } },
                function (err, docs2) {
                    //TODO 此处循环需要替换，替换为补齐时间的函数
                    for (var d2 in docs2) {
                        docs2[d2].color = utils.randomColor();
                        badResult.push(docs2[d2]);
                    }

                    /*miaozhuang
                     * 此段内容为模板文件，会自动将有丢失的日期补齐，并自动将其中的语义分析value设置为0
                     * */
                    badResult = [];
                    for (var d2 in docs2) {
                        /*  console.log(d2);
                         console.log(docs2[parseInt(d2) + 1]);*/
                        docs2[d2].color = "#fff";
                        if (docs2[parseInt(d2) + 1]) {
                            var dd = moment(docs2[parseInt(d2) + 1].name).diff(moment(docs2[d2].name), 'days'); //下一个日期和当前日期差几天，大于1天说明中间有空数据，需要补齐
                            console.log("相差时间"+dd);
                            if (dd > 1) { //有空数据，需要进行补齐操作
                                for (var i=0; i < dd; i++) { //dd为差的天数，循环此天数，以当前日期为基数，开始累加
                                    badResult.push({name: moment(docs2[d2].name).add("days", i).format("YYYY-MM-DD"), value: 0, color: docs2[d2].color});    //向数组中push时间，format中为要格式化的时间格式
                                }
                            }
                            else {
                                badResult.push(docs2[d2]);
                            }
                        }
                        else{
                            badResult.push(docs2[d2]);
                        }
                    }
                    console.log(badResult)
                    /*模板结束*/
                    FeedsModel.aggregate(
                        { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: 0 }},
                        { $group: { _id: "$PublishTimeTemp", value: { $sum: 1 }} },
                        { $project: {name: "$_id", value: 1 }},
                        { $sort: { name: 1 } },
                        function (err, docs3) {
                            //TODO 此处循环需要替换，替换为补齐时间的函数
                            for (var d3 in docs3) {
                                docs3[d3].color = utils.randomColor();
                                normalResult.push(docs3[d3]);
                            }

                            /**处理*/
                            var finalResult = [];
                            var pl = {
                                good: [],
                                normal: [],
                                bad: []
                            }
                            for (var g in goodResult) {
                                pl.good.push(goodResult[g].value);
                            }
                            for (var b in badResult) {
                                pl.bad.push(badResult[b].value);
                            }
                            for (var n in normalResult) {
                                pl.normal.push(normalResult[n].value);
                            }
                            finalResult.push({name: "Positive", value: pl.good, color: "#4572a7", line_width: 2});
                            finalResult.push({name: "Neutral", value: pl.normal, color: "#959700", line_width: 2});
                            finalResult.push({name: "Negative", value: pl.bad, color: "#aa4643", line_width: 2})
                            var result = {data: finalResult, labels: utils.dateRange(params.starttime, params.endtime)}
                            return res.json(result);
                            /*结束*/
                        });
                });

        });

};
exports.SentimentAnalysisByFromTypeBarPost = function (req, res) {
    var params = req.body;
    var startDate = new Date(params.starttime) , endDate = new Date(params.endtime);
    FeedsModel.aggregate(
        { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$gt: 0} }},
        { $group: { _id: "$FromType", value: { $sum: 1 }} },
        { $project: {name: "$_id", value: 1 }},
        { $sort: { name: 1 } },
        function (err, docs) {
            var goodResult = [],badResult=[],labels=[];
            for (var d in docs) {
                docs[d].color = utils.randomColor();
                goodResult.push(docs[d].value);
                labels.push(docs[d].name)
            }
                /***
                 *second
                 */
                FeedsModel.aggregate(
                    { $match: { PublishTimeTemp: { $gte: new Date(startDate), $lte: new Date(endDate)}, Semantic: {$lt: 0} }},
                    { $group: { _id: "$FromType", value: { $sum: 1 }} },
                    { $project: {name: "$_id", value: 1 }},
                    { $sort: { name: 1 } },
                    function (err, docs2) {

                        for (var d2 in docs2) {
                            docs2[d2].color = utils.randomColor();
                            badResult.push(docs2[d2].value);
                        }

                        /**处理*/
                      var finalResult = [];
                      /*   var pl = {
                            good: [],
                            normal: [],
                            bad: []
                        }
                        for( d in goodResult){
                            pl.good.push(goodResult[d].value) ;
                        }
                        for( d in badResult){
                            pl.bad.push(badResult[d].value) ;
                        }*/
                        finalResult.push({name: "Positive", value: goodResult, color:"#4572a7", line_width: 2});
                        finalResult.push({name: "Negative", value: badResult, color: "#aa4643", line_width: 2})
                        var result = {data: finalResult, labels: labels}
                        return res.json(result);
                        /*结束*/
                    });

        });
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
};

