const Category = require('../models/category');

//get list
const list_categories = (req, res, next) => {
    Category.find()
        //.execPopulate()
        .then(categories => {
            console.log(categories);
            res.render('category-view/category-list', {
                pageTitle: "Loại hàng",
                categories: categories,
                session: req.session
            });
        })
        .catch(err => console.log(err));
}


//get init category
const init_category = (req, res, next) => {
    res.render('category-view/category-info', {
        pageTitle: "Thêm loại hàng",
        category: {},
        session: req.session
    });
}

//post to create category
const create_category = (req, res, next) => {
    let newCategory = new Category();
    newCategory.title = req.body.title;
    newCategory.description = req.body.description;
    newCategory.available = req.available;

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
            res.redirect('/categories');
        })
        .catch(err => {
            console.log(err);
        });
}

//get category info
const get_category = (req, res, next) => {
    let categoryId = req.params.categoryId;
    Category.findOne({
            _id: categoryId
        })
        .then(category => {
            if (!category) {
                console.log('NOT FOUND CATEGORY');
                return res.redirect('/categories');
            }
            res.render('category-view/category-info', {
                pageTitle: category.title,
                category,
                session: req.session
            });
        })
        .catch(err => console.log(err));
}

//posst to update category
const update_category = (req, res, next) => {
    let newCategory = new Category();
    newCategory.categoryId = req.body.categoryId;
    newCategory.title = req.body.title;
    newCategory.description = req.body.description;
    newCategory.available = req.body.available;

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
            res.redirect('/categories');
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_category = (req, res, next) => {
    let cateloryId = req.body.categoryId;
    Category.findByIdAndRemove(cateloryId)
        .then(() => {
            console.log('DELETED CATEGORY');
            res.redirect('/categories');
        })
        .catch(err => console.log(err));
}

module.exports = {
    list_categories,
    init_category,
    create_category,
    get_category,
    update_category,
    delete_category
}