const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [{
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    phone: {},
    address: {
      type: String,
      required: true
    },
    note: {
      type: String,
      required: false
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);