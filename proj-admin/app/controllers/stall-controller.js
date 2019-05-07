const list_stall = (req, res, next) => {
    res.render('stall-view/stall-list', {
        title: 'Admin'
    });
}

const get_stall = (req, res, next) => {
    res.render('stall-view/stall-info');
}

const create_stall = (req, res, next) => {
    res.render('stall-view/stall-info');
}

const update_stall = (req, res, next) => {
    res.render('stall-view/stall-info');
}

const delete_stall = (req, res, next) => {

}

module.exports = {
    list_stall,
    get_stall,
    create_stall,
    update_stall,
    delete_stall
}