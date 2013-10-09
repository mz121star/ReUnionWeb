'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var ReportsController = ['$scope', '$rootScope', function ($scope, $rootScope) {
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
        ]

    }];

    return ReportsController;
});