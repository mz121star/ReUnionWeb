define(['app'], function (app) {
    app.filter('highlightWords', function () {
        return function (input, text) {
            var r = new RegExp(text,'gmi') ;
            if (r.exec(input)){
                return input + "（匹配成功）";
            }
            else
                return input;
        };
    });
});