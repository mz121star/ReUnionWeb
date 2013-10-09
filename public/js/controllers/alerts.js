'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AlertsController=['$scope','$rootScope','$http',function($scope,$rootScope,$http) {
        $rootScope.title = "Alerts - "+ res.title;
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

        $scope.editWindowTitle="Add New Alert"

    }];

    return AlertsController;
});