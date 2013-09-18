'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var AnalysisController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title ="Analysis - "+ res.title;

    }];

    return AnalysisController;
});