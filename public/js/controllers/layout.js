'use strict';
//TODO Define module
define(['../app', 'i18n!resources/nls/res', '../../background/images'], function (app, res, images) {
    /* var bgimages=require("../../background/images").imageurls;*/

    return app.controller('LayoutController', function ($scope, $http, $location) {
        /*      var i = 0,
         imgs = images.imageurls,
         randombg = function () {
         return Math.round(Math.random() * (imgs.length - 1));
         };

         m$.Image.preLoadImages(imgs.slice(0, 4));*/
        $http.get('/checklogin').success(function (user) {
            $scope.resetLogin(user);
        });
        $scope.txt = {
            home: res.welcome,
            dashboard: "Dashboard",
            feeds: "Feeds",
            analysis: "Analysis",
            reports: "Reports",
            alerts: "Alerts",
            admin: "Administration",
            help: "Help"
        };
        $scope.navBars = [
            {name:  $scope.txt.dashboard, url: "#/dashboard"},
            {name:  $scope.txt.feeds, url: "#/feeds"},
            {name:  $scope.txt.analysis, url: "#/analysis"},
            {name: $scope. txt.reports, url: "#/reports"},
            {name:  $scope.txt.alerts, url: "#/alerts"},
            {name:  $scope.txt.admin, url: "#/admin"},
            {name: $scope. txt.help, url: "#/help"}
        ] ;
        $scope.selectNav = function(row){
            $scope.selectedRow = row;
        };
        $scope.navHash = function () {

            console.log($location)
            return $location
        };

        /* $scope.resources = {
         theme: " <link href='themes/glow/default.css' rel='stylesheet' type='text/css'>",
         bg: imgs[randombg()] //Random generate background image
         };*/
        $scope.setActive = function (e) {
            // console.log($location.$$path)
            var parent = e.target.parentElement.parentElement;
            if (parent) {
                var cancelActives = parent.getElementsByClassName("active");
                for (var i = 0, l = cancelActives.length; i < l; i++) {
                    cancelActives[i].setAttribute("class", "");
                }

                e.target.parentElement.setAttribute("class", "active");
            }
            //console.log($location.$$path)
        };
        $scope.resetLogin = function (user) {
            if (user.name) {
                $scope.login = {
                    url: 'logout',
                    name: res.logout
                };

                $scope.signup = {
                    url: '',
                    name: 'welcome:' + user.name
                };
            } else {
                $scope.login = {
                    url: 'login',
                    name: res.login
                };
                $scope.signup = {
                    url: 'signup',
                    name: res.signup
                };
            }
        };

        /*        $scope.nextimg = function () {
         i = i === imgs.length ? 0 : i;
         $("#bg").attr("src", imgs[i++]);
         */
        /* var a =$(".page section:nth-child(1)").css("margin-top","-800px")*/
        /*
         };
         $scope.preimg = function () {
         i = i < 0 ? imgs.length - 1 : i;
         $("#bg").attr("src", imgs[i--]);
         */
        /*   var a =$(".page section:nth-child(1)").css("margin-top","10px")*/
        /*
         */
        /*  $("body").attr("style","background:url('themes/glowsimple/img/dots.png') center center fixed, url('"+imgs[i--]+"') center center no-repeat fixed;");*/
        /*
         };*/
        $scope.fullscreen = function () {
            if (window.fullScreenApi.supportsFullScreen) {
                setInterval(function () {
                    if (!document.webkitIsFullScreen) {
                        clearInterval();
                        return;
                    }
                    var img = imgs[i++];
                    $("#bg").attr("src", img);
                    console.log("fullscreen picture" + img);
                }, 2000);
                window.fullScreenApi.requestFullScreen(document.getElementById('njblogbg'));
            } else {
                alert('就你这浏览器，基本就告别全屏功能了,赶紧卸载了吧！！！');
            }
        };
    });
});
/*
 define([ 'i18n!resources/nls/res'], function (res) {
 var LayoutController=['$scope','$http','$window', function ($scope, $http, $window) {
 $http.get('/checklogin').success(function (user) {
 $scope.resetLogin(user);
 });
 $scope.txt={
 home:res.welcome
 }
 $scope.resetLogin = function (user) {
 if (user.name) {
 $scope.login = {
 url:'logout',
 name:res.logout
 };

 $scope.signup = {
 url:'',
 name:'welcome:' + user.name
 };
 } else {
 $scope.login = {
 url:'login',
 name:res.login
 };
 $scope.signup = {
 url:'signup',
 name:'SignUp'
 };
 }
 };
 } ];
 return LayoutController;
 });*/
