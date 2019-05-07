//Lấy thông tin đơn hàng hiện tại để checkout
const initializationCheckout = (req, res, next) => {
    res.render('order-view/checkout', {});
}

//Cập nhật giỏ hàng
const addCoupons = (req, res, next) => {

}

module.exports = {
    initializationCheckout,
    addCoupons
}