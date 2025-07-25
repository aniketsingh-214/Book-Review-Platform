import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

const AddBookPage = () => {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await addBook(formData);
      navigate(`/books/${data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add a New Book</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
          <input type="text" name="title" id="title" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="author">Author</label>
          <input type="text" name="author" id="author" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="genre">Genre</label>
          <input type="text" name="genre" id="genre" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;