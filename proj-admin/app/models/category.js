const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
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
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);