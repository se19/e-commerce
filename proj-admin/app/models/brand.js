const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    title: {
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
    available: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('Brand', brandSchema);