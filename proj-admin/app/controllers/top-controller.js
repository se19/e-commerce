const Order = require('../models/order');
const constants = require('../../constants/index');

const list_top_products = (req, res, next) => {
    Order.aggregate([{
            $match: {
                status: {
                    $eq: constants.ORDER_STATUS_COMPLETED
                }
            }
        }, {
            $unwind: '$products'
        }, {
            $group: {
                _id: '$products.productId',
                product: {
                    $first: '$products'
                },
                summary: {
                    $sum: '$products.quantity'
                }
            }
        }, {
            $limit: 10
        }, {
            $sort: {
                summary: -1
            }
        }]).then(topProducts => {
            let total = 0;
            topProducts.forEach(item => {
                if (item.summary) {
                    total += item.summary;
                }
            });
            res.render('top-view/top-products', {
                pageTitle: "Hàng hóa bán chạy",
                topProducts,
                total
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

const list_top_brands = (req, res, next) => {
    Order.aggregate([{
                $match: {
                    status: {
                        $eq: constants.ORDER_STATUS_COMPLETED
                    }
                }
            },
            {
                $unwind: '$products'
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'products.productId',
                    foreignField: '_id',
                    as: 'products.product'
                }
            },
            {
                $unwind: '$products.product'
            },
            {
                $lookup: {
                    from: 'brands',
                    localField: 'products.product.brandId',
                    foreignField: '_id',
                    as: 'products.product.brand'
                }
            },
            {
                $group: {
                    _id: '$products.product.brandId',
                    brand: {
                        $first: '$products.product.brand'
                    },
                    summary: {
                        $sum: '$products.quantity'
                    }
                }
            },
            {
                $unwind: '$brand'
            },
            {
                $limit: 10
            },
            {
                $sort: {
                    summary: -1
                }
            }
        ]).then(topBrands => {
            let total = 0;
            topBrands.forEach(item => {
                if (item.summary) {
                    total += item.summary;
                }
            });
            res.render('top-view/top-brands', {
                pageTitle: "Nhãn hàng bán chạy",
                topBrands,
                total
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

module.exports = {
    list_top_products,
    list_top_brands
}