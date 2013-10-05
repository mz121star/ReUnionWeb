'use strict';

define([ 'i18n!resources/nls/res', 'ichart' ,'bootstrapAlert'], function (res, ichart) {

    var DashboardController = ['$scope', '$rootScope', '$http','$timeout', function ($scope, $rootScope, $http,$timeout) {
        $rootScope.title = "Dashboard - " + res.title;
        //定义数据
        //定义数据

        var data = [
            {
                name: '好评',
                value: [9, 1, 12, 20, 26, 30, 32, 29, 22, 12, 0, 6],
                color: '#4f81bd',
                line_width: 2
            }
            ,
            {
                name: '中评',
                value: [4, 11, 2, 4, 5, 23, 11, 32, 12, 22, 29, 15],
                color: '#bd4d4a',
                line_width: 2
            },
            {
                name: '差评',
                value: [25, 23, 34, 53, 23, 41, 12, 11, 12, 55, 34, 23],
                color: '#98c045',
                line_width: 2
            }
        ];

        var data1 = [
            {name: 'Civic', value: 6078, color: '#97b3bc'},
            {name: 'Accord', value: 5845, color: '#FF3333'},
            {name: 'Highinder', value: 5008, color: '#cd5c5c'},
            {name: 'Tundra', value: 2662, color: '#006666'},
            {name: 'Corolla', value: 2445, color: '#CC3333'},
            {name: 'Ridgeline', value: 2389, color: '#9d4a4a'},
            {name: 'Prlus', value: 2147, color: '#eee8aa'}


        ];
        var data2 = [
            {name: '化妆品', value: 33.1, color: '#b5bcc5'},
            {name: '促销', value: 19.14, color: '#b5bcc5'},
            {name: '洗面奶', value: 13.97, color: '#b5bcc5'},
            {name: '高端', value: 7.44, color: '#b5bcc5'},
            {name: '奢饰品', value: 5.22, color: '#b5bcc5'}

        ];
        var data3 = [
            {
                name: '一月',
                value: [45, 52, 54, 60],
                color: '#4f81bd'
            },
            {
                name: '二月',
                value: [60, 80, 105, 80],
                color: '#bd4d4a'
            },
            {
                name: '三月',
                value: [50, 70, 120, 100],
                color: '#98c045'
            }
        ];

        var data5 = [
            {name: 'Baidu', value: 35.75, color: '#9d4a4a'},
            {name: 'Google', value: 29.84, color: '#5d7f97'},
            {name: 'Firefox', value: 24.88, color: '#97b3bc'},
            {name: 'Safari', value: 6.77, color: '#a5aaaa'},
            {name: 'Opera', value: 2.02, color: '#778088'},
            {name: 'Other', value: 0.73, color: '#6f83a5'}
        ];


        $http.get('/2DBarReprot').success(function (d) {
            new iChart.Bar2D({
                render: 'canvasDiv1',
                data: d,
                width: 550,
                height:315,
                border:'none',
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
                height:315,
                border:'none',
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
        }).error(function(data, status, headers, config) {

                $scope.global.error="内部数据错误";
               $timeout(function(){ $scope.global.error="";},3000)

        });
        $(function () {

            $http.get('/TopicKeywordReport').success(function (d2) {
                new iChart.Bar2D({
                    render: 'canvasDiv2',
                    data: d2,
//                    title: '产品活动关键字',
                    width: 550,
                    height:315,
                    border:'none',
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
            })
            new iChart.ColumnStacked2D({
                render: 'canvasDiv3',
                data: data3,
                labels: ["亚马逊", "京东" ],
                title: {
                    text: '情感分析图',
                    color: '#254d70'
                },
                label: {color: '#254d70', fontsize: 12, fontweight: 600},
                percent: true,//标志为百分比堆积图
                showpercent: true,
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

//            $http.get('/SentimentAnalysis').success(function (d4) {
            $http.get('/SentimentAnalysis').success(function (d) {
                new iChart.LineBasic2D({
                    render: 'canvasDiv4',
                    data: d,
//                    title: '情感分析时间轴曲线图  ',
                    width: 550,
                    height:315,
                    border:'none',
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
            })
//            });


            $http.get('/KeyWordCloud').success(function (d2) {
                var canvas = document.getElementById('canvasDiv6');
                var context = canvas.getContext('2d');
                context.fillStyle = "#ff0000";
                context.textBaseline = "top";
                context.font = " 50px  Helvetica,arial";
                for(var i in d2){
                    var v=d2[i];
                    context.fillText(v.name, Math.round(Math.random()*200),  Math.round(Math.random()*200));
                    context.fillStyle = v.color;
                    if(v.value>100)
                        v.value=v.value/3;
                    else if(v.value<14)
                        v.value= v.value;
                    else if(v.value>30)
                        v.value= v.value/2;

                    context.font = v.value+"px  Helvetica,arial";
                }




            });
            /*           $(".s-pk-mod").draggable({ revert: "invalid" });
             $(".s-pk-col").droppable({
             //                drop: function( event, ui ) {
             //                    $( this )
             //                        .addClass( "ui-state-highlight" )
             //                        .find( "p" )
             //                        .html( "Dropped!" );
             //                }
             });*/
        });


    }];

    return DashboardController;
});