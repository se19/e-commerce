const Category = require('../models/category');
const fileHelper = require('../../util/file');

//get list
const list_categories = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    let available = req.query.available;
    let params = {};

    if (available === 'true') {
        params.available = true;
    } else if (available === 'false') {
        params.available = false;
    }

    Category.find(params)
        //.execPopulate()
        .then(categories => {
            console.log(categories);
            res.render('category-view/category-list', {
                pageTitle: "Loại hàng",
                categories: categories,
                available: params.available
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}


//get init category
const init_category = (req, res, next) => {
    res.render('category-view/category-info', {
        pageTitle: "Thêm loại hàng",
        category: {}
    });
}

//post to create category
const create_category = (req, res, next) => {
    let newCategory = new Category();
    newCategory.title = req.body.title;
    newCategory.description = req.body.description;
    if (req.body.available) {
        newCategory.available = true;
    } else {
        newCategory.available = false;
    }

    let image = req.file;

    if (!image) {
        console.log('Errrrrrrrrrrror');
    } else {
        newCategory.imageUrl = image.path;
        newCategory.imageUrl = newCategory.imageUrl.slice(7);
    }

    newCategory
        .save()
        .then(result => {
            console.log(result);
            console.log('INSERTED CATEGORY');
            req.flash('success', 'Thêm thành công!')
            res.redirect('/categories/' + result.id);
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

//get category info
const get_category = (req, res, next) => {
    //get notification
    res.locals.message = req.flash();

    let categoryId = req.params.categoryId;

    Category.findOne({
            _id: categoryId
        })
        .then(category => {
            if (!category) {
                console.log('NOT FOUND CATEGORY');
                req.flash('error', 'Loại hàng hóa không tồn tại!')
                return res.redirect('/categories');
            }
            res.render('category-view/category-info', {
                pageTitle: category.title,
                category
            });
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

//posst to update category
const update_category = (req, res, next) => {
    let newCategory = new Category();
    newCategory.categoryId = req.params.categoryId;
    newCategory.title = req.body.title;
    newCategory.description = req.body.description;
    if (req.body.available) {
        newCategory.available = true;
    } else {
        newCategory.available = false;
    }

    let image = req.file;

    Category.findOne({
            _id: newCategory.categoryId
        })
        .then(category => {
            category.title = newCategory.title;
            category.description = newCategory.description;
            category.available = newCategory.available;
            if (image) {
                category.imageUrl = image.path;
                category.imageUrl = category.imageUrl.slice(7);
            }
            return category.save();
        })
        .then(result => {
            console.log('UPDATED CATEGORY');
            req.flash('success', 'Cập nhật thành công!')
            res.redirect(req.get('referer'));
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
}

//post to delete
const delete_category = (req, res, next) => {
    let cateloryId = req.params.categoryId;
    Category.updateOne({
            _id: cateloryId
        }, {
            available: false
        })
        .then(result => {
            console.log('DISABLED CATEGORY');
            req.flash('success', 'Đã vô hiệu hóa loại hàng hóa có mã số ' + cateloryId);
            res.redirect('/categories');
        })
        .catch(err => {
            console.log(err);
            req.flash('error', 'Lỗi!')
        });
    // Category.findById(cateloryId)
    //     .then(category => {
    //         if (category) {
    //             if (category.imageUrl) {
    //                 fileHelper.deleteFile('public\\' + category.imageUrl);
    //             }
    //             return Product.findByIdAndRemove(cateloryId);
    //         }
    //     })
    //     .then(() => {
    //         console.log('DELETED CATEGORY');
    //         res.redirect('/categories');
    //     })
    //     .catch(err => console.log(err));
}


module.exports = {
    list_categories,
    init_category,
    create_category,
    get_category,
    update_category,
    delete_category
}