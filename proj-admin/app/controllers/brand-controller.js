const Brand = require('../models/brand');
const fileHelper = require('../../util/file');


//get list
const list_brands = (req, res, next) => {
    let available = req.query.available;
    let params = {};
    if (available === 'true') {
        params.available = true;
    } else if (available === 'false') {
        params.available = false;
    }
    Brand.find(params)
        .then(brands => {
            console.log(brands);
            res.render('brand-view/brand-list', {
                pageTitle: "Nhãn hàng",
                brands: brands,
                available: params.available
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
    if (req.body.available) {
        newBrand.available = true;
    } else {
        newBrand.available = false;
    }

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
            res.redirect('/brands/' + result.id);
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
    newBrand.brandId = req.params.brandId;
    newBrand.title = req.body.title;
    newBrand.description = req.body.description;
    if (req.body.available) {
        newBrand.available = true;
    } else {
        newBrand.available = false;
    }

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
            res.redirect(req.get('referer'));
        })
        .catch(err => console.log(err));
}

//post to delete
const delete_brand = (req, res, next) => {
    let brandId = req.params.brandId;
    Brand.updateOne({
            _id: brandId
        }, {
            available: false
        })
        .then(result => {
            console.log('DISABLED BRAND');
            res.redirect('/brands');
        })
        .catch(err => console.log(err));
    // Brand.findById(brandId)
    //     .then(brand => {
    //         if (brand) {
    //             if (brand.imageUrl) {
    //                 fileHelper.deleteFile('public\\' + brand.imageUrl);
    //             }
    //             return Brand.findByIdAndRemove(brandId);
    //         }
    //     })
    //     .then(() => {
    //         console.log('DELETED BRAND');
    //         res.redirect('/brands');
    //     })
    //     .catch(err => console.log(err));
}

module.exports = {
    list_brands,
    init_brand,
    create_brand,
    get_brand,
    update_brand,
    delete_brand
}