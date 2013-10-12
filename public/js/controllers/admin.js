'use strict';

define([ 'i18n!resources/nls/res','bootstrapTab'], function (res) {

    var  AdminController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Monitor - "+ res.title;
    /*    $("select, input").uniform();*/
    }];

    return AdminController;
});