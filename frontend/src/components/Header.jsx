import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">BookReview</Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/add-book" className="text-gray-600 hover:text-blue-600">Add Book</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Sign Up</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;