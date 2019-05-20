// create
const get_add_product = (req, res, next) => {
    res.render('product-view/product-info', {
        editing: false
    });
}

const post_add_product = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const numberInventory = req.body.numberInventory;
    const image = req.file;
    const importDate = new Date().getDate();
    const description = req.body.description;
    let brandId = req.body.brand;
    let categoryId = req.body.category;
    // let brandId = await Brand.findOne({
    //     title: req.body.brandTitle
    // });
    // let categoryId = await Category.findOne({
    //     title: req.body.categoryTitle
    // });

    if (!image) {
        console.log('Errrrrrrrrrrror');
    }
    // path = public/images/untitled.png
    let imageUrl = image.path;
    imageUrl = imageUrl.slice(7);
    //console.log(imageUrl);

    const product = new Product({
        productId: productId,
        title: title,
        price: price,
        numberInventory: numberInventory,
        importDate: importDate,
        brandId: brandId,
        categoryId: categoryId,
        imageUrl: imageUrl,
        description: description
    });
    console.log(product);
        // .save()
        // .then(result => {
        //     console.log(result);
        //     console.log('Created Product');
        //     res.redirect('/products');
        // })
        // .catch(err => {
        //     console.log(err);
        // });
}

// read
const get_list_product = (req, res, next) => {
    res.render('product-view/product-list');
}

// update
const get_edit_product = (req, res, next) => {
    res.render('product-view/product-info');
}

const post_edit_product = (req, res, next) => {
    res.render('product-view/product-info');
}

// delete
const post_delete_product = (req, res, next) => {
    res.render('product-view/product-info');
}


module.exports = {
    get_add_product,
    post_add_product,
    get_list_product,
    get_edit_product,
    post_edit_product,
    post_delete_product
}