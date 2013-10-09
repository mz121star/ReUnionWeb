'use strict';

define([ 'i18n!resources/nls/res', 'ichart' , 'async','bootstrapAlert'], function (res, ichart,async) {

    var DashboardController = ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.title = "Dashboard - " + res.title;

   /*     $http.get('/2DBarReprot').success(function (d) {
            new iChart.Bar2D({
                render: 'canvasDiv1',
                data: d,
                width: 550,
                height: 315,
                border: 'none',
                coordinate: {
                    scale: [
                        {
                            position: 'bottom',
                            listeners: {
                                parseText: function (t, x, y) {
                                    return {text: t}
                                }
                            },
                            label: {color: '#254d70', fontsize: 11, fontweight: 600}
                        }
                    ]
                }
            }).draw();
        });
        $http.get('/SearchSource').success(function (a) {
            new iChart.Pie2D({
                render: 'canvasDiv5',
                data: a,
                //title: '搜索来源',
                width: 550,
                height: 315,
                border: 'none',
                legend: {
                    enable: true
                },
                showpercent: true,
                radius: 140,
                sub_option: {
                    label: {
                        background_color: null,
                        sign: false,//设置禁用label的小图标
                        padding: '0 4',
                        border: {
                            enable: false,
                            color: '#666666'
                        },
                        fontsize: 12,
                        fontweight: 600,
                        color: '#4572a7'
                    },
                    border: {
                        width: 2,
                        color: '#ffffff'
                    }
                }
            }).draw();
        }).error(function (data, status, headers, config) {

                $scope.global.error = "内部数据错误";
                $timeout(function () {
                    $scope.global.error = "";
                }, 3000)

            });
        $http.get('/TopicKeywordReport').success(function (d2) {
            new iChart.Bar2D({
                render: 'canvasDiv2',
                data: d2,
//                    title: '产品活动关键字',
                width: 550,
                height: 315,
                border: 'none',
                offsetx: 17,
                padding: 25,
                coordinate: {
                    scale: [
                        {
                            position: 'bottom',
                            listeners: {
                                parseText: function (t, x, y) {
                                    return {text: t}
                                }
                            },
                            label: {color: '#254d70', fontsize: 11, fontweight: 600}
                        }
                    ]
                }
            }).draw();
        }) ;
        $http.get('/SentimentAnalysisColumn').success(function (d) {
            new iChart.ColumnStacked2D({
                render: 'canvasDiv3',
                data: d,
                labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
                label: {color: '#254d70', fontsize: 12, fontweight: 600},
                percent: true,//标志为百分比堆积图
                showpercent: true,
                width: 550,
                height: 315,
                border: 'none',
                decimalsnum: 1,
                tip: {
                    enable: true,
                    shadow: true
                },
                legend: {
                    enable: true,
                    background_color: null,
                    border: {
                        enable: false
                    },
                    offsetx: 19,//设置x轴偏移，满足位置需要
                    offsety: -20//设置y轴偏移，满足位置需要
                },
                coordinate: {
                    axis: {
                        color: '#c0d0e0',
                        width: 0
                    },
                    scale: [
                        {
                            position: 'left',
                            scale_enable: false,
                            start_scale: 0,
                            scale_space: 50,
                            label: {color: '#254d70', fontsize: 11, fontweight: 600}
                        }
                    ]
                }
            }).draw();
        });
        $http.get('/SentimentAnalysis').success(function (d) {
            new iChart.LineBasic2D({
                render: 'canvasDiv4',
                data: d,
//                    title: '情感分析时间轴曲线图  ',
                width: 550,
                height: 315,
                border: 'none',
                tip: {
                    enable: true,
                    shadow: true
                },
                legend: {
                    enable: true,
                    sign: 'bar',
                    background_color: null,//设置透明背景
                    offsetx: 19,//设置x轴偏移，满足位置需要
                    offsety: -20,//设置y轴偏移，满足位置需要
                    border: true
                },
                sub_option: {
                    hollow_inside: false,//设置一个点的亮色在外环的效果
                    point_size: 10
                },
                labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
            }).draw();
        });
        $http.get('/KeyWordCloud').success(function (d2) {
            var canvas = document.getElementById('canvasDiv6');
            var context = canvas.getContext('2d');
            context.fillStyle = "#ff0000";
            context.textBaseline = "top";
            context.font = " 50px  Helvetica,arial";
            for (var i in d2) {
                var v = d2[i];
                context.fillText(v.name, Math.round(Math.random() * 200), Math.round(Math.random() * 200));
                context.fillStyle = v.color;
                if (v.value > 100)
                    v.value = v.value / 3;
                else if (v.value < 14)
                    v.value = v.value;
                else if (v.value > 30)
                    v.value = v.value / 2;

                context.font = v.value + "px  Helvetica,arial";
            }


        });*/

        async.series([
            function(callback){  $http.get('/2DBarReprot').success(function (d) {
                new iChart.Bar2D({
                    render: 'canvasDiv1',
                    data: d,
                    width: 550,
                    height: 315,
                    border: 'none',
                    coordinate: {
                        scale: [
                            {
                                position: 'bottom',
                                listeners: {
                                    parseText: function (t, x, y) {
                                        return {text: t}
                                    }
                                },
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
                callback(null, 'one');
            }); },
            function(callback){$http.get('/TopicKeywordReport').success(function (d2) {
                new iChart.Bar2D({
                    render: 'canvasDiv2',
                    data: d2,
//                    title: '产品活动关键字',
                    width: 550,
                    height: 315,
                    border: 'none',
                    offsetx: 17,
                    padding: 25,
                    coordinate: {
                        scale: [
                            {
                                position: 'bottom',
                                listeners: {
                                    parseText: function (t, x, y) {
                                        return {text: t}
                                    }
                                },
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
                callback(null, 'three');
            }) ;},


            function(callback){$http.get('/SentimentAnalysisColumn').success(function (d) {
                new iChart.ColumnStacked2D({
                    render: 'canvasDiv3',
                    data: d,
                    labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
                    label: {color: '#254d70', fontsize: 12, fontweight: 600},
                    percent: true,//标志为百分比堆积图
                    showpercent: true,
                    width: 550,
                    height: 315,
                    border: 'none',
                    decimalsnum: 1,
                    tip: {
                        enable: true,
                        shadow: true
                    },
                    legend: {
                        enable: true,
                        background_color: null,
                        border: {
                            enable: false
                        },
                        offsetx: 19,//设置x轴偏移，满足位置需要
                        offsety: -20//设置y轴偏移，满足位置需要
                    },
                    coordinate: {
                        axis: {
                            color: '#c0d0e0',
                            width: 0
                        },
                        scale: [
                            {
                                position: 'left',
                                scale_enable: false,
                                start_scale: 0,
                                scale_space: 50,
                                label: {color: '#254d70', fontsize: 11, fontweight: 600}
                            }
                        ]
                    }
                }).draw();
                callback(null, 'four');
            });},
            function(callback){$http.get('/SentimentAnalysis').success(function (d) {
                new iChart.LineBasic2D({
                    render: 'canvasDiv4',
                    data: d,
//                    title: '情感分析时间轴曲线图  ',
                    width: 550,
                    height: 315,
                    border: 'none',
                    tip: {
                        enable: true,
                        shadow: true
                    },
                    legend: {
                        enable: true,
                        sign: 'bar',
                        background_color: null,//设置透明背景
                        offsetx: 19,//设置x轴偏移，满足位置需要
                        offsety: -20,//设置y轴偏移，满足位置需要
                        border: true
                    },
                    sub_option: {
                        hollow_inside: false,//设置一个点的亮色在外环的效果
                        point_size: 10
                    },
                    labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
                }).draw();
                callback(null, 'five');
            });},
            function(callback){  $http.get('/SearchSource').success(function (a) {
                new iChart.Pie2D({
                    render: 'canvasDiv5',
                    data: a,
                    //title: '搜索来源',
                    width: 550,
                    height: 315,
                    border: 'none',
                    legend: {
                        enable: true
                    },
                    showpercent: true,
                    radius: 140,
                    sub_option: {
                        label: {
                            background_color: null,
                            sign: false,//设置禁用label的小图标
                            padding: '0 4',
                            border: {
                                enable: false,
                                color: '#666666'
                            },
                            fontsize: 12,
                            fontweight: 600,
                            color: '#4572a7'
                        },
                        border: {
                            width: 2,
                            color: '#ffffff'
                        }
                    }
                }).draw();
                callback(null, 'two');
            }).error(function (data, status, headers, config) {

                    $scope.global.error = "内部数据错误";
                    $timeout(function () {
                        $scope.global.error = "";
                    }, 3000)

                }); },
            function(callback){  $http.get('/KeyWordCloud').success(function (d2) {
                var canvas = document.getElementById('canvasDiv6');
                var context = canvas.getContext('2d');
                context.fillStyle = "#ff0000";
                context.textBaseline = "top";
                context.font = " 50px  Helvetica,arial";
                for (var i in d2) {
                    var v = d2[i];
                    context.fillText(v.name, Math.round(Math.random() * 200), Math.round(Math.random() * 200));
                    context.fillStyle = v.color;
                    if (v.value > 100)
                        v.value = v.value / 3;
                    else if (v.value < 14)
                        v.value = v.value;
                    else if (v.value > 30)
                        v.value = v.value / 2;

                    context.font = v.value + "px  Helvetica,arial";
                    callback(null, 'six');
                }


            });}

        ]);

    }];

    return DashboardController;
});