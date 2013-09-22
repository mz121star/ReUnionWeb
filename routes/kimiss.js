var KimissModel = require("./../models").kimiss;
exports.list = function (req, res) {

    KimissModel
        .find({namespace: /forResult/})
        .limit(20)
        .select('childs')
        .exec(function (err, kimiss) {
            return res.json(kimiss);
        });
};