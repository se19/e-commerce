const Product = require('../models/product');

const ITEMS_PER_PAGE = 6;

const getSearch = async (req, res, next) => {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    // https://stackoverflow.com/questions/38497650/how-to-find-items-using-regex-in-mongoose
    // https://stackoverflow.com/questions/26814456/how-to-get-all-the-values-that-contains-part-of-a-string-using-mongoose-find
    // https://github.com/Automattic/mongoose/issues/598

    let sort = "";
    const price = +req.query.price;
    if (price) {
        req.session.queryUrl = "price=" + price + "&";
        if (price == 1) {
            sort = "asc";
        } else {
            sort = "des";
        }
    } else {
        req.session.queryUrl = ""
    }

    const keyword = req.query.keyword;
    req.session.queryUrl = "keyword=" + keyword + "&";

    /*Phân trang sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    let totalItems = await Product.find({
        available: true,
        title: new RegExp(keyword, 'i')
    }).countDocuments();

    const products = await Product.find({
            available: true,
            title: new RegExp(keyword, 'i')
        })
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    res.render('product-view/shop-list', {
        brands: res.locals.data.groupBrandsDetail,
        categories: res.locals.data.groupCategoriesDetail,
        prods: products,
        pageTitle: 'Danh sách sản phẩm',
        searchInformation: 'Danh sách sản phẩm có từ khóa ' + keyword,
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        queryUrl: req.session.queryUrl,
        sort: sort
    });
}


const getAdvanceSearch = (req, res, next) => {
    res.render('search-view/advance-search', {
        pageTitle: "Tìm kiếm nâng cao"
    });
}


const getAdvanceSearchQuery = async (req, res, next) => {
    let sort = "";
    const price = +req.query.price;
    if (price) {
        req.session.queryUrl = "price=" + price + "&";
        if (price == 1) {
            sort = "asc";
        } else {
            sort = "des";
        }
    } else {
        req.session.queryUrl = ""
    }

    const brandId = req.query.brandId;
    const categoryId = req.query.categoryId;
    const view = +req.query.view;
    const numberPurchased = +req.query.numberPurchased;
    const average = +req.query.average;
    //console.log(brandId + ' - ' + categoryId + ' - ' + price + ' - ' + numberPurchased + ' - ' + average)
    req.session.queryUrl = "brandId=" + brandId + "&categoryId=" + categoryId + "&view=" + view + "&numberPurchased=" + numberPurchased + "&average=" + average + "&";

    /*Phân trang sản phẩm*/
    // trường hợp không có '?page' thì page = 1
    const page = +req.query.page || 1;

    // đếm số items;
    let totalItems = await Product.find({
        available: true,
        brandId: brandId,
        categoryId: categoryId,
    }).countDocuments();

    const products = await Product.find({
            available: true,
            brandId: brandId,
            categoryId: categoryId
        })
        .sort({
            view: view,
            numberPurchased: numberPurchased,
            average: average
        })
        .skip((page - 1) * ITEMS_PER_PAGE) // bỏ qua ~ item
        .limit(ITEMS_PER_PAGE);

    res.render('product-view/shop-list', {
        brands: res.locals.data.groupBrandsDetail,
        categories: res.locals.data.groupCategoriesDetail,
        prods: products,
        pageTitle: 'Danh sách sản phẩm',
        searchInformation: 'Danh sách sản phẩm tìm kiếm nâng cao',
        currentPage: page,
        hasFirstPage: page != 1,
        hasPreviousPage: page > 1,
        previousPage: page - 1,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        nextPage: page + 1,
        hasLastPage: page != Math.ceil(totalItems / ITEMS_PER_PAGE),
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
        queryUrl: req.session.queryUrl,
        sort: sort
    });

}

module.exports = {
    getSearch,
    getAdvanceSearch,
    getAdvanceSearchQuery
}