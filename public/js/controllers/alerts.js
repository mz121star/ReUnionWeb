'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AlertsController=['$scope','$rootScope','$http','$timeout',function($scope,$rootScope,$http,$timeout) {
        $rootScope.menuUrl="";
        $rootScope.title = "Alerts - "+ res.title;
        $http.get('api/topic').success(function (d) {

            $scope.Topics = Enumerable.From(d).Select("{type:$.Name,checked:false}").ToArray();
        });
        $http.get('api/alert').success(function (d) {

            $scope.alerts = d;
        });
        $scope.alert = {
            name:"" ,
            keywords:"兰蔻 打折",
            maito:"zhuang.miao@pactera.com",
            smsto:"13840816168",
            receiver: "miaozhuang.net" ,
            startTime:"2012-02-12",
            endTime  :"2012-04-12"

        };
        $scope.addAlert = function () {

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
            $http.post('api/alert', {
                Name:$scope.alert.name ,
                IsRegex:false,
                Keyword:$scope.alert.keywords,
                MailTo: $scope.alert.maito,
                SMSTo:   $scope.alert.smsto,
                Topics: sts,
                Type: "",
                OwnerId: "admin",
                AlertStartTime: $scope.alert.startTime,
                AlertEndTime: $scope.alert.endTime,
                CreateDate: Date.now(),
                UpdateDate: Date.now()


            }).success(function (d) {
                    $http.get('api/alert').success(function (d) {
                        $scope.alerts = d;
                    });

                    $scope.saveTopicWarning = "Save Alert Successfully"

                    $timeout(function () {
                        $scope.saveTopicWarning = ""
                    }, 1000);


                });
        };
        $scope.editWindowTitle="Add New Alert"

    }];

    return AlertsController;
});