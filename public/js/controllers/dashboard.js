'use strict';

define([ 'i18n!resources/nls/res','ichart'], function (res,ichart) {

    var  DashboardController=['$scope','$rootScope',function($scope,$rootScope) {
        $rootScope.title = "Dashboard - "+ res.title;
        //定义数据
        //定义数据
        var data = [
            {name : 'H',value : 7,color:'#a5c2d5'},
            {name : 'E',value : 5,color:'#cbab4f'},
            {name : 'L',value : 12,color:'#76a871'},
            {name : 'L',value : 12,color:'#76a871'},

        ];
        $(function(){
            var chart = new iChart.Column2D({
                render : 'canvasDiv',//渲染的Dom目标,canvasDiv为Dom的ID
                data: data,//绑定数据
                title : '',//设置标题
                shadow:true,//激活阴影
                shadow_color:'#c7c7c7',//设置阴影颜色
                coordinate:{//配置自定义坐标轴
                    scale:[{//配置自定义值轴
                        position:'left',//配置左值轴
                        start_scale:0,//设置开始刻度为0
                        end_scale:26,//设置结束刻度为26
                        scale_space:2,//设置刻度间距
                        listeners:{//配置事件
                            parseText:function(t,x,y){//设置解析值轴文本
                                return {text:t+""}
                            }
                        }
                    }]
                }
            });
            //调用绘图方法开始绘图
            chart.draw();
        });


    }];

    return DashboardController;
});