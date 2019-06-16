const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');

const createOrder = async (req, res, next) => {
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

    // lưu lại danh sách sản phẩm hay mua cùng nhau
    // cấu trúc là mảng [{productId, title, price, quantity, amount}]
    for (let p of products) {
        // trả về array nếu dùng find
        let product = await Product.findOne({
            _id: p.productId
        });
        // lấy danh sách mới không chứ product đang xét
        let tempProducts = products.filter(proItem => proItem.productId.toString() !== product._id.toString())

        for (let tempProduct of tempProducts) {
            // cấu trúc relatedProduct [{productId, num}]
            // https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
            if (product.relatedProduct === undefined) {
                product.relatedProduct = [];
            }
            let index = product.relatedProduct.findIndex(item => item.productId.toString() == tempProduct.productId.toString())
            // nếu có trong relatedProduct thì tăng số lượt
            if (index != -1) {
                product.relatedProduct[index].num += tempProduct.quantity;
            } else { // thêm mới
                relatedPro = {};
                relatedPro.productId = tempProduct.productId;
                relatedPro.num = tempProduct.quantity;
                product.relatedProduct.push(relatedPro);
            }
            product.save();
        }
    }

    // lưu lại đơn hàng
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