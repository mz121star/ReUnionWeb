'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  ReportsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Reports - "+ res.title;
       // $rootScope.title= res.title;
    }];

    return ReportsController;
});