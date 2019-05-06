const list_account = (req, res, next) => {
    res.render('account-view/account-list');
}

const get_account = (req, res, next) => {
    res.render('account-view/account-info');
}

const create_account = (req, res, next) => {
    res.render('account-view/account-info');
}

const update_account = (req, res, next) => {
    res.render('account-view/account-info');
}

const delete_account = (req, res, next) => {

}

module.exports = {
    list_account,
    get_account,
    create_account,
    update_account,
    delete_account
}