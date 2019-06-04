const Cart = require('../models/cart');

//Lấy thông tin giỏ hàng hiện tại để checkout
const initializationCheckout = (req, res, next) => {
    let inTotal = Cart.inTotal(req.session.cart);
    res.render('checkout-view/checkout', {
        pageTitle: "Đặt hàng",
        cartItems: req.session.cart,
        cartTotal: inTotal
    });
}

module.exports = {
    initializationCheckout
}