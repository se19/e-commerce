//Get danh sách sản phẩm, bao gồm cả tìm kiếm, sort, order và phân trang
const listProduct = (req, res, next) => {
    res.render('product-view/shop-list');
}

//Get thông tin sản phẩm
const getDetail = (req, res, next) => {
    res.render('product-view/product');
}

module.exports = {
    listProduct,
    getDetail
}