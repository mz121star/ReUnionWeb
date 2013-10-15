'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs' ], function (res, excel) {

    var AnalysisController=['$scope','$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {
        $rootScope.menuUrl="";
        $rootScope.title ="Analysis - "+ res.title;
        $rootScope.show=false;
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
            $http.post('/api/SearchSourcePost',searchData).success(function (a) {
                //搜索来源饼图
                new iChart.Pie2D({
                    render: 'canvasDiv7',
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
                $http.post('/api/SentimentAnalysisPost',searchData).success(function (d) {
                    new iChart.LineBasic2D({
                        render: 'canvasDiv8',
                        data: d.data,
                        labels: d.labels,
                        label : {fontsize:8},
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