'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AlertsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Alerts - "+ res.title;
        $scope.definefrom = ['Topics', 'Fresh New' ];
        $scope.choosetopics = ['topic1', 'topic2','topic3'];
        $scope.sourcetype = ['News', 'Forum','eCommerce','Weibo','Sohu','baidu'];

    }];

    return AlertsController;
});