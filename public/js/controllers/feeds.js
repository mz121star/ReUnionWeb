'use strict';

define([ 'i18n!resources/nls/res','bootstrapModal' ], function (res) {

    var FeedsController = ['$scope', '$rootScope', '$http','kimissService' ,function ($scope, $rootScope, $http,kimissService) {
        $rootScope.title = "Feeds - " + res.title;
        $scope.source = {
            brand: "兰蔻品牌"
        };
        $scope.sourceType = ['News', 'Forum', 'eCommerce', 'Weibo', 'sohu'];
        $scope.professionalSites = ['CSDN', 'IDC'];
        $scope.sourceTypeChange=function(e){
            console.log(e);
        }  ;
        $scope.selectkimiss = function(row){
            $scope.selectedRow = row;
        };
        $scope.searchFeed=function(){
            alert("hello");
        }
//        $http.get('/kimiss').success(function (data) {
//            $scope.kimiss = data;
//        });
        kimissService.query().then(function(d){
            $scope.kimiss =d
         });
        $scope.feeds = {
            startTime:'',
            endTime:''
        };
        $scope.showDetail=function(title,source,url){
            $scope.modal.title=title;
            $scope.modal.source=source;
            $scope.modal.url=url;
        }
        $scope.modal={
            title:"Title" ,
            source:"",
            url:""
        }
        $http.get("MockData/feeds.json").success(function(d){
            $scope.feedContent=d;
        })

        $scope.$watch('feeds.startTime+feeds.endTime',function(v1,v2){

           if( $scope.feeds.startTime>= $scope.feeds.endTime){
               $scope. warning ="开始不能大于结束" ;
               $scope.searchFeedForm.$invalid=true;
           }
           else{
               $scope. warning =""
               $scope.searchFeedForm.$invalid=false;
           }

       })
    }];

    return FeedsController;
});