const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  // https://mongoosejs.com/docs/schematypes.html#arrays
  imageDescription: [String],
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
    required: true
  },
  reviews: [{
    reviewer: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    }
  }],
  average: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model('Product', productSchema);