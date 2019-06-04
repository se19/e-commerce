const Order = require('../models/order');
const Cart = require('../models/cart');

const createOrder = (req, res, next) => {
    const nameReceiver = req.body.nameReceiver;
    const addressReceiver = req.body.addressReceiver;
    const emailReceiver = req.body.emailReceiver;
    const phoneReceiver = req.body.phoneReceiver;
    let receiver = {
        name: nameReceiver,
        address: addressReceiver,
        email: emailReceiver,
        phone: phoneReceiver,
    }
    let inTotal = Cart.inTotal(req.session.cart);
    let newOrder = new Order();
    products = [];
    for (let cartItem of req.session.cart) {
        let product = {
            productId: cartItem.product._id,
            title: cartItem.product.title,
            price: cartItem.product.price,
            quantity: cartItem.quantity,
            amount: cartItem.amount
        }
        products.push(product);
    }

    newOrder.products = products;
    newOrder.total = inTotal;
    newOrder.userId = req.session.passport.user._id;
    newOrder.receiver = receiver;
    newOrder.dateCreated = new Date();
    newOrder.status = "pending";
    newOrder.paid = false;

    newOrder
        .save()
        .then(result => {
            req.session.cart = [];
            //console.log(result);
            res.render('common/thankyou', {
                pageTitle: "Đặt hành thành công"
            });
        })
        .catch(err => {
            console.log(err);
        });
}

//Get danh sách order đã đặt
const listOrders = (req, res, next) => {
    Order.find({
            userId: req.session.passport.user._id
        })
        .then((orders) => {
            res.render('order-view/history', {
                pageTitle: "Danh sách đặt hàng",
                orders: orders
            });
        })
        .catch(err => console.log(err));
}

//Cập nhật giỏ hàng
const getOrderInfo = (req, res, next) => {
    let orderId = req.params.orderId;
    Order.findById(orderId)
        .populate('userId')
        .then((order) => {
            res.render('order-view/order-detail', {
                pageTitle: "Thông tin đơn hàng",
                order: order
            });
        })
        .catch(err => console.log(err));
}

module.exports = {
    createOrder,
    listOrders,
    getOrderInfo
}