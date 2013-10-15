'use strict';

define([ 'i18n!resources/nls/res', 'ichart' , 'async' , 'moment', 'bootstrapAlert'], function (res, ichart, async, moment) {


    var DashboardController = ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.menuUrl = "partials/leftmenu/dashboardMenu.html";
        $rootScope.title = "Dashboard - " + res.title;
        $scope.searchDate = {
            starttime: "2013-08-01",
            endtime: "2013-08-31"
        }

        $rootScope.show=false;
        $scope.$watch("dataRange", function (v1, v2) {
            if (v1 ) {
                $scope.searchDate.endtime = new Date();
                $scope.searchDate.starttime = moment(new Date()).add('days', -v1).calendar();
                loadReport();
            }
        })
        var loadReport = function () {


            async.series([
                function (callback) {
                    $http.post('api/2DBarReprotPost', $scope.searchDate).success(function (d) {
                        new iChart.Bar2D({
                            render: 'canvasDiv1',
                            data: d,
                            width: 450,
                            height: 300,
                            border:false,
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
                        callback(null, '1');
                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '1');
                        });
                },
                function (callback) {
                    $http.post('api/TopicKeywordReportPost', $scope.searchDate).success(function (d2) {
                        new iChart.Bar2D({
                            render: 'canvasDiv2',
                            data: d2,
//                    title: '产品活动关键字',
                            width: 450,
                            height: 300,
                            border:false,
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
                        callback(null, '2');
                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '2');
                        });
                },
                function (callback) {
                    $http.post('/api/SearchSourcePost', $scope.searchDate).success(function (a) {
                        new iChart.Pie2D({
                            render: 'canvasDiv5',
                            data: a,
                            //title: '搜索来源',
                            width: 450,
                            height: 300,
                            border:false,
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
                        callback(null, '3');
                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '3');
                        });
                },
                function (callback) {
                    $http.get('api/KeyWordCloud').success(function (d2) {
                        var canvas = document.getElementById('canvasDiv6');
                        var context = canvas.getContext('2d');
                        context.fillStyle = "#ff0000";
                        context.textBaseline = "top";
                        context.font = " 50px  Helvetica,arial";
                        for (var i in d2) {
                            var v = d2[i];
                            context.fillText(v.name, Math.round(Math.random() *150), Math.round(Math.random() *200));
                            context.fillStyle = v.color;
                            v.value= Math.log(v.value) / (Math.log(100)-Math.log(1)) * 20 + 1
                           /* if (v.value > 100)
                                v.value = v.value / 3;
                            else if (v.value < 14)
                                v.value = v.value;
                            else if (v.value > 30)
                                v.value = v.value / 2;
                            if(v.value>40)
                                v.value=40;*/

                            context.font = v.value + "px  Helvetica,arial";

                        }
                        callback(null, '4');

                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '4');
                        });
                },
                function (callback) {
                    $http.post('/api/SentimentAnalysisColumnPost', $scope.searchDate).success(function (d) {
                        new iChart.ColumnStacked2D({
                            render: 'canvasDiv3',
                            data: d.data,
                            labels: d.labels,
                            sub_option: {
                                label: false
                            },
                            showpercent: true,
                            percent: true,//标志为百分比堆积图
                            width: 450,
                            height: 300,
                            border:false,
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
                        callback(null, '5');
                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '5');
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
                            width: 450,
                            height: 300,
                            border:false,
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
                        callback(null, '6');
                    }).error(function (data, status, headers, config) {

                            $scope.global.error = "内部数据错误";
                            $timeout(function () {
                                $scope.global.error = "";
                            }, 3000)
                            callback(null, '6');
                        });
                }
            ]);
        }
        $scope.search = function () {
            $scope.searchDate.starttime = $scope.dashboard.startDate;
            $scope.searchDate.endtime = $scope.dashboard.endDate;

            loadReport();
        }
       // loadReport();
        //定义数据组
        var data1 = [
            {name : 'Mirco Blog',value : 55.11,color : '#4572a7'},
            {name : 'eCommerce ',value : 29.84,color : '#aa4643'},
            {name : 'Forum',value : 24.88,color : '#89a54e'},
            {name : 'News Media',value : 6.77,color : '#80699b'},

        ];
        var data2 = [
            {name : 'MISE 6.0',value : 10.80,color : '#4572a7'},
            {name : 'MISE 7.0',value : 7.40,color : '#4572a7'},
            {name : 'MISE 8.0',value : 33.06,color : '#4572a7'},
            {name : 'MISE 9.0',value : 2.81,color : '#4572a7'}
        ];
        var data3 = [
            {name : 'Firefox 2.0',value : 0.2,color : '#aa4643'},
            {name : 'Firefox 3.0',value : 0.8,color : '#aa4643'},
            {name : 'Firefox 3.5',value : 1.61,color : '#aa4643'},
            {name : 'Firefox 3.6',value : 13.12,color : '#aa4643'},
            {name : 'Firefox 4.0',value : 5.43,color : '#aa4643'}
        ];
        var data4 = [
            {name : 'Chrome 5.0',value : 0.12,color : '#89a54e'},
            {name : 'Chrome 6.0',value : 0.19,color : '#89a54e'},
            {name : 'Chrome 7.0',value : 0.12,color : '#89a54e'},
            {name : 'Chrome 8.0',value : 0.36,color : '#89a54e'},
            {name : 'Chrome 9.0',value : 0.32,color : '#89a54e'},
            {name : 'Chrome 10.0',value : 9.91,color : '#89a54e'},
            {name : 'Chrome 11.0',value : 0.5,color : '#89a54e'},
            {name : 'Chrome 12.0',value : 0.22,color : '#89a54e'}
        ];
        var data5 = [
            {name : 'Safari 5.0',value : 4.55,color : '#80699b'},
            {name : 'Safari 4.0',value : 1.42,color : '#80699b'},
            {name : 'Safari Win 5.0',value : 0.23,color : '#80699b'},
            {name : 'Safari 4.1',value : 0.21,color : '#80699b'},
            {name : 'Safari/Maxthon',value : 0.2,color : '#80699b'},
            {name : 'Safari 3.1',value : 0.19,color : '#80699b'}
        ];


        var data = {
            'All':data1,
            'MISE':data2,
            'Firefox':data3,
            'Chrome':data4,
            'Safari':data5

        }
        var sub = false;
        function toChart(title,subtitle,d){
            var chart = new iChart.Column2D({
                render : 'canvasDiv1',
                data : d,
                title : {
                    text : title,
                    color : '#3e576f'
                },
                subtitle : {
                    text : subtitle,
                    color : '#6d869f'
                },
                footnote : {
                    text : 'ichartjs.com',
                    color : '#909090',
                    fontsize : 11,
                    padding : '0 38'
                },
                width :450,
                height : 300,
                label : {
                    fontsize:11,
                    color : '#666666'
                },
                animation : true,
                animation_duration:700,//700ms完成动画
                shadow : true,
                shadow_blur : 2,
                shadow_color : '#aaaaaa',
                shadow_offsetx : 1,
                shadow_offsety : 0,
                sub_option : {
                    listeners : {
                        parseText : function(r, t) {
                            return t + "%";
                        },
                        click:function(r,e){
                            sub = !sub;
                            if(sub)
                                toChart(r.get('name') ,
                                    ' ',
                                    data[r.get('name')]);
                            else
                                toChart(' ',
                                    ' ',
                                    data.All);

                        }
                    },
                    label : {
                        fontsize:11,
                        fontweight:600,
                        color : '#4572a7'
                    },
                    border : {
                        width : 2,
                        color : '#ffffff'
                    }
                },
                tip:{
                    enable:true,
                    listeners:{
                        parseText:function(tip,name,value,text){
                            if(sub)
                                return name+":"+(value/this.get('total') * 100).toFixed(2)+ "%<br/>点击返回总图";
                            else
                                return name+":"+(value/this.get('total') * 100).toFixed(2)+ "%<br/>点击进入"+name+"详情";
                        }
                    }
                },
                coordinate : {
                    background_color : null,
                    grid_color : '#c0c0c0',
                    width : 660,
                    axis : {
                        color : '#c0d0e0',
                        width : [0, 0, 1, 0]
                    },
                    scale : [{
                        position : 'left',
                        scale_enable : false,
                        label : {
                            fontsize:11,
                            color : '#666666'
                        }
                    }]
                }
            });

            /**
             *利用自定义组件构造左侧说明文本。
             */
            chart.plugin(new iChart.Custom({
                drawFn:function(){
                    /**
                     *计算位置
                     */
                    var coo = chart.getCoordinate(),
                        x = coo.get('originx'),
                        y = coo.get('originy'),
                        H = coo.height;
                    /**
                     *在左侧的位置，设置逆时针90度的旋转，渲染文字。
                     */
                    chart.target.textAlign('center')
                        .textBaseline('middle')
                        .textFont('600 13px Verdana')
                        .fillText('Total percent market share',x-40,y+H/2,false,'#6d869f', false,false,false,-90);

                }
            }));

            chart.draw();
        }
        $(function() {
            toChart('',
                '',
                data.All);
        });


    }];

    return DashboardController;
});