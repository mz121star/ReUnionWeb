'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs' ], function (res, excel) {

    var FeedsController = ['$scope', '$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {
        $rootScope.title = "Feeds - " + res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };

        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];
        $scope.professionalSites = ['CSDN', 'IDC'];
        $scope.sourceTypeChange = function (e) {
            console.log(e);
        };
        $scope.selectkimiss = function (row) {
            $scope.selectedRow = row;
        };
        $scope.searchFeed = function () {
            $http.get("/feeds").success(function (d) {
                console.log($scope.feeds.startTime);
                $scope.feedContent = Enumerable.From(d)
                    .Where(function (x) {
                        return x.CrawlerTime > $scope.feeds.startTime && x.CrawlerTime < $scope.feeds.endTime
                    })
                    /*.Where("$.CrawlerTime>"+$scope.feeds.startTime)*/
                    .ToArray();
            })

        };
//        $http.get('/kimiss').success(function (data) {
//            $scope.kimiss = data;
//        });
        FeedService.query().then(function (d) {
            $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("$.FromType").ToArray();
        });

        $scope.feeds = {
            startTime: '',
            endTime: '',
            sourceTypeName: ''
        };

        $scope.showDetail = function (feed) {
            $scope.modal.title = feed.Title;
            $scope.modal.source = feed.FromSite;
            $scope.modal.url = feed.FromUrl;
            $scope.modal.content = feed.content || feed.Content;
        };
        $scope.modal = {
            title: "Title",
            source: "",
            url: ""
        };
        $http.get("/feeds").success(function (d) {
            $scope.feedContent = d;
        }) ;
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
        $scope.exportExcel=function(tname,excelname){
               excel(tname,excelname);
        }
    }];

    return FeedsController;
});