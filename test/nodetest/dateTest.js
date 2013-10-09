var util=require("../../libs/util");
exports.datetest = function(test){
     var a=util.dateRange("2012-03-19","2012-04-20");

    test.ok(true, a);
    test.done();
};