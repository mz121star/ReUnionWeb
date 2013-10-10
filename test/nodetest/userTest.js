
/*exports.datetest = function(test){

    var model=new Usermodel({name:"admin",password:"admin",sex:21,email:"zhuang.miao@pactera.com"});
    model.save(function (err, user) {
        test.equal('admin', user.name);
        test.done();
    });

};*/

module.exports = {
    setUp: function (callback) {
        var Usermodel=require("../../models/index").Users;
        var model=new Usermodel({name:"admin",password:"admin",sex:21,email:"zhuang.miao@pactera.com"});
        model.save(function (err, user) {
            console.log(user);
            this.user=user.name;
            callback();
        });

    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    test1: function (test) {
        test.equals(this.user, 'admin');
        test.done();
    }
};