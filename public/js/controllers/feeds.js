'use strict';

define([ 'i18n!resources/nls/res', '../utils/excel', 'bootstrapModal', 'linqjs' ], function (res, excel) {

    var FeedsController = ['$scope', '$rootScope', '$http', 'FeedService' , function ($scope, $rootScope, $http, FeedService) {
        $rootScope.title = "Feeds - " + res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };

        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];
        $scope.professionalSites = ['CSDN', 'IDC'];
        $scope.selectkimiss = function (row) {
            $scope.selectedRow = row;
        };
        $scope.searchFeed = function () {
            var sts = Enumerable.From($scope.sourcetype)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            console.log(sts);

            $http.get("/feeds").success(function (d) {
                console.log($scope.feeds.startTime);
                $scope.feedContent = Enumerable.From(d)
                    .Where(function (x) {
                        return x.CrawlerTime > $scope.feeds.startTime && x.CrawlerTime < $scope.feeds.endTime && sts.indexOf(x.FromType) >= 0;
                    })
                    .ToArray();
            })

        };
//        $http.get('/kimiss').success(function (data) {
//            $scope.kimiss = data;
//        });
        FeedService.query().then(function (d) {
            // $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("$.FromType").ToJSON();
            $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("{type:$.FromType,checked:false}").ToArray();
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
        });
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
        $scope.exportExcel = function (tname, excelname) {
            excel(tname, excelname);
        }
    }];

    return FeedsController;
});