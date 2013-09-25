define(['app'], function (app) {
    app.directive('compare', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    console.log("viewValue:%s", viewValue);
                    console.log("attrs.compare:%s", attrs.compare);
                    if (viewValue == "" || attrs.compare == "" || viewValue == attrs.compare) {
                        ctrl.$setValidity('compare', true);
                    } else {
                        ctrl.$setValidity('compare', false);
                    }
                    return viewValue;
                });
            }
        };
    });
    app.directive('ngScroll', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).mCustomScrollbar({
                    scrollButtons: {
                        enable: true
                    }
                });
            }
        };
    });
    app.directive('modalbox', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).on("click", function () {
                    alert('ok')
                })
            }
        };
    });
    app.directive('sortable', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).css('cursor','pointer')

                $(elm).on("click", function () {
                    alert('准备排序')
                    console.log(attrs);
                    console.log(scope)              ;
                })
            }
        };
    });
    app.directive('showdetail', function () {
        return {
            link: function (scope, elm, attrs, ctrl) {
                $(elm).css('cursor','pointer')


                /* $(elm).on("click", function () {
                     alert('popup')
                     console.log(elm);
                     console.log(scope)              ;
                 })*/
            }
        };
    });

});
