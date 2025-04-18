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
    try {
      const formData = new FormData();
      formData.append('pincode', data.pincode);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      formData.append('location', data.location);
      formData.append('title', data.title);
      formData.append('image', data.image[0]);

      console.log(TOKEN, user)
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
      navigate('/admin')
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
        <div className="mx-auto p-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
          <div className='flex justify-around'>
            <div className='w-1/2 h-screen px-6 bg-gray-200 shadow-inner'>
              <Eventdata />
            </div>
            <div>
              <div className="max-w-xl mx-auto/ p-6 bg-white rounded shadow">

                <h2 className="text-2xl font-semibold mb-4">Admin CRUD Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">

                  <input
                    type="number"
                    placeholder="Pin Code"
                    {...register('pincode', { required: 'pincode is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}

                  <input
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.title && <span className="text-red-500">{errors.title.message}</span>}

                  <textarea
                    placeholder="Description"
                    {...register('description', { required: 'Description is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.description && <span className="text-red-500">{errors.description.message}</span>}

                  <input
                    type="text"
                    placeholder="Location"
                    {...register('location', { required: 'Location is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.location && <span className="text-red-500">{errors.location.message}</span>}

                  <label className="block text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    {...register('startDate', { required: 'Start date is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.startDate && <span className="text-red-500">{errors.startDate.message}</span>}

                  <label className="block text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    {...register('endDate', { required: 'End date is required' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.endDate && <span className="text-red-500">{errors.endDate.message}</span>}

                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    {...register('image', { required: 'Image is required' })}
                    className="w-full"
                  />
                  {errors.image && <span className="text-red-500">{errors.image.message}</span>}

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                    onClick={() => navigate('/reset')}
                  >
                    Reset Password
                  </button>
                  <button
                    type="button"
                    onClick={Logout}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
                  >
                    Log out
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>}
    </div>
  );
};

export default AdminForm;
