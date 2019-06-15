const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema({
  rating: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Rate', rateSchema);