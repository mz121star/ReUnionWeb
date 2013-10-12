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
            $http.post('api/TopicKeywordReportPost',searchData).success(function (a) {
                new iChart.Bar2D({
                    render: 'canvasDiv7',
                    data: a,
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
                $http.post('api/SentimentAnalysisColumnPost',searchData).success(function (d) {
                    new iChart.ColumnStacked2D({
                        render: 'canvasDiv8',
                        data: d.data,
                        labels: d.labels,
                        sub_option:{
                            label:false
                        },
                        showpercent: true,
                        percent: true,//标志为百分比堆积图
                        width: 900,
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
            startTime: "2013-08-01",
            endTime: '2013-08-30',
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