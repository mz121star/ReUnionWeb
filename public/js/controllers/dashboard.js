'use strict';

define([ 'i18n!resources/nls/res', 'ichart' , 'async' , 'moment' ], function (res, ichart, async, moment) {


    var DashboardController = ['$scope', '$rootScope', '$http', '$timeout', '$location', '$window' , function ($scope, $rootScope, $http, $timeout, $location, $window) {
        $rootScope.menuUrl = "partials/leftmenu/dashboardMenu.html";
        $rootScope.title = "Dashboard - " + res.title;
        var sentimentAnalysisTimelineURL = "widgets/sentimentAnalysisTimelineChart/index.html"
        $scope.distributionDiagram = "widgets/geoChart/index.html";
        $scope.feedsStatistics = "widgets/candlstickChart/index.html";
        $scope.sentimentAnalysisTimeline = sentimentAnalysisTimelineURL;
        $scope.searchDate = {
            starttime: moment(new Date()).add('days', -30).format("MM/DD/YYYY"),
            endtime: moment(new Date()).format("MM/DD/YYYY")
        };


        /************************************************************************************
         *动态生成图表，
         ************************************************************************************/
        $scope.searchDataForChart = "?" + decodeURIComponent($.param($scope.searchDate))

            $http.get('api/mywidgets').success(function (u) {          //查找数据库中最新的用户信息
                $http.get("api/widget?ids=" +u[0].widgets.join(",")).success(function (d) {
                    $scope.myDashBoards = d;

                });
            });

        $scope.remove = function (id) {
            console.log(id)
        }

        /*    $scope.myDashBoards=[
         {Name:"geoChart",Height:"400",Size:"12",ChartTitle:"Distribution Diagram",Id:"sadasd12312312"} ,
         {Name:"sentimentAnalysisTimelineChart",ChartTitle:"Sentiment Analysis Timeline",Id:"ASDW#@#@"}
         ]*/

        $scope.dashboard = {
            endDate: "",
            startDate: moment().add("days", -30)
        };
        $rootScope.show = true;
        $scope.$watch("dataRange", function (v1, v2) {
            if (v1) {
                $scope.dashboard.endDate = $scope.searchDate.endtime = moment(new Date()).format("MM/DD/YYYY");
                $scope.dashboard.startDate = $scope.searchDate.starttime = moment(new Date()).add('days', -v1).format("MM/DD/YYYY");
                loadReport();
            }
        });
        var loadReport = function () {
            $scope.searchDataForChart = "?" + decodeURIComponent($.param($scope.searchDate))


        };
        $scope.search = function () {
            $scope.searchDate.starttime = $scope.dashboard.startDate;
            $scope.searchDate.endtime = $scope.dashboard.endDate;

            loadReport();
        };

        $(function () {
            loadReport();
        });


    }];

    return DashboardController;
});