const list_user = (req, res, next) => {
    res.render('user-view/user-list');
}

const get_user = (req, res, next) => {
    res.render('user-view/user-info');
}

const create_user = (req, res, next) => {
    res.render('user-view/user-info');
}

const update_user = (req, res, next) => {
    res.render('user-view/user-info');
}

const delete_user = (req, res, next) => {

}

module.exports = {
    list_user,
    get_user,
    create_user,
    update_user,
    delete_user
}