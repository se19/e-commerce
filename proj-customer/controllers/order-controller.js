//Get danh sách order đã đặt
const listBills = (req, res, next) => {
    res.render('order-view/history-pay', {
        pageTitle: "Lịch sử đặt hàng",
        session: req.session
    });
}

//Cập nhật giỏ hàng
const getBillInfo = (req, res, next) => {
    res.render('order-view/bill-detail', {
        pageTitle: "Thông tin đơn hàng",
        session: req.session
    });
}

module.exports = {
    listBills,
    getBillInfo
}