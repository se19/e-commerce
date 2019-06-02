const Cart = require('../models/cart');

//Lấy thông tin giỏ hàng từ local storage
const listCart = async (req, res, next) => {
    let inTotal = Cart.inTotal(req.session.cart);
    res.render('cart-view/cart', {
        pageTitle: "Giỏ hàng",
        cartItems: req.session.cart,
        cartTotal: inTotal
    });
}

//Cập nhật giỏ hàng
const updateCart = (req, res, next) => {

}

//Xóa sản phẩm khỏi giỏ hàng
const deleteItems = (req, res, next) => {
    const productId = req.params.productId;
    Cart.remove(req.session.cart, productId);
    // res.render('cart-view/cart', {
    //     pageTitle: "Giỏ hàng",
    //     cartItems: req.session.cart
    // });
    res.redirect('/cart');
}


module.exports = {
    listCart,
    updateCart,
    deleteItems
}