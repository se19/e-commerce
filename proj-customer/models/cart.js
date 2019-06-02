const add = (cart, item) => {
    for (let i = 0; i < cart.length; i++) {
        // dùng equals để so sánh _id
        if (item.product._id.equals(cart[0].product._id)) {
            // cập nhật lại số lượng
            cart[i].quantity += item.quantity;
            cart[i].amount += item.amount;
            return;
        }
    }
    cart.push(item);
}

module.exports = {
    add
}