import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { signup as signupApi } from '../services/api';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await signupApi(formData);
      login(data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
          <input type="text" name="username" id="username" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input type="email" name="email" id="email" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">Sign Up</button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;