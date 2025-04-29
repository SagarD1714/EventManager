import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Api from '../Modules/Api';
import Eventdata from './Eventdata';

const AdminForm = () => {
  const [renderpage, setRenderpage] = useState(false);
  const [TOKEN, setToken] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate()
  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const token = user?.TOKEN;
      const username = user?.result?.username;

      if (token && typeof username === 'string') {
        setUser(username);
        setToken(token);
        setRenderpage(true);
        console.log('Token and username found');
      } else {
        setRenderpage(false);
        alert('Please login');
        navigate('/admin');
      }
    } else {
      setRenderpage(false);
      alert('Please login');
      navigate('/admin');
    }
  }, [navigate]);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    // ✅ Check if endDate is earlier than startDate
    if (new Date(data.endDate) <= new Date(data.startDate)) {
      alert('End date cannot be earlier or equal to start date.');
      return; // 🚫 Prevent API call
    }
  
    try {
      const formData = new FormData();
      formData.append('pincode', data.pincode);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('location', data.location);
      formData.append('title', data.title);
      formData.append('image', data.image[0]);
  
      console.log(TOKEN, user);
      const api = Api;
      const response = await axios.post(api + 'event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'TOKEN': TOKEN,
          'USERNAME': user
        }
      });
  
      console.log('Success:', response.data);
      alert('Data submitted successfully!');
      reset();
    } catch (error) {
      console.error('Submit Error:', error.response?.data || error.message);
      alert('please relogin');
      navigate('/admin');
    }
  };
  

  const Logout = () => {
    // Clear localStorage/sessionStorage if you use it for auth

    const conf = confirm("Are you sure to Log out ?")
    if (conf) {
      sessionStorage.clear()
      localStorage.clear()
      // Optionally display a message
      alert('You have been logged out!')
      // Redirect to login or home page
      navigate('/')
    }
  }

  return (
    <div className=''>

      {renderpage &&
        <div className="mx-auto p-2 bg-gray-700">
          <div className='flex justify-around'>
            
            <div>
            <div className="fixed top-0 left-0 h-screen w-full max-w-md p-6 bg-white overflow-y-auto">

              <h2 className="text-2xl font-bold text-center text-gray-800">Add New Event</h2>

              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">

                <input
                  type="number"
                  placeholder="Pin Code"
                  {...register('pincode', { required: 'Pincode is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.pincode && <span className="text-red-500 text-sm">{errors.pincode.message}</span>}

                <input
                  type="text"
                  placeholder="Title"
                  {...register('title', { required: 'Title is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                <textarea
                  placeholder="Description"
                  {...register('description', { required: 'Description is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

                <input
                  type="text"
                  placeholder="Location"
                  {...register('location', { required: 'Location is required' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.location && <span className="text-red-500 text-sm">{errors.location.message}</span>}

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Start Date</label>
                  <input
                    type="date"
                    {...register('startDate', { required: 'Start date is required' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">End Date</label>
                  <input
                    type="date"
                    {...register('endDate', { required: 'End date is required' })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.endDate && <span className="text-red-500 text-sm">{errors.endDate.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-600">Upload Image</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    {...register('image', { required: 'Image is required' })}
                    className="w-full text-gray-700"
                  />
                  {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500"
                >
                  Submit
                </button>

                {/* Reset Password Button */}
                <button
                  type="button"
                  onClick={() => navigate('/reset')}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-500"
                >
                  Reset Password
                </button>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={Logout}
                  className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-red-500 hover:via-pink-500 hover:to-yellow-500 transition-all duration-500"
                >
                  Log out
                </button>
                
              </form>
              </div>


            </div>
            <div className="flex-1 h-screen bg-white shadow-inner px-6 overflow-hidden ml-120">
              <div className="h-full overflow-y-auto min-w-[300px] w-full">
                <Eventdata />
              </div>
            </div>

          </div>
        </div>}
    </div>
  );
};

export default AdminForm;
