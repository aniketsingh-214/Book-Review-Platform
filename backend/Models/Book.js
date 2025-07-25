const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please add an author'],
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'Please add a genre'],
    trim: true,
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

BookSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'book',
  justOne: false
});

BookSchema.statics.getAverageRating = async function(bookId) {
    const obj = await this.model('Review').aggregate([
        {
            $match: { book: bookId }
        },
        {
            $group: {
                _id: '$book',
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        await this.findByIdAndUpdate(bookId, {
            averageRating: obj[0] ? obj[0].averageRating.toFixed(1) : 0
        });
    } catch (err) {
        console.error(err);
    }
};

BookSchema.post('save', function() {
    this.constructor.getAverageRating(this._id);
});


module.exports = mongoose.model('Book', BookSchema);