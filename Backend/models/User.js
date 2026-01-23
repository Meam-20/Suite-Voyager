const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  photo: String,
  role: { type: String, default: 'user' }, // 'user' or 'admin'
});

module.exports = mongoose.model('User', userSchema);