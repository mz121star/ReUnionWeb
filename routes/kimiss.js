var KimissModel = require("./../models").kimiss;
exports.list = function (req, res) {

    KimissModel
        .find({namespace: /forResult/})
        .limit(20)
        .select('childs')
        .exec(function (err, kimiss) {
            if(err){
                return res.json(500,err);
            }
            return res.json(kimiss);
        });
};