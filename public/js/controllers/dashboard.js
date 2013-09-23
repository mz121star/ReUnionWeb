'use strict';

define([ 'i18n!resources/nls/res','ichart','jqueryui'], function (res,ichart) {

    var  DashboardController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Dashboard - "+ res.title;
        //定义数据
        //定义数据
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
        var data2 = [
            {name : 'Renren',value : 33.1,color:'#b5bcc5'},
            {name : 'Facebook',value : 19.14,color:'#b5bcc5'},
            {name : 'StumbleUpon',value : 13.97,color:'#b5bcc5'},
            {name : 'reddit',value : 7.44,color:'#b5bcc5'},
            {name : 'Hi5',value : 5.22,color:'#b5bcc5'},
            {name : 'LinkedIn',value : 4.85,color:'#b5bcc5'},
            {name : 'Twitter',value : 4.59,color:'#b5bcc5'},
            {name : 'Other',value : 11.68,color:'#b5bcc5'}
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
        $(function(){
            new iChart.Bar2D({
                render : 'canvasDiv1',
                background_color : '#EEEEEE',
                data: data1,
                title : 'Car-Brands',
                   coordinate:{
                    width:640,
                    height:260,
                    scale:[{
                        position:'bottom',
                        start_scale:0,
                        end_scale:6500,
                        scale_space:500
                    }]
                },
                sub_option:{
                    border:{
                        enable : false
                    },
                    label:{color:'#333333'}
                },
                shadow:true,
                shadow_color:'#8d8d8d',
                shadow_blur:1,
                shadow_offsety:1,
                shadow_offsetx:1,
                legend:{enable:false}
            }).draw();



            new iChart.Bar2D({
                render : 'canvasDiv2',
                data: data2,
                title : {
                    text:'StatCounter Global Stats',
                    color:'#b5bcc5'
                },
                subtitle : {
                    text:'Top 7 Social Media Sites in Chain from Oct 2011 to Oct 2012',
                    color:'#afb6c0'
                },
                footnote : 'Data from StatCounter',

                offsetx:20,
                coordinate:{
                    width:620,
                    height:240,
                    grid_color:'#4e5464',
                    axis:{
                        color:'#4e5464',
                        width:[0,0,8,1]
                    },
                    scale:[{
                        position:'bottom',
                        start_scale:0,
                        end_scale:40,
                        scale_space:5,
                        label:{color:'#ffffff'},
                        listeners:{
                            parseText:function(t,x,y){
                                return {text:t+"%"}
                            }
                        }
                    }]
                },
                label:{color:'#dcdcdc'},
                background_color : '#3c4251',
                sub_option:{
                    listeners:{
                        parseText:function(r,t){
                            return t+"%";
                        }
                    }
                },
                legend:{enable:false}
            }).draw();


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


            var data5 = [
                {name : 'IE',value : 35.75,color:'#9d4a4a'},
                {name : 'Chrome',value : 29.84,color:'#5d7f97'},
                {name : 'Firefox',value : 24.88,color:'#97b3bc'},
                {name : 'Safari',value : 6.77,color:'#a5aaaa'},
                {name : 'Opera',value : 2.02,color:'#778088'},
                {name : 'Other',value : 0.73,color:'#6f83a5'}
            ];

            new iChart.Pie2D({
                render : 'canvasDiv5',
                data: data5,
                title : 'top 5',
                 radius:140
            }).draw();
            $( ".s-pk-mod" ).draggable({ revert: "invalid" });
            $( ".s-pk-col" ).droppable({
//                drop: function( event, ui ) {
//                    $( this )
//                        .addClass( "ui-state-highlight" )
//                        .find( "p" )
//                        .html( "Dropped!" );
//                }
            });
        });


    }];

    return DashboardController;
});