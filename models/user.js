const mongoose = require('mongoose');

const Schema = mongoose.Schema

// Create Model 'User'
const User = mongoose.model('User', new Schema({
  username: String,
  password: String
}));

module.exports = User