'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var ReportsController = ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.title = "Reports - " + res.title;
        // $rootScope.title= res.title;
        $scope.source = {
            brand: "兰蔻"
        };
        $scope.headers = ['Summary', 'Volume', 'Dashboard'];
        $scope.features = ['Time Trend', 'Sentiment', 'Top feed list'];
        $scope.sections = ['topic1', 'topic2', 'topic3'];
        $scope.reportContent = [
            {Title: "兰蔻", Receiver: "miaozhuang.net"} ,
            {Title: "雅诗兰黛", Receiver: "miaozhuang.net"}     ,
            {Title: "化妆品", Receiver: "miaozhuang.net"},
            {Title: "好评的内容", Receiver: "miaozhuang.net"},
            {Title: "差评", Receiver: "miaozhuang.net"},
        ];
        $http.get('/topic').success(function (d) {

            $scope.Topics = Enumerable.From(d).Select("{type:$.Name,checked:false}").ToArray();
        });
        var InitData = {
            dataType: [
                {value: "日报"} ,
                {value: "周报"},
                {value: "月报"},
                {value: "季报"},
                {value: "年报"}

            ],
            receiver: "",
            type: "日报"
        }
        $scope.report = {
            dataType: [
                {value: "日报"} ,
                {value: "周报"},
                {value: "月报"},
                {value: "季报"},
                {value: "年报"}

            ],
            receiver: "miaozhuang.net",
            type: "日报"

        };

        $http.get('/subReport').success(function (d) {

            $scope.subReports = d;
        });
        $scope.editWindowTitle="Add New" ;
        $scope.addReport = function () {
            $scope.editWindowTitle="Add New" ;
            var sts = Enumerable.From($scope.Topics)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            $http.post('/subReport', {
                Name: "(" + sts.join("|") + ")-" + $scope.report.type,
                Type: $scope.report.type,
                Receiver: $scope.report.receiver,
                Topics: sts,
                OwnerId: "admin",
                CreateDate: Date.now(),
                UpdateDate: Date.now() ,
                Status:1

            }).success(function (d) {
                    $http.get('/subReport').success(function (d) {
                        $scope.subReports = d;
                    });

                    $scope.saveTopicWarning = "Save Topic Successfully"
                        $scope.report = InitData;
                        $timeout(function () {
                            $scope.saveTopicWarning = ""
                        }, 1000) ;


                });
        };
        $scope.changeSubStatus=function(report){
            $http.put('/subReport', {
               _id:report._id

            }).success(function (d) {

                    $http.get('/subReport').success(function (d) {
                        $scope.subReports = d;
                    });
            });
        }
        $scope.$watch("report.dataType", function (v1, v2) {
            console.log(v1);

        }, true)
        $scope.$watch("Topics", function (v1, v2) {
            console.log(v1);
            console.log(v2);
        }, true)


    }];

    return ReportsController;
});