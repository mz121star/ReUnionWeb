'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var FeedsController = ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.title = "Feeds - " + res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };
        $scope.sourceType=['News','Forum','eCommerce','Weibo','sohu'];


        $http.get('/kimiss').success(function (data) {
            $scope.kimiss = data;
        });

    }];

    return FeedsController;
});