define(['app',
    'controllers/index',
    'controllers/login',
    'controllers/logout',
    'controllers/signup',
    'controllers/admin',
    'controllers/alerts',
    'controllers/analysis',
    'controllers/dashboard',
    'controllers/feeds',
    'controllers/help',
    'controllers/reports'
],
    function (app, index, login, logout, singnup, admin, alerts, analysis, dashboard, feeds, help, reports) {
        return app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider.
                when('/', {templateUrl: 'partials/index.html', controller: index}).
                when('/login', {templateUrl: 'partials/login.html', controller: login}).
                when('/logout', {templateUrl: 'partials/logout.html', controller: logout}).
                when('/signup', {templateUrl: 'partials/signup.html', controller: singnup}).

                when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: dashboard}).
                when('/feeds', {templateUrl: 'partials/feeds.html', controller: feeds}).
                when('/analysis', {templateUrl: 'partials/analysis.html', controller: analysis}).
                when('/reports', {templateUrl: 'partials/reports.html', controller: reports}).
                when('/alerts', {templateUrl: 'partials/alerts.html', controller: alerts}).
                when('/admin', {templateUrl: 'partials/admin.html', controller: admin}).
                when('/help', {templateUrl: 'partials/help.html', controller: help}).


                otherwise({redirectTo: '/'});
            /*  $locationProvider.html5Mode(true);*/
        }]);
    });