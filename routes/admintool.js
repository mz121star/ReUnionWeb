var tool=require("./../libs/adminTool");
var path = require('path');
exports.admintool = function (req, res) {
      var cmd= req.body.cmd;
    tool.shell(cmd,function(d){
        res.send(d)
    })
}
exports.admin = function (req, res) {
    var s =req.session["user"] ;
    if(s.name!=="super"){
        res.redirect('login');
        return;
    }
    var html = path.normalize(__dirname + '/../views/admin.html');
    res.sendfile(html);
}