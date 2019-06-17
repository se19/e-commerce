const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  userType: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: false
  },
  available: {
    type: Boolean,
    required: true
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: false
  }
  // cart: {
  //   items: [{
  //     productId: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'Product',
  //       required: true
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true
  //     }
  //   }]
  // }
});

userSchema.plugin(findOrCreate);


// userSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });


module.exports = mongoose.model('User', userSchema);