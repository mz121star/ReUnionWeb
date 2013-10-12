'use strict';

define([ 'i18n!resources/nls/res', 'ichart' , 'async', 'bootstrapAlert'], function (res, ichart, async) {

    var DashboardController = ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.menuUrl="partials/leftmenu/dashboardMenu.html";
        $rootScope.title = "Dashboard - " + res.title;
        $scope.searchDate={
            starttime:"2013-08-01",
            endtime:"2013-08-31"
        }



        var loadReport = function () {
        $http.post('api/2DBarReprotPost', $scope.searchDate).success(function (d) {
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
        $http.post('api/TopicKeywordReportPost', $scope.searchDate).success(function (d2) {
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

        });
        $http.post('/api/SearchSourcePost', $scope.searchDate).success(function (a) {
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
        $http.get('api/KeyWordCloud').success(function (d2) {
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


        });

        async.series([
            function (callback) {
                $http.post('/api/SentimentAnalysisColumnPost', $scope.searchDate).success(function (d) {
                    new iChart.ColumnStacked2D({
                        render: 'canvasDiv3',
                        data: d.data,
                        labels: d.labels,
                        sub_option:{
                            label:false
                        },
                        showpercent: true,
                        percent: true,//标志为百分比堆积图
                        width: 500,
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
                });
            },
            function (callback) {
                $http.post('api/SentimentAnalysisPost', $scope.searchDate).success(function (d) {
                    //搜索来源饼图
                    new iChart.LineBasic2D({
                        render: 'canvasDiv4',
                        data: d.data,
                        labels: d.labels,
//                    title: '情感分析时间轴曲线图  ',
                        width: 500,
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
                        }
                    }).draw();
                    callback(null, 'five');
                });
            }
        ]);
        }
        $scope.search=function(){
            $scope.searchDate.starttime=$scope.dashboard.startDate;
            $scope.searchDate.endtime=$scope.dashboard.endDate ;

            loadReport();
        }
        loadReport();
    }];

    return DashboardController;
});