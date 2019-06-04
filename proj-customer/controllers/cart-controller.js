const Cart = require('../models/cart');

//Lấy thông tin giỏ hàng từ local storage
const listCart = (req, res, next) => {
    let inTotal = Cart.inTotal(req.session.cart);
    res.render('cart-view/cart', {
        pageTitle: "Giỏ hàng",
        cartItems: req.session.cart,
        cartTotal: inTotal
    });
}

//Cập nhật giỏ hàng
const updateCart = (req, res, next) => {
    let stringQuantity = req.body.stringQuantity;
    // stringQuantity là danh sách số lượng mới
    Cart.update(req.session.cart, stringQuantity);

    res.json(1)
}

//Xóa sản phẩm khỏi giỏ hàng
const deleteItems = (req, res, next) => {
    const productId = req.params.productId;
    Cart.remove(req.session.cart, productId);
    // res.render('cart-view/cart', {
    //     pageTitle: "Giỏ hàng",
    //     cartItems: req.session.cart
    // });
    //res.redirect('/cart');
    res.json(productId);
}


module.exports = {
    listCart,
    updateCart,
    deleteItems
}