const express = require('express');
const {
  getReviewsForBook,
  addReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router({ mergeParams: true });

router.get('/', getReviewsForBook);
router.post('/', protect, addReview);

module.exports = router;
