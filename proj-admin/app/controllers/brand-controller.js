const Brand = require('../models/brand');

//get list
const list_brands = (req, res, next) => {
    Brand.find()
        .then(brands => {
            console.log(brands);
            res.render('brand-view/brand-list', {
                pageTitle: "Nhãn hàng",
                brands: brands
            });
        })
        .catch(err => console.log(err));
}


//get init brand 
const init_brand = (req, res, next) => {
    res.render('brand-view/brand-info', {
        pageTitle: "Thêm nhãn hàng",
        brand: {}
    });
}

//post to create brand 
const create_brand = (req, res, next) => {
    let newBrand = new Brand();
    newBrand.title = req.body.title;
    newBrand.description = req.body.description;
    newBrand.available = req.available;

    let image = req.file;

    if (!image) {
        console.log('Errrrrrrrrrrror');
    } else {
        newBrand.imageUrl = image.path;
        newBrand.imageUrl = newBrand.imageUrl.slice(7);
    }

    newBrand
        .save()
        .then(result => {
            console.log(result);
            console.log('INSERTED BRAND');
            res.redirect('/brands');
        })
        .catch(err => {
            console.log(err);
        });
}

//get brand info
const get_brand = (req, res, next) => {
    let brandId = req.params.brandId;
    Brand.findOne({
            _id: brandId
        })
        .then(brand => {
            if (!brand) {
                console.log('NOT FOUND BRAND');
                return res.redirect('/brands');
            }
            res.render('brand-view/brand-info', {
                pageTitle: brand.title,
                brand
            });
        })
        .catch(err => console.log(err));
}

//posst to update brand
const update_brand = (req, res, next) => {
    let newBrand = new Brand();
    newBrand.brandId = req.body.brandId;
    newBrand.title = req.body.title;
    newBrand.description = req.body.description;
    newBrand.available = req.body.available;

    let image = req.file;

    Brand.findOne({
            _id: newBrand.brandId
        })
        .then(brand => {
            brand.title = newBrand.title;
            brand.description = newBrand.description;
            brand.available = newBrand.available;
            if (image) {
                brand.imageUrl = image.path;
                brand.imageUrl = brand.imageUrl.slice(7);
            }
            return brand.save();
        })
        .then(result => {
            console.log('UPDATED BRAND');
            res.redirect('/brands');
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_brand = (req, res, next) => {
    let brandId = req.body.brandId;
    Brand.findByIdAndRemove(brandId)
        .then(() => {
            console.log('DELETED BRAND');
            res.redirect('/brands');
        })
        .catch(err => console.log(err));
}

module.exports = {
    list_brands,
    init_brand,
    create_brand,
    get_brand,
    update_brand,
    delete_brand
}