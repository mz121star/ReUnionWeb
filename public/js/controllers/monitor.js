'use strict';

define([ 'i18n!resources/nls/res','bootstrapTab'], function (res) {

    var MonitorController=['$scope','$rootScope','FeedService',function($scope,$rootScope,FeedService) {
        $rootScope.menuUrl="partials/leftmenu/monitorMenu.html";
        $rootScope.title = "Monitor - "+ res.title;
    /*    $("select, input").uniform();*/

        FeedService.querySourceType().then(function (d) {
            // $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("$.FromType").ToJSON();
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });
    }];

    return MonitorController;
});