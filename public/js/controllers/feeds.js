'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  FeedsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Feeds - "+ res.title;

    }];

    return FeedsController;
});