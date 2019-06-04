const Order = require('../models/order');
const constants = require('../../constants/index');


//get list
const list_orders = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    let status = req.query.status;

    // const searchKeyword = req.query.searchKeyword;
    // status: {
    //     $regex: new RegExp(searchKeyword, "i")
    // }

    Order.find({
            status: {
                $regex: new RegExp(status, "i")
            },
        })
        .then(orders => {
            console.log(orders);
            res.render('order-view/order-list', {
                pageTitle: "Đơn hàng",
                orders: orders,
                status: status
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}


//get init order 
// const init_order = (req, res, next) => {
//     res.render('order-view/order-info', {
//         pageTitle: "Thêm đơn hàng",
//         order: {}
//     });
// }

//post to create order 
// const create_order = (req, res, next) => {
//     let newOrder = new Order();
//     let product = {
//         quantity: 1,
//         product: {
//             productId: "5cf383a38187854699d6dbbe",
//             title: "product title",
//             price: 20000
//         }
//     }
//     var mongoose = require('mongoose');
//     newOrder.products.push(product);
//     newOrder.user.userId = mongoose.Types.ObjectId('5cf259a736363d506a8c5752');
//     newOrder.user.name = "abc";
//     newOrder.user.phone = "121029";
//     newOrder.user.address = "3424efsf";

//     newOrder
//         .save()
//         .then(result => {
//             console.log(result);
//             console.log('INSERTED BRAND');
//             res.redirect('/orders/' + result.id);
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

//get order info
const get_order = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    let orderId = req.params.orderId;
    Order.findOne({
            _id: orderId
        })
        .then(order => {
            if (!order) {
                console.log('NOT FOUND ORDER');
                return res.redirect('/orders');
            }
            res.render('order-view/order-info', {
                pageTitle: 'Đơn hàng ' + order.id,
                order
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

//posst to update order
// const update_order = (req, res, next) => {
//     let newOrder = new Order();
//     newOrder.orderId = req.params.orderId;
//     newOrder.title = req.body.title;
//     newOrder.description = req.body.description;
//     newOrder.available = req.body.available;

//     Order.findOne({
//             _id: newOrder.orderId
//         })
//         .then(order => {
//             order.title = newOrder.title;
//             order.description = newOrder.description;
//             order.available = newOrder.available;

//             return order.save();
//         })
//         .then(result => {
//             console.log('UPDATED ORDER');
//             res.redirect(req.get('referer'));
//         })
//         .catch(err => console.log(err));
// }

const change_order_status = (req, res, next) => {
    let orderId = req.params.orderId;

    Order.findOne({
            _id: orderId
        })
        .then(order => {
            if (order) {
                switch (order.status) {
                    case constants.ORDER_STATUS_PENDING:
                        order.status = constants.ORDER_STATUS_SHIPPING;
                        break;
                    case constants.ORDER_STATUS_SHIPPING:
                        order.status = constants.ORDER_STATUS_COMPLETED;
                        break;
                    case constants.ORDER_STATUS_COMPLETED:
                        order.status = constants.ORDER_STATUS_COMPLETED;
                        break;
                    default:
                        order.status = constants.ORDER_STATUS_CANCELED;
                }
            }
            return order.save();
        })
        .then(result => {
            console.log('UPDATED ORDER');
            req.flash('success', 'Thay đổi trạng thái thành công!')
            res.redirect(req.get('referer'));
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

const cancel_order = (req, res, next) => {
    let orderId = req.params.orderId;

    Order.findOne({
            _id: orderId
        })
        .then(order => {
            if (order) {
                order.status = constants.ORDER_STATUS_CANCELED;
            }
            return order.save();
        })
        .then(result => {
            console.log('UPDATED ORDER');
            req.flash('success', 'Hủy đơn hàng thành công!')
            res.redirect(req.get('referer'));
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

const update_userinfo_order = (req, res, next) => {
    let orderId = req.params.orderId;
    let name = req.body.name;
    let address = req.body.address;
    let phone = req.body.phone;

    Order.updateOne({
            _id: orderId
        }, {
            user: {
                name: name,
                address: address,
                phone: phone
            }
        })
        .then(result => {
            console.log('UPDATED USER');
            req.flash('success', 'Thay đổi thông tin người dùng thành công!')
            res.redirect('/orders/' + orderId);
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

//post to dele

//post to delete
// const delete_order = (req, res, next) => {
//     let orderId = req.params.orderId;
//     Order.findById(orderId)
//         .then(order => {
//             if (order) {
//                 return Order.findByIdAndRemove(orderId);
//             }
//         })
//         .then(() => {
//             console.log('DELETED ORDER');
//             req.flash('success', 'Xóa đơn hàng thành công!')
//             res.redirect('/orders');
//         })
//         .catch(err => {
//             console.log(err);
//             req.flash('error', 'Lỗi!')
//         });
// }

module.exports = {
    list_orders,
    // init_order,
    // create_order,
    get_order,
    // update_order,
    change_order_status,
    cancel_order,
    update_userinfo_order,
    // delete_order
}