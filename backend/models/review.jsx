let mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    rating: Number,
    title: String,
    review: String,
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  // const Reviews = mongoose.model('Review', reviewSchema);
  module.exports = mongoose.model('Review', reviewSchema)