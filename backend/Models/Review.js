const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  review_text: {
    type: String,
    required: [true, 'Please add some text for the review'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating between 1 and 5'],
  },
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true
});

ReviewSchema.post('save', function() {
  this.constructor.model('Book').getAverageRating(this.book);
});

ReviewSchema.post('remove', function() {
  this.constructor.model('Book').getAverageRating(this.book);
});


module.exports = mongoose.model('Review', ReviewSchema);
