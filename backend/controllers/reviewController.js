const Review = require('../Models/Review');
const Book = require('../Models/Book');

exports.getReviewsForBook = async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId }).populate({
        path: 'user',
        select: 'username'
    });
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

exports.addReview = async (req, res) => {
  req.body.book = req.params.bookId;
  req.body.user = req.user.id;

  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    
    const existingReview = await Review.findOne({ book: req.params.bookId, user: req.user.id });

    if (existingReview) {
        return res.status(400).json({ success: false, message: 'You have already reviewed this book' });
    }

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
