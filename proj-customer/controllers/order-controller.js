//Get danh sách order đã đặt
const listBills = (req, res, next) => {
    res.render('order-view/history-pay', {});
}

//Cập nhật giỏ hàng
const getBillInfo = (req, res, next) => {
    res.render('order-view/bill-detail', {});
}

module.exports = {
    listBills,
    getBillInfo
}