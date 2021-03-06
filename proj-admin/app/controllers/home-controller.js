const constants = require('../../constants/index');
const Brand = require('../models/brand');
const User = require('../models/user');
const Order = require('../models/order');
const Category = require('../models/category');

//Khởi tạo
const intialization = async (req, res, next) => {
    Date.prototype.getWeek = function () {
        var date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 -
            3 + (week1.getDay() + 6) % 7) / 7);
    };
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const currWeek = new Date().getWeek();

    let totalBrands = 0;
    let totalCustomers = 0;
    let totalOrders = 0;
    let totalCompletedOrders = 0;
    let totalShippingOrders = 0;
    let totalPendingOrders = 0;

    //count brands
    totalBrands = await Brand.countDocuments();
    //count users
    totalCustomers = await User.countDocuments({
        userType: 'customer'
    });
    //count orders
    totalOrders = await Order.countDocuments();
    totalCompletedOrders = await Order.countDocuments({
        status: constants.ORDER_STATUS_COMPLETED
    });
    totalShippingOrders = await Order.countDocuments({
        status: constants.ORDER_STATUS_SHIPPING
    });
    totalPendingOrders = await Order.countDocuments({
        status: constants.ORDER_STATUS_PENDING
    });

    //get top 3 populated categories
    const topPopulatedCategories = await Category.aggregate([{
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'products'
            }
        },
        {
            $addFields: {
                productsSize: {
                    $size: {
                        $ifNull: ["$products", []]
                    }
                }
            }
        },
        {
            $sort: {
                "productsSize": -1
            }
        }, {
            $limit: 3
        }
    ]);

    //get top 5 product
    const topProducts = await Order.aggregate([{
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
        $limit: 5
    }, {
        $sort: {
            summary: -1
        }
    }]);

    //get 6 new users
    const topNewUsers = await User.find({
        userType: constants.USERTYPE_CUSTOMER
    }).sort({
        dateCreated: -1
    }).limit(6);

    //get top 5 brands 
    const topBrands = await Order.aggregate([{
            $match: {
                status: {
                    $eq: constants.ORDER_STATUS_COMPLETED
                }
            }
        }, {
            $unwind: '$products'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'products.productId',
                foreignField: '_id',
                as: 'products.product'
            }
        }, {
            $unwind: '$products.product'
        },
        {
            $lookup: {
                from: 'brands',
                localField: 'products.product.brandId',
                foreignField: '_id',
                as: 'products.product.brand'
            }
        }, {
            $group: {
                _id: '$products.product.brandId',
                brand: {
                    $first: '$products.product.brand'
                },
                summary: {
                    $sum: '$products.quantity'
                }
            }
        }, {
            $unwind: '$brand'
        }, {
            $limit: 5
        }, {
            $sort: {
                summary: -1
            }
        }
    ])

    //GET statistics
    const statisticsPipeline = [ {
        $project: {
            year: {
                $year: '$dateCreated'
            },
            month: {
                $month: '$dateCreated'
            },
            week: {
                $week: '$dateCreated'
            },
            day: {
                $dayOfMonth: '$dateCreated'
            },
            dayOfWeek: {
                $dayOfWeek: '$dateCreated'
            }
        }
    }, {
        $match: {
            year: {
                $eq: currYear
            }
        }
    }, {
        $group: {
            _id: {
                year: '$year'
            },
            summary: {
                $sum: 1
            }
        }
    }]

    //new customers
    let newCustomersPipeline = JSON.parse(JSON.stringify([{
        $match: {
            userType: constants.USERTYPE_CUSTOMER
        }
    }, ...statisticsPipeline]));

    let newCustomersByYearPipeline = JSON.parse(JSON.stringify([...newCustomersPipeline]));
    newCustomersByYearPipeline[3].$group._id.month = '$month';
    const newCustomersByYear = await User.aggregate(newCustomersByYearPipeline);

    let newCustomersByMonthPipeline = JSON.parse(JSON.stringify([...newCustomersPipeline]));
    newCustomersByMonthPipeline[2].$match.month = { $eq: currMonth };
    newCustomersByMonthPipeline[3].$group._id.month = '$month';
    newCustomersByMonthPipeline[3].$group._id.day = '$day';
    const newCustomersByMonth = await User.aggregate(newCustomersByMonthPipeline);

    let newCustomersByWeekPipeline = JSON.parse(JSON.stringify([...newCustomersPipeline]));
    newCustomersByWeekPipeline[2].$match.week = { $eq: currWeek };
    newCustomersByWeekPipeline[3].$group._id.week = '$week';
    newCustomersByWeekPipeline[3].$group._id.dayOfWeek = '$dayOfWeek';
    const newCustomersByWeek = await User.aggregate(newCustomersByWeekPipeline);

    //orders

    let ordersByYearPipeline = JSON.parse(JSON.stringify([...statisticsPipeline]));
    ordersByYearPipeline[2].$group._id.month = '$month';
    const ordersByYear = await Order.aggregate(ordersByYearPipeline);

    let ordersByMonthPipeline = JSON.parse(JSON.stringify([...statisticsPipeline]));
    ordersByMonthPipeline[1].$match.month = { $eq: currMonth };
    ordersByMonthPipeline[2].$group._id.month = '$month';
    ordersByMonthPipeline[2].$group._id.day = '$day';
    const ordersByMonth = await Order.aggregate(ordersByMonthPipeline);

    let ordersByWeekPipeline = JSON.parse(JSON.stringify([...statisticsPipeline]));
    ordersByWeekPipeline[1].$match.week = { $eq: currWeek };
    ordersByWeekPipeline[2].$group._id.week = '$week';
    ordersByWeekPipeline[2].$group._id.dayOfWeek = '$dayOfWeek';
    const ordersByWeek = await Order.aggregate(ordersByWeekPipeline);

    //sales
    
    let salesPipeline = JSON.parse(JSON.stringify([{
        $match: {
            status: {
                $eq: constants.ORDER_STATUS_COMPLETED
            }
        }
    },{
        $unwind: '$products'
    }, ...statisticsPipeline]));
    salesPipeline[2].$project.quantity = '$products.quantity';
    salesPipeline[4].$group.summary = { $sum: '$quantity' };

    let salesByYearPipeline = JSON.parse(JSON.stringify([...salesPipeline]));
    salesByYearPipeline[4].$group._id.month = '$month';
    const salesByYear = await Order.aggregate(salesByYearPipeline);

    let salesByMonthPipeline = JSON.parse(JSON.stringify([...salesPipeline]));
    salesByMonthPipeline[3].$match.month = { $eq: currMonth };
    salesByMonthPipeline[4].$group._id.month = '$month';
    salesByMonthPipeline[4].$group._id.day = '$day';
    const salesByMonth = await Order.aggregate(salesByMonthPipeline);

    let salesByWeekPipeline = JSON.parse(JSON.stringify([...salesPipeline]));
    salesByWeekPipeline[3].$match.week = { $eq: currWeek };
    salesByWeekPipeline[4].$group._id.week = '$week';
    salesByWeekPipeline[4].$group._id.dayOfWeek = '$dayOfWeek';
    const salesByWeek = await Order.aggregate(salesByWeekPipeline);



    res.render('home-view/home', {
        title: 'Bảng điều khiển',
        data: {
            totalBrands,
            totalCustomers,
            totalOrders,
            totalCompleted: totalCompletedOrders,
            totalShipping: totalShippingOrders,
            totalPending: totalPendingOrders,
            topPopulatedCategories,
            topProducts,
            topNewUsers,
            topBrands,
            statistics: {
                newCustomersByWeek,
                newCustomersByMonth,
                newCustomersByYear,
                ordersByWeek,
                ordersByMonth,
                ordersByYear,
                salesByWeek,
                salesByMonth,
                salesByYear
            }
        },
    });

}

module.exports = {
    intialization
}