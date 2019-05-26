const list_top_products = (req, res, next) => {
    res.render('top-view/top-products', {
        pageTitle: "Sản phẩm bán chạy",
        session: req.session
    });
}

const list_top_brands = (req, res, next) => {
    res.render('top-view/top-brands', {
        pageTitle: "Nhãn hàng bán chạy",
        session: req.session
    });
}

module.exports = {
    list_top_products,
    list_top_brands
}