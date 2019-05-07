//Khởi tạo dữ liệu cho trang chủ
const initialization = (req, res, next) => {
    res.render('home-view/index', {});
    getHotItems(req, res, next);
    getNewItems(req, res, next);
}

//Get danh sách sản phẩm bán chạy
const getHotItems = (req, res, next) => {

}

//Get danh sách sản phẩm mới
const getNewItems = (req, res, next) => {

}

module.exports = {
    getHotItems,
    getNewItems,
    initialization
}