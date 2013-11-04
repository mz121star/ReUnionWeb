/*
 * GET home page.
 */


var path = require('path');
exports.index = function (req, res) {

    var s =req.session["user"] ;
    if(!s){
        res.redirect('login');
        return;
    }
    var html = path.normalize(__dirname + '/../views/index2.html');
    res.sendfile(html);

};

exports.login = function (req, res) {
    var html = path.normalize(__dirname + '/../views/login.html');
    res.sendfile(html);
}
exports.getLoginUser = function (req, res) {
    res.json(req.session["user"] || {});
};
