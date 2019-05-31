const Product = require('../models/product');

// mongoose sort thì 1 là tăng dần, -1 là giảm dần

const initialization = async (req, res, next) => {
    // chọn ra 6 sản phẩm chạy nhất
    let hotProds = await Product.find().sort({
        numberPurchased: -1
    }).limit(6);

    // chọn ra 5 sản phẩm mới nhất
    let newProds = await Product.find().sort({
        importDate: -1  // ngày giảm dần
    }).limit(5);

    res.render('home-view/index', {
        hotProds: hotProds,
        newProds: newProds,
        pageTitle: 'Trang chủ'
    });
}


//Khởi tạo dữ liệu cho trang chủ
// const initialization = async (req, res, next) => {
//     await getHotItems();
//     await getNewItems();

//     await res.render('home-view/index', {
//         pageTitle: 'Trang chủ',
//         path: '/',
//         hotProds: hotProds,
//         newProds: newProds
//     });
// }

//Get danh sách sản phẩm bán chạy
// const getHotItems = () => {
//     Product.find()
//         .exec(function (err, products) {
//             if (err) throw err;
//             hotProds = products;
//             // console.log(products);
//         });
// }

//Get danh sách sản phẩm mới
// const getNewItems = () => {
//     Product.find()
//         .exec(function (err, products) {
//             if (err) throw err;
//             newProds = products;
//             // console.log(products);
//         });
// }

module.exports = {
    initialization
}