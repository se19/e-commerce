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
  // lượt xem
  view: {
    type: Number
  },
  // do review không có tái sử dụng lại nên mình quăng vô product luôn
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
  // đánh giá trung bình
  average: {
    type: Number,
    require: true
  },
  // danh sách sản phẩm được mua cùng với sản phẩm hiện tại, gồm (id, số lần mua)
  relatedProduct: [{
    productId: {
      type: Schema.Types.ObjectId,
    },
    num: {
      type: Number,
    }
  }],
});

module.exports = mongoose.model('Product', productSchema);