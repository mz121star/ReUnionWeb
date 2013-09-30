'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs','jqueryuniform' ], function (res, excel) {

    var AnalysisController=['$scope','$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {
        $rootScope.title ="Analysis - "+ res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };
        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];
        $scope.professionalSites = ['CSDN', 'IDC'];
        $scope.searchFeed = function () {
                          //主业务
            var sts = Enumerable.From($scope.sourcetype)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            sts=sts.join('|')
            console.log(sts);
            var searchData={st:sts,starttime:$scope.feeds.startTime,endtime:$scope.feeds.endTime};
            console.log(searchData);
            $http.post('/SearchSource',searchData).success(function (a) {
                //搜索来源饼图
                new iChart.Pie2D({
                    render: 'canvasDiv3',
                    data: a,
                    legend: {
                        enable: true
                    },
                    showpercent: true,
                    radius: 140 ,
                    sub_option : {
                        label : {
                            background_color:null,
                            sign:false,//设置禁用label的小图标
                            padding:'0 4',
                            border:{
                                enable:false,
                                color:'#666666'
                            },
                            fontsize:12,
                            fontweight:600,
                            color : '#4572a7'
                        },
                        border : {
                            width : 2,
                            color : '#ffffff'
                        }
                    }
                }).draw();
                $http.post('/2DBarReprot',searchData).success(function (d) {
                    new iChart.Bar2D({
                        render: 'canvasDiv4',
                        background_color: '#EEEEEE',
                        data: d,
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
            });
        };
        FeedService.querySourceType().then(function (d) {
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });
        $scope.feeds = {
            startTime: '2013-01-12',
            endTime: '2013-11-12',
            sourceTypeName: ''  ,
            description:''
        };
        $scope.$watch('feeds.startTime+feeds.endTime', function (v1, v2) {
            if ($scope.feeds.startTime >= $scope.feeds.endTime) {
                $scope.warning = "开始不能大于结束";
                $scope.searchFeedForm.$invalid = true;
            }
            else {
                $scope.warning = ""
                $scope.searchFeedForm.$invalid = false;
            }
        });
    }];
//        var data = [
//            {
//                name : '北京',
//                value:[-9,1,12,20,26,30,32,29,22,12,0,-6],
//                color:'#1f7e92',
//                line_width:3
//            }
//        ];
//        var data1 = [
//            {name : 'Civic',value : 6078,color:'#97b3bc'},
//            {name : 'Accord',value : 5845,color:'#FF3333'},
//            {name : 'Highinder',value : 5008,color:'#cd5c5c'},
//            {name : 'Tundra',value : 2662,color:'#006666'},
//            {name : 'Corolla',value : 2445,color:'#CC3333'},
//            {name : 'Ridgeline',value : 2389,color:'#9d4a4a'},
//            {name : 'Prlus',value : 2147,color:'#eee8aa'}
//
//        ];
//
//        var data3 = [
//            {
//                name : '一月',
//                value:[45,52,54,60],
//                color:'#4f81bd'
//            },
//            {
//                name : '二月',
//                value:[60,80,105,80],
//                color:'#bd4d4a'
//            },
//            {
//                name : '三月',
//                value:[50,70,120,100],
//                color:'#98c045'
//            }
//        ];
//        new iChart.ColumnStacked2D({
//            render : 'canvasDiv3',
//            data: data3,
//            labels:["亚马逊","京东" ],
//            title : {
//                text:'收录情况',
//                color:'#254d70'
//            },
//
//
//            column_width:90,
//            background_color : '#ffffff',
//            shadow : true,
//            shadow_blur : 2,
//            shadow_color : '#aaaaaa',
//            shadow_offsetx : 1,
//            shadow_offsety : 0,
//            sub_option:{
//                label:{color:'#f9f9f9',fontsize:12,fontweight:600},
//                border : {
//                    width : 2,
//                    color : '#ffffff'
//                }
//            },
//            label:{color:'#254d70',fontsize:12,fontweight:600},
//            percent:true,//标志为百分比堆积图
//            showpercent:true,
//            decimalsnum:1,
//            legend:{
//                enable:true,
//                background_color : null,
//                line_height:25,
//                color:'#254d70',
//                fontsize:12,
//                fontweight:600,
//                border : {
//                    enable : false
//                }
//            },
//            coordinate:{
//                background_color : 0,
//                axis : {
//                    color : '#c0d0e0',
//                    width : 0
//                },
//                scale:[{
//                    position:'left',
//                    scale_enable : false,
//                    start_scale:0,
//                    scale_space:50,
//                    label:{color:'#254d70',fontsize:11,fontweight:600}
//                }],
//                width:600,
//                height:260
//            }
//        })  .draw();
//
//
//
//        new iChart.LineBasic2D({
//            render : 'canvasDiv4',
//            data: data,
//            title : '亚马逊收录情况',
//
//            coordinate:{height:'90%',background_color:'#f6f9fa'},
//            sub_option:{
//                hollow_inside:false,//设置一个点的亮色在外环的效果
//                point_size:16
//            },
//            labels:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
//        }) .draw();
    return AnalysisController;
});