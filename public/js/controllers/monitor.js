'use strict';

define([ 'i18n!resources/nls/res', 'bootstrapTab'], function (res) {

    var MonitorController = ['$scope', '$rootScope', 'FeedService', '$http', '$timeout', function ($scope, $rootScope, FeedService, $http, $timeout) {
        $rootScope.menuUrl = "partials/leftmenu/monitorMenu.html";
        $rootScope.title = "Monitor - " + res.title;
        $rootScope.show=true;
        /*    $("select, input").uniform();*/
        $scope.SiteType = {
            dataType: [
                {value: "Micro Bloging"} ,
                {value: "News Media"},
                {value: "Forum"},
                {value: "eCommerce"}

            ],

            type: "Micro Bloging"

        };

        function LoadData(){
            $http.get('api/monitor/' + encodeURI("Micro Bloging")).success(function(d){
                $scope.monitorWeibo=d
            })
            $http.get('api/monitor/' + encodeURI("Forum")).success(function(d){
                $scope.monitorForums=d
            })
            $http.get('api/monitor/' + encodeURI("News Media")).success(function(d){
                $scope.monitorSearchs=d
            })
            $http.get('api/monitor/' + encodeURI("eCommerce")).success(function(d){
                $scope.monitorShops=d
            })
        }

        LoadData();
        FeedService.querySourceType().then(function (d) {
            // $scope.sourcetype = Enumerable.From(d).Distinct("$.FromType").Select("$.FromType").ToJSON();
            $scope.sourcetype = Enumerable.From(d).Select("{type:$,checked:false}").ToArray();
        });
        $scope.saveMonitor = function () {
            var Data = {Name: $scope.website.name, Url: $scope.website.url, Type: $scope.SiteType.type};

            $http.post("api/monitor", Data).success(function (d) {
                LoadData();
                $scope.saveWarning = "Save website successfully";
                $timeout(function () {
                    $scope.saveWarning = "";
                }, 1000)
            })
        }
    }];

    return MonitorController;
});