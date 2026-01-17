const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  roomId: String,
  name: String,
  email: String,
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);