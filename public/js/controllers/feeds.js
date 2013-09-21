'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var FeedsController = ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
        $rootScope.title = "Feeds - " + res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };

        $http.get('MockData/phones.json').success(function (data) {
            $scope.phones = data;
        });

    }];

    return FeedsController;
});