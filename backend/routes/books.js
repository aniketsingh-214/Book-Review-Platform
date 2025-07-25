const express = require('express');
const {
  getBooks,
  getBook,
  addBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const reviewRouter = require('./reviews');
const router = express.Router();

router.use('/:bookId/reviews', reviewRouter);
router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', protect, addBook);

module.exports = router;