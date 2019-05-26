const list_statistics = (req, res, next) => {
    res.render('statistics-view/statistics', {
        pageTitle: "Thống kế doanh thu",
        session: req.session
    });
}

module.exports = {
    list_statistics
}