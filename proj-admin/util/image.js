const multer = require('multer');

// folderName là thư mục trong public sẽ lưu ảnh. Ví dụ: brands, categories, products
const uploadImage = (folderName) => {
    //multer upload img
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/images/' + folderName);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    const upload = multer({
        storage: fileStorage
    });

    return upload;
}
exports.uploadImage = async () => {
    await uploadImage(folderName);
};