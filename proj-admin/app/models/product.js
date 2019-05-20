const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  importDate: {
    type: Date,
    required: true
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  numberInventory: {
    type: Number,
    required: true
  },
  numberPurchased: {
    type: Number,
    default: 0,
    required: true
  },
  reviews: [{
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Rate',
    },
  }],
  average: {
    type: Number,
    default: 0,
    require: true
  }
});

module.exports = mongoose.model('Product', productSchema);