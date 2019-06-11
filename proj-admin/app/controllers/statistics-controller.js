const Order = require('../models/order');
const constants = require('../../constants/index');

const list_statistics = (req, res, next) => {
    const period = req.query.period ? req.query.period : 'day';
    const year = req.query.year ? +req.query.year : new Date().getFullYear();
    const month = req.query.month ? +req.query.month : new Date().getMonth() + 1;

    let pipeline = [{
        $match: {
            status: {
                $eq: constants.ORDER_STATUS_COMPLETED
            }
        }
    }, {
        $unwind: '$products'
    }, {
        $project: {
            dateCreated: '$dateCreated',
            quantity: '$products.quantity'
        }
    }, {
        $project: {
            year: {
                $year: '$dateCreated'
            },
            month: {
                $month: '$dateCreated'
            },
            day: {
                $dayOfMonth: '$dateCreated'
            },
            week: {
                $week: '$dateCreated'
            },
            quarter: {
                $cond: [{
                        $lte: [{
                            $month: "$dateCreated"
                        }, 3]
                    },
                    1,
                    {
                        $cond: [{
                                $lte: [{
                                    $month: "$dateCreated"
                                }, 6]
                            },
                            2,
                            {
                                $cond: [{
                                        $lte: [{
                                            $month: "$dateCreated"
                                        }, 9]
                                    },
                                    3,
                                    4
                                ]
                            }
                        ]
                    }
                ]
            },
            quantity: '$quantity'
        }
    }, {
        $match: {
            year: {
                $eq: year
            }
        }
    }, {
        $group: {
            _id: {
                year: '$year'
            },
            summary: {
                $sum: '$quantity'
            }
        }
    }, {
        $sort: {
            _id: -1
        }
    }];

    switch (period) {
        case 'day':
            pipeline[4].$match.month = {
                $eq: month
            };
            pipeline[5].$group._id.month = '$month';
            pipeline[5].$group._id.day = '$day';
            break;
        case 'week':
            pipeline[5].$group._id.week = '$week';
            break;
        case 'month':
            pipeline[5].$group._id.month = '$month';
            break;
        case 'quarter':
            pipeline[5].$group._id.quarter = '$quarter';
            break;
        case 'year':
            pipeline.splice(4, 1);
            break;
    }

    Order.aggregate(pipeline).then(items => {

            res.render('statistics-view/statistics', {
                pageTitle: "Thống kê doanh số",
                items,
                period,
                currYear: year,
                currMonth: month
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });

}

module.exports = {
    list_statistics
}