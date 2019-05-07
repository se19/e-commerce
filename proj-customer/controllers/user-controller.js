//Get thông tin người dùng
const getInfo = (req, res, next) => {
    res.render('user-view/update-info');
}

//Cập nhật thông tin
const updateInfo = (req, res, next) => {

}

//Thay đổi mật khẩu
const changePw = (req, res, next) => {
    res.render('user-view/change-pw');
}

module.exports = {
    getInfo,
    updateInfo,
    changePw
}