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
    phone: {
      type: String,
      required: true
    },
    address: {
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
  amount: {
    type: Number,
    required: false
  },
  paid: {
    type: Boolean,
    required: false
  },
});

module.exports = mongoose.model('Order', orderSchema);