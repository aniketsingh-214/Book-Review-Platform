const Book = require('../Models/Book');
exports.getBooks = async (req, res) => {
  try {
    let query;
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = Book.find(JSON.parse(queryStr));
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Book.countDocuments(JSON.parse(queryStr));
    query = query.skip(startIndex).limit(limit);
    const books = await query.populate('reviews');

   
    const pagination = {};
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res.status(200).json({
      success: true,
      count: books.length,
      pagination,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'user',
            select: 'username'
        }
    });

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    res.status(200).json({ success: true, data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};


exports.addBook = async (req, res) => {

  req.body.user = req.user.id;

  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
