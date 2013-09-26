require.config({

    paths: {
        jquery: '../lib/jquery/jquery-1.8.2.min',
        bootstrap: '../lib/bootstrap/js/bootstrap',
        underscore: '../lib/underscore/underscore',
        angular: '../lib/angular/angular',
        angularResource: '../lib/angular/angular-resource',
        text: '../lib/require/text',
        i18n: '../lib/require/i18n',
        modernizr: '../lib/modernizr',
        html5shiv: '../lib/html5shiv',
        mcore: '../lib/mcore.min',
        fullscreen: '../lib/fullscreen',
        mcustomscrollbar: '../lib/jquery.mCustomScrollbar.concat.min',
        detectbrowser: '../lib/detectbrowser',
        //res:'../resources/nls/res'
        ichart: '../lib/ichart.1.2.src' ,
        icheck:'../lib/icheck/jquery.icheck',
        jqueryui:'../lib/jquery-ui-1.10.3.custom' ,
        bootstrapModal:'../lib/bootstrap/js/modal',
        linqjs:'../lib/linq'
    },
    shim: {
        'angular': {'exports': 'angular'},
        'angular-resource': {deps: ['angular']},
        'bootstrap': {deps: ['jquery']},
        'mcustomscrollbar': {deps: ['jquery']},
        'jqueryui':{deps: ['jquery']},
        'facebox':{deps: ['jquery']},
        'underscore': {exports: '_'},
        'detectbrowser': {deps: ['modernizr']},
        'icheck' : {deps: ['jquery']}
        /*,
         'res':{exports:'res'}*/

    },
    priority: [
        "angular"
    ],
    i18n: {
        locale: 'en-us'
    },
    urlArgs: 'v=1.0.0.1'
});

require(['angular',
    'app',
    'jquery',
    'fullscreen',
    'mcore',
    'controllers/layout',
    'controllers/index',
    'directives/compare',
    'filter/filters' ,
    'services/services',
    'routes',
    'detectbrowser'
], function (angular) {
    angular.bootstrap(document, ['app']);
});
