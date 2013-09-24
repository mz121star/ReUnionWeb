define(['app'], function (app) {
    app.factory('kimissService', ['$http', '$q', function ($http, $q) {
        var items = {};
        items.query = function () {
            var delay = $q.defer();
            $http.get('/kimiss').success(function (data) {
                delay.resolve(data);
            });
            return delay.promise;
        };

        return items;

    }]);
});