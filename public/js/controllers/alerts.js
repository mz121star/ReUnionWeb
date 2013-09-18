'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AlertsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Alerts - "+ res.title;

    }];

    return AlertsController;
});