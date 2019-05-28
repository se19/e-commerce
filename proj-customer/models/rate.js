const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rateSchema = new Schema({
  reviewer: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  star: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Rate', rateSchema);
