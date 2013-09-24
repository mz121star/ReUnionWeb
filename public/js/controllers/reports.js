'use strict';

define([ 'i18n!resources/nls/res'], function (res) {

    var  ReportsController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Reports - "+ res.title;
       // $rootScope.title= res.title;
        $scope.source = {
            brand: "兰蔻"
        };
        $scope.headers = ['Summary', 'Volume', 'Dashboard'];
        $scope.features = ['Time Trend', 'Sentiment','Top feed list'];
        $scope.sections = ['topic1', 'topic2','topic3'];
        var data = [
            {
                name : '北京',
                value:[-9,1,12,20,26,30,32,29,22,12,0,-6],
                color:'#1f7e92',
                line_width:3
            }
        ];
        var data1 = [
            {name : 'Civic',value : 6078,color:'#97b3bc'},
            {name : 'Accord',value : 5845,color:'#FF3333'},
            {name : 'Highinder',value : 5008,color:'#cd5c5c'},
            {name : 'Tundra',value : 2662,color:'#006666'},
            {name : 'Corolla',value : 2445,color:'#CC3333'},
            {name : 'Ridgeline',value : 2389,color:'#9d4a4a'},
            {name : 'Prlus',value : 2147,color:'#eee8aa'}

        ];

        var data3 = [
            {
                name : '一月',
                value:[45,52,54,60],
                color:'#4f81bd'
            },
            {
                name : '二月',
                value:[60,80,105,80],
                color:'#bd4d4a'
            },
            {
                name : '三月',
                value:[50,70,120,100],
                color:'#98c045'
            }
        ];
        new iChart.ColumnStacked2D({
            render : 'canvasDiv3',
            data: data3,
            labels:["亚马逊","京东" ],
            title : {
                text:'收录情况',
                color:'#254d70'
            },


            column_width:90,
            background_color : '#ffffff',
            shadow : true,
            shadow_blur : 2,
            shadow_color : '#aaaaaa',
            shadow_offsetx : 1,
            shadow_offsety : 0,
            sub_option:{
                label:{color:'#f9f9f9',fontsize:12,fontweight:600},
                border : {
                    width : 2,
                    color : '#ffffff'
                }
            },
            label:{color:'#254d70',fontsize:12,fontweight:600},
            percent:true,//标志为百分比堆积图
            showpercent:true,
            decimalsnum:1,
            legend:{
                enable:true,
                background_color : null,
                line_height:25,
                color:'#254d70',
                fontsize:12,
                fontweight:600,
                border : {
                    enable : false
                }
            },
            coordinate:{
                background_color : 0,
                axis : {
                    color : '#c0d0e0',
                    width : 0
                },
                scale:[{
                    position:'left',
                    scale_enable : false,
                    start_scale:0,
                    scale_space:50,
                    label:{color:'#254d70',fontsize:11,fontweight:600}
                }],
                width:600,
                height:260
            }
        })  .draw();



        new iChart.LineBasic2D({
            render : 'canvasDiv4',
            data: data,
            title : '亚马逊收录情况',

            coordinate:{height:'90%',background_color:'#f6f9fa'},
            sub_option:{
                hollow_inside:false,//设置一个点的亮色在外环的效果
                point_size:16
            },
            labels:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
        }) .draw();
    }];

    return ReportsController;
});