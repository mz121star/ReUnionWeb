'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var ReportsController = ['$scope', '$rootScope','$http', function ($scope, $rootScope,$http) {
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

            $scope.Topics= Enumerable.From(d).Select("{type:$.Name,checked:false}").ToArray();
        });
        $scope.report = {
            dataType: [
                {value: "日报"} ,
                {value: "周报"},
                {value: "月报"},
                {value: "季报"},
                {value: "年报"}

            ]  ,
            receiver:"miaozhuang.net" ,
            type:"日报"

        }
         $scope.$watch("report.dataType",function(v1,v2){
             console.log(v1);

         },true)
        $scope.$watch("Topics",function(v1,v2){
            console.log(v1);
            console.log(v2)   ;
        },true)


    }];

    return ReportsController;
});