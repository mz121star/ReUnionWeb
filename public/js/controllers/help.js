'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  HelpController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Help - "+ res.title;

    }];

    return HelpController;
});