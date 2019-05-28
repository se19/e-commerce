const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
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
        required: true
    },
    available: {
        type: Boolean,
        required: false
    },
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

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});
module.exports = mongoose.model('User', userSchema);