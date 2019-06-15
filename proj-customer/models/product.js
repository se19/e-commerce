const mongoose = require('mongoose');
const Rate = require('./rate');

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
  imageDescription: [{
    image: {
      type: String,
      required: true
    }
  }],
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
  available: {
    type: Boolean,
    required: true
  },
  // lượt xem
  view: {
    type: Number
  },
  // do review không có tái sử dụng lại nên mình quăng vô product luôn => không được, phải tạo model để pagination :(
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: 'Rate'
  },
  // đánh giá trung bình
  average: {
    type: Number,
    require: true
  },
  // danh sách sản phẩm được mua cùng với sản phẩm hiện tại, gồm (id, số lần mua)
  relatedProduct: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    num: {
      type: Number,
    }
  }],
});


productSchema.methods.addReview = function (review) {
  // thêm review vào sản phẩm
  this.reviews.push(review._id);

  // populate không được :(((
  // this.populate({
  //     path: 'reviews',
  //   })
  //   .execPopulate()
  //   .then(product => {
  //     console.log(product);
  //   })

  let sum = 0;
  Rate.find({
      _id: {
        $in: this.reviews
      }
    })
    .then(reviews => {
      for (let review of reviews) {
        sum += review.rating;
      }
      //làm tròn 2 chữ số
      this.average = Math.round(sum / this.reviews.length * 100) / 100;
      // lưu lại product, return ở đây.........
      return this.save();
    })
};

module.exports = mongoose.model('Product', productSchema);