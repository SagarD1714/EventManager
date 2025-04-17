import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Api from '../Modules/Api';

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
      formData.append('name', data.name);
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
          'USERNAME':user
        }
      });

      console.log('Success:', response.data);
      alert('Data submitted successfully!');
      reset();
    } catch (error) {
      console.error('Submit Error:', error.response?.data || error.message);
    }
  };

  return (
    <div>

      {renderpage &&
        <div className="mx-auto p-6 bg-white">
          <div className='flex justify-between/'>
            <div className='w-1/2 h-screen p-6 bg-gray-200 shadow-inner'>
              All Event Data's
            </div>
            <div>
              <div className="max-w-xl mx-auto/ p-6 bg-white rounded shadow">

                <h2 className="text-2xl font-semibold mb-4">Admin CRUD Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">

                  <input
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required' })}
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
                  >
                    Reset Password
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
