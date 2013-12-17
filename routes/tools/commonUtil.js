var events = require('events');
var TopicModel = require("./../../models").Topic;
module.exports = {
    /*********************************************************************************************** **********************
     * 获取当前用户设定的关键字
     ********************************************************************************************************************/
    getKeyWords: function (req) {
        var emitter = new events.EventEmitter();
      /*  var cache=         req.session["reunionCache"].CurrentUserKeyWords;
        if (req.session["reunionCache_CurrentUserKeyWords"]) {
            emitter.emit("success", req.session["reunionCache_CurrentUserKeyWords"]);
        }
        else {*/
            var id = req.session["user"]._id;
            var _keywords = [];
            TopicModel.find({OwnerId: id})
                /*.limit(20)*/
                /* .select('Keyword')*/
                .exec(function (err, subs) {
                    for (var i = 0, len = subs.length; i < len; i++) {
                        if (subs[i].Keyword !== " ")
                            _keywords.push(subs[i].Keyword.trim());
                    }

                    _keywords = _keywords.join("|");
                    var keywordsReg = new RegExp(_keywords, "gmi");
                   // req.session["reunionCache_CurrentUserKeyWords"]= keywordsReg;
                    emitter.emit("success", keywordsReg);
                });
        /*}*/
        return   emitter;
    }
}