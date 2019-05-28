//Lấy thông tin đơn hàng hiện tại để checkout
const initializationCheckout = (req, res, next) => {
    res.render('checkout-view/checkout', {
        pageTitle: "Thanh toán"
    });
}

//Cập nhật giỏ hàng
const addCoupons = (req, res, next) => {

}

module.exports = {
    initializationCheckout,
    addCoupons
}