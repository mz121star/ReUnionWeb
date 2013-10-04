define(['app'], function (app) {
    app.filter('highlightWords', function () {
        return function (input, text) {
            var r = new RegExp(text, 'gmi');
            if (r.exec(input)) {
                return input ;
            }
            else
                return "";
        };
    });
    app.filter('kimissList', function () {
        return function (input, text) {
            var childs = input[0].childs;
            for (var i = 0, l = childs.length; i < l; i++) {
                if (childs[i].name === text) {
                    return childs[i].content.trim();
                }
            }

        };
    });
    app.filter('maxlen', function () {
        return function (input, text) {
            var len=text;
            return input.substring(0,len);

        };
    });
    /***
     * AngularJS For Loop with Numbers & Ranges
     */
    app.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    });

});