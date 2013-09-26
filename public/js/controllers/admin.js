'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  AdminController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Administrator - "+ res.title;
    /*    $("select, input").uniform();*/
    }];

    return AdminController;
});