const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema({
  rating: {
    type: Number,
    required: true
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
  }
});

module.exports = mongoose.model('Rate', rateSchema);