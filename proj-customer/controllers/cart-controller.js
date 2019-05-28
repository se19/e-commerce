//Lấy thông tin giỏ hàng từ local storage
const listCart = (req, res, next) => {
    res.render('cart-view/cart', {
        pageTitle: "Giỏ hàng",
        session: req.session
    });
}

//Cập nhật giỏ hàng
const updateCart = (req, res, next) => {

}

//Xóa sản phẩm khỏi giỏ hàng
const deleteItems = (req, res, next) => {

}

module.exports = {
    listCart,
    updateCart,
    deleteItems
}