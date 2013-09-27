'use strict';

define([ 'i18n!resources/nls/res', 'ichart' , 'jqueryui'], function (res, ichart) {

    var DashboardController = ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.title = "Dashboard - " + res.title;
        //定义数据
        //定义数据
        var data = [
            {
                name: '北京',
                value: [-9, 1, 12, 20, 26, 30, 32, 29, 22, 12, 0, -6],
                color: '#1f7e92',
                line_width: 2
            }
            ,
            {
                name: '天津',
                value: [4, 11, 2, 4, 5, 23, 11, 32, 12, 22, 29, -3],
                color: '#1f7e92',
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
                background_color: '#EEEEEE',
                data: d,
                title: '搜索来源柱状图',
                width: 400,


                sub_option: {
                    border: {
                        enable: false
                    },
                    label: {color: '#333333'}
                },
                shadow: true,
                shadow_color: '#8d8d8d',
                shadow_blur: 1,
                shadow_offsety: 1,
                shadow_offsetx: 1,
                legend: {enable: false}
            }).draw();
        });
        $http.get('/SearchSource').success(function (searchSourceDate) {
            new iChart.Pie2D({
                render: 'canvasDiv5',
                data: searchSourceDate,
                title: '搜索来源',
                legend: {
                    enable: true
                },
                showpercent: true,
                radius: 140
            }).draw();
        });
        $(function () {

            $http.get('/TopicKeywordReport').success(function (d2) {
                new iChart.Bar2D({
                    render: 'canvasDiv2',
                    data: d2,
                    title: '产品活动关键字',
                    width: 400,
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
                                }
                            }
                        ]
                    }
                }).draw();
            });
            new iChart.ColumnStacked2D({
                render: 'canvasDiv3',
                data: data3,
                labels: ["亚马逊", "京东" ],
                title: {
                    text: '情感分析图',
                    color: '#254d70'
                },


                column_width: 90,
                background_color: '#ffffff',
                shadow: true,
                shadow_blur: 2,
                shadow_color: '#aaaaaa',
                shadow_offsetx: 1,
                shadow_offsety: 0,
                sub_option: {
                    label: {color: '#f9f9f9', fontsize: 12, fontweight: 600},
                    border: {
                        width: 2,
                        color: '#ffffff'
                    }
                },
                label: {color: '#254d70', fontsize: 12, fontweight: 600},
                percent: true,//标志为百分比堆积图
                showpercent: true,
                decimalsnum: 1,
                legend: {
                    enable: true,
                    background_color: null,
                    line_height: 25,
                    color: '#254d70',
                    fontsize: 12,
                    fontweight: 600,
                    border: {
                        enable: false
                    }
                }
            }).draw();


            new iChart.LineBasic2D({
                render: 'canvasDiv4',
                data: data,
                title: '情感分析时间轴曲线图  ',


                sub_option: {
                    hollow_inside: false,//设置一个点的亮色在外环的效果
                    point_size: 16
                },
                labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
            }).draw();


            $(".s-pk-mod").draggable({ revert: "invalid" });
            $(".s-pk-col").droppable({
//                drop: function( event, ui ) {
//                    $( this )
//                        .addClass( "ui-state-highlight" )
//                        .find( "p" )
//                        .html( "Dropped!" );
//                }
            });
        });


    }];

    return DashboardController;
});