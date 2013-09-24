'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AlertsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Alerts - "+ res.title;
        $scope.definefrom = ['Topics', 'Fresh New' ];
        $scope.choosetopics = ['topic1', 'topic2','topic3'];
        $scope.sourcetype = ['News', 'Forum','eCommerce','Weibo','Sohu','baidu'];
        $scope.showsection1 = function() {

            $scope.show1=true;
            $scope.show2=false;
        };
        $scope.showsection2 = function() {

            $scope.show1=false;
            $scope.show2=true;
        };
    }];

    return AlertsController;
});