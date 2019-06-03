// Cấu trúc của cart
// Cart = { [ {product}, quantity, amount ], total }


const add = (cartItems, item) => {
    for (let cartItem of cartItems) {
        // dùng equals để so sánh _id, nếu đã tồn tại thì cập nhật lại giỏ hàng
        if (item.product._id.equals(cartItem.product._id)) {
            cartItem.quantity += item.quantity;
            cartItem.amount += item.amount;
            return;
        }
    }
    // chưa tồn tại thì thêm mới
    cartItems.push(item);
}

const update = (cartItems, stringQuantity) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].quantity != +stringQuantity[i]) {
            cartItems[i].quantity = +stringQuantity[i]; // cập nhật số lượng
            cartItems[i].amount = cartItems[i].quantity * cartItems[i].product.price;
        }
    }
}

const remove = (cartItems, prodId) => {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].product._id.toString() === prodId.toString()) {
            cartItems.splice(i, 1);
            return;
        }
    }
}

//Tổng tiền giỏ hàng
const inTotal = (cartItems) => {
    let total = +0;
    for (let cartItem of cartItems) {
        total += cartItem.amount;
    }
    return total;
}

module.exports = {
    add,
    update,
    remove,
    inTotal
}