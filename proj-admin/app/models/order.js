// mảng [{id, title, price, quantity, amount}]
// total
// Thông tin người đặt: userId từ người đang login
// Thông tin người nhận: {name, address, email, phone, description}
// ngày đặt, ngày nhận, trạng thái, đã thanh toán

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      require: true
    }
  }],
  total: {
    type: Number,
    required: true,
  },
  // người đặt: Id người đăng login
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  receiver: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  dateCreated: {
    type: Date,
    required: false
  },
  dateCompleted: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  paid: {
    type: Boolean,
    required: false
  },
});

module.exports = mongoose.model('Order', orderSchema);
