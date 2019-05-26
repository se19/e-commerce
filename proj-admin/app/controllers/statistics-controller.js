const list_statistics = (req, res, next) => {
    res.render('statistics', {
        session: req.session
    });
}

module.exports = {
    list_statistics
}