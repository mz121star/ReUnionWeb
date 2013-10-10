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
                $http.post('/SentimentAnalysisColumnPost',searchData).success(function (d) {
                    new iChart.ColumnStacked2D({
                        render: 'canvasDiv4',
                        data: d,
                        labels: [new Date(searchData.starttime),searchData.endtime],
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
            });
        };
        FeedService.querySourceType().then(function (d) {
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });
        $scope.feeds = {
            startTime: new Date(),
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
    return AnalysisController;
});