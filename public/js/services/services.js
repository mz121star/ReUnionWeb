define(['app'], function (app) {
    app.factory('FeedService', ['$http', '$q', function ($http, $q) {
        var items = {};
        items.query = function () {
            var delay = $q.defer();
            $http.get('/feeds').success(function (data) {
                delay.resolve(data);
            });
            return delay.promise;
        };

        return items;

    }]);
});