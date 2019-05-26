const list_top_brands = (req, res, next) => {
    res.render('top-brands-view/top-brands', {
        session: req.session
    });
}

module.exports = {
    list_top_brands
}