module.exports = function(grunt) {
    // 配置
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/js",
                    paths: {
                        jquery: '../lib/jquery/jquery-1.8.2.min',
                        underscore: '../lib/underscore/underscore',
                        angular: '../lib/angular/angular',
                        angularResource: '../lib/angular/angular-resource',
                        text: '../lib/require/text',
                        i18n: '../lib/require/i18n',
                        ichart: '../lib/ichart.1.2.src'  ,
                        bootstrapModal:'../lib/bootstrap/js/modal',
                        bootstrapAlert:'../lib/bootstrap/js/alert',
                        bootstrapButton:'../lib/bootstrap/js/button',
                        bootstrapTab:'../lib/bootstrap/js/tab',
                        linqjs:'../lib/linq',
                        'angular-strap':'../lib/angular-strap/angular-strap',
                        'bootstrap-datepicker':'../lib/angular-strap/bootstrap-datepicker' ,
                        "async":'../lib/async',
                        "moment": "../lib/moment.min"

                    },
                    shim: {
                        'angular': {deps: ['jquery'],'exports': 'angular'},
                        'angular-resource': {deps: ['angular']},
                        'bootstrap-datepicker':  {deps: ['jquery']},
                        'angular-strap':   {deps: ['angular','bootstrap-datepicker']},
                        'underscore': {exports: '_'},
                        'bootstrapModal': {deps: ['jquery']},
                        'bootstrapAlert': {deps: ['jquery']},
                        'bootstrapButton': {deps: ['jquery']},
                        'bootstrapTab': {deps: ['jquery']}

                    },

                    optimize:"none",
                    name: "main",
                    out: "public/js/main-built.js"

                    //out: "../public/js/main-built.js"
                }
            }
        },
        cssmin: {

            combine: {

                files: {
                    'public/css/reunion.css': ['public/lib/bootstrap/css/bootstrap.css','public/lib/bootstrap/css/bootstrap-responsive.css','public/lib/angular-strap/bootstrap-datepicker.css','public/css/default.css']
                }
            }
        },
        concat : {
            domop : {
                src: 'public/js/*.js',
                dest: 'dest/reunion.js'
            }
        },
        uglify : {
            options : {
                banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build : {
                src : 'dest/reunion.js',
                dest : 'dest/reunion.min.js'
            }
        },
        nodeunit: {
            all: ['test/nodetest/*Test.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.registerTask('default', ['requirejs','cssmin','concat', 'uglify']);
    grunt.registerTask("test",['nodeunit']);
};