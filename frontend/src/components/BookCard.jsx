import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">by {book.author}</p>
        <p className="text-sm text-gray-500 bg-gray-200 inline-block px-2 py-1 rounded-full mb-4">{book.genre}</p>
        <div className="flex items-center mb-4">
          <Rating value={book.averageRating} />
          <span className="ml-2 text-gray-600">{book.averageRating > 0 ? `${book.averageRating} stars` : 'No ratings yet'}</span>
        </div>
        <Link to={`/books/${book._id}`} className="text-blue-500 hover:text-blue-700 font-semibold">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
};

export default BookCard;