import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, addReview } from '../services/api';
import Spinner from '../components/Spinner';
import Rating from '../components/Rating';
import { useAuth } from '../context/AuthContext.jsx';

const BookDetailPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newReview, setNewReview] = useState({ rating: 0, review_text: '' });
  
  const hasUserReviewed = reviews.some(review => review.user._id === user?.id);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const { data } = await getBookById(id);
      setBook(data.data);
      setReviews(data.data.reviews);
      setError('');
    } catch (err) {
      setError('Failed to fetch book details.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0 || newReview.review_text.trim() === '') {
        setError('Please provide a rating and a review text.');
        return;
    }
    try {
      await addReview(id, newReview);
      setNewReview({ rating: 0, review_text: '' });
      fetchBookDetails();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review.');
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">&larr; Back to Books</Link>
      <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
      <p className="text-xl text-gray-600 mt-1">by {book.author}</p>
      <p className="text-md text-gray-500 bg-gray-200 inline-block px-3 py-1 rounded-full my-4">{book.genre}</p>
      <div className="flex items-center mb-6">
        <Rating value={book.averageRating} />
        <span className="ml-3 text-lg text-gray-700">{book.averageRating > 0 ? `${book.averageRating} average rating` : 'No ratings yet'}</span>
      </div>

      <hr className="my-8" />

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="flex items-center mb-2">
                  <Rating value={review.rating} />
                  <strong className="ml-3">{review.user.username}</strong>
                </div>
                <p className="text-gray-700">{review.review_text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet. Be the first to write one!</p>
        )}
      </div>

      {/* Add Review Form */}
      {isAuthenticated && !hasUserReviewed && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Write a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Rating</label>
              <select name="rating" value={newReview.rating} onChange={handleReviewChange} className="p-2 border border-gray-300 rounded">
                <option value="0" disabled>Select a rating</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                name="review_text"
                value={newReview.review_text}
                onChange={handleReviewChange}
                rows="4"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Share your thoughts on this book..."
              ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Submit Review</button>
          </form>
        </div>
      )}
       {isAuthenticated && hasUserReviewed && (
          <p className="mt-8 bg-green-100 text-green-800 p-3 rounded-md">You've already reviewed this book.</p>
       )}
    </div>
  );
};

export default BookDetailPage;