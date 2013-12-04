var FeedsShopModel = require("./../models").FeedsShop;

/***
 * Get /product
 * @param req
 * @param res
 */
exports.list = function (req, res) {


    var category = req.body.category, brand = req.body.brand;
    var queryCondition = {};

    if (category) {
        queryCondition.category = category;
    }
    if (brand) {
        queryCondition.Brand = brand;
    }

    /*    if (req.body.starttime && req.body.endtime) {
     queryCondition.PublishTime = {$gte: new Date(req.body.starttime), $lte: new Date(req.body.endtime) };
     }*/
    var pageindex = req.body.pageindex ? req.body.pageindex * 20 - 20 : 0;
    var queryFeeds = FeedsShopModel.find(queryCondition);

    queryFeeds.count(function (err, count) {
        if (err) {
            return res.json(500, err);
        }
        var query = FeedsShopModel.find(queryCondition)


        query.sort({CrawlerTime: 'desc'})
            .skip(pageindex)
            .limit(50)
            /*.select('childs')*/
            .exec(function (err, products) {
                if (err) {
                    return res.json(500, err);
                }


                return res.json({
                    "products": products,
                    "count": count / 50 > 1 ? count / 50 : 1

                });


            });
    })




};


/***
 * Get /product/:id
 * @param req
 * @param res
 */
exports.getProductCategory  =function (req, res) {



        /*.limit(20)*/
    FeedsShopModel.find().select("category").distinct('category',function (err, data) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(data);
        });

};
exports.getProductBrand  =function (req, res) {



    /*.limit(20)*/
    FeedsShopModel.find().select("Brand").distinct('Brand',function (err, data) {
        if (err) {
            return res.json(500, err);
        }
        return res.json(data);
    });

};
exports.getById = function (req, res) {

    var reg = /^\/api\/product\/(?:([^\/]+?))\/?$/;
    var type = req.url.match(reg)[1];
    if (type) type = decodeURI(type);
    FeedsShopModel.find({_id: type})
        /*.limit(20)*/
        /*.select('childs')*/
        .exec(function (err, data) {
            if (err) {
                return res.json(500, err);
            }
            return res.json(data);
        });

};