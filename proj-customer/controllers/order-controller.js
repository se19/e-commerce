//Get danh sách order đã đặt
const listBills = (req, res, next) => {
    res.render('order-view/history-pay', {
        pageTitle: "Lịch sử đặt hàng"
    });
}

//Cập nhật giỏ hàng
const getBillInfo = (req, res, next) => {
    res.render('order-view/bill-detail', {
        pageTitle: "Thông tin đơn hàng"
    });
}

module.exports = {
    listBills,
    getBillInfo
}