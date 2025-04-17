import React, { useState } from 'react';
import Nav from '../Nav';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-purple-700 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
