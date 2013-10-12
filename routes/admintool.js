var tool=require("./../libs/adminTool");
exports.admintool = function (req, res) {
      var cmd= req.body.cmd;
    tool.shell(cmd,function(d){
        res.send(d)
    })
}