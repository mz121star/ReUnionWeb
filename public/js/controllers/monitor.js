'use strict';

define([ 'i18n!resources/nls/res', 'bootstrapTab'], function (res) {

    var MonitorController = ['$scope', '$rootScope', 'FeedService', '$http', '$timeout', function ($scope, $rootScope, FeedService, $http, $timeout) {
        $rootScope.menuUrl = "partials/leftmenu/monitorMenu.html";
        $rootScope.title = "Monitor - " + res.title;
        $rootScope.show=true;
        /*    $("select, input").uniform();*/
        $scope.SiteType = {
            dataType: [
                {value: "微博"} ,
                {value: "搜索引擎"},
                {value: "论坛"},
                {value: "商城"}

            ],

            type: "微博"

        };

        function LoadData(){
            $http.get('api/monitor/' + encodeURI("微博")).success(function(d){
                $scope.monitorWeibo=d
            })
            $http.get('api/monitor/' + encodeURI("论坛")).success(function(d){
                $scope.monitorForums=d
            })
            $http.get('api/monitor/' + encodeURI("搜索引擎")).success(function(d){
                $scope.monitorSearchs=d
            })
            $http.get('api/monitor/' + encodeURI("商城")).success(function(d){
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