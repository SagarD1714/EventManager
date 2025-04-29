import React, { useState } from 'react';
import Nav from '../Nav';
import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';
import Api from '../Modules/Api';
import Loader from '../../assets/Loader';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const api = Api;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Login data:', formData);
    try {
      const response = await axios.post(api + 'login', formData);
      console.log('Login success:', response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      setTimeout(() => navigate('/admin-page'), 100);
      // navigate('/admin-page');
      // You can store token, redirect, etc. here
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      // Optional: Show error message to the user
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // get Method ********************* Starts

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Login data:', formData);

  //   // Convert formData to query string format
  //   const params = new URLSearchParams(formData).toString();

  //   try {
  //     // Send GET request with query parameters
  //     const response = await axios.get(`${api}login?${params}`);
  //     console.log('Login success:', response.data);
  //     // You can store token, redirect, etc. here
  //   } catch (error) {
  //     console.error('Login error:', error.response?.data || error.message);
  //     // Optional: Show error message to the user
  //   }
  // };

  // get Method ********************* Ends


  return (
    <div className="login-page min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-700">Welcome Back</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
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
          {/* <p className="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-purple-700 hover:underline">
              Sign Up
            </Link>

          </p> */}
        </div>
      </main>
      {loading &&
        <div className='h-screen w-screen absolute bg-white opacity-50 z-10 '>
          <Loader />
        </div>
      }
    </div>
  );
};

export default Login;
