'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var ReportsController = ['$scope', '$rootScope', '$http', '$timeout', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.title = "Reports - " + res.title;
        // $rootScope.title= res.title;
        $scope.source = {
            brand: "兰蔻"
        };


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
        $scope.editWindowTitle = "Add New";
        $scope.addReport = function () {
            $scope.editWindowTitle = "Add New";
            $scope.saveTopicError="";
            var sts = Enumerable.From($scope.Topics)
                .Where(function (x) {
                    return x.checked === true
                })
                .Select("$.type")
                .ToArray();
            if(sts.length===0){
                $scope.saveTopicError="必须选择一个Topic";
                return false;
            }
            $http.post('/subReport', {
                Name: "(" + sts.join("|") + ")-" + $scope.report.type,
                Type: $scope.report.type,
                Receiver: $scope.report.receiver,
                Topics: sts,
                OwnerId: "admin",
                CreateDate: Date.now(),
                UpdateDate: Date.now(),
                Status: 1

            }).success(function (d) {
                    $http.get('/subReport').success(function (d) {
                        $scope.subReports = d;
                    });

                    $scope.saveTopicWarning = "Save Topic Successfully"
                    $scope.report = InitData;
                    $timeout(function () {
                        $scope.saveTopicWarning = ""
                    }, 1000);


                });
        };
        $scope.changeSubStatus = function (report) {
            $http.put('/subReport', {
                _id: report._id

            }).success(function (d) {
                    $http.get('/subReport').success(function (d) {
                        $scope.subReports = d;
                    });
                });
        }


    }];

    return ReportsController;
});