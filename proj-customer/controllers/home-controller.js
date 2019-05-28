const Product = require('../models/product');

let hotProds = [];
let newProds = [];

const initialization = (req, res, next) => {
    Product.find()
        .then(products => {
            // bổ sung 2 phương thức sau nào Model product
            // hotProds = products.sortByPurchased();
            hotProds = products;
            // newProds = products.sortByImportDate();
            newProds = products;
            res.render('home-view/index', {
                hotProds: hotProds,
                newProds: newProds,
                pageTitle: 'Trang chủ',
                session: req.session
            });
        })
        .catch(err => {
            console.log(err);
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