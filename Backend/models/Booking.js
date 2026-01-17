const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  roomId: String,
  email: String,
  name: String,
  phone: String,
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalPrice: Number,
  status: { type: String, default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);