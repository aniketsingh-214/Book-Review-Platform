import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ genre: '', author: '' });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const params = { page, limit: 10, ...filters };
        if (!params.genre) delete params.genre;
        if (!params.author) delete params.author;

        const { data } = await getBooks(params);
        setBooks(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); 
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Books</h1>
      
      {/* Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="author"
          placeholder="Filter by author..."
          value={filters.author}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
        <input
          type="text"
          name="genre"
          placeholder="Filter by genre..."
          value={filters.genre}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-8 space-x-4">
            {pagination.prev && <button onClick={() => setPage(page - 1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Previous</button>}
            <span className="text-gray-700">Page {page}</span>
            {pagination.next && <button onClick={() => setPage(page + 1)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Next</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
