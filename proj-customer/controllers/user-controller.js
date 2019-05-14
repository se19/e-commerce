//Get thông tin người dùng
const getInfo = (req, res, next) => {
    res.render('user-view/update-info', {
        pageTitle: "Cập nhật thông tin"
    });
}

//Cập nhật thông tin
const updateInfo = (req, res, next) => {

}

//Thay đổi mật khẩu
const changePw = (req, res, next) => {
    res.render('user-view/change-pw', {
        pageTitle: "Đổi mật khẩu"
    });
}

module.exports = {
    getInfo,
    updateInfo,
    changePw
}