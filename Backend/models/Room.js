const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  image: String,
  description: String,
  amenities: [String],
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Room', roomSchema);