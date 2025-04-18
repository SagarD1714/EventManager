import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav'; // Assuming you already have a Nav component
import api from './Modules/Api';
import Loader from '../assets/Loader';

const Home = () => {
  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors if any

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api + 'event', {
          params: { page: 0 }, // Sending page=0 as a parameter
        });
        if (response.data?.status) {
          setData(response.data.result); // Assuming the response has a 'result' array
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <Nav />
      <section className="relative">
        {/* Static Color Section (70vh height) */}
        <div className="w-full h-[70vh] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Event Hub</h1>
            <p className="text-lg">Discover exciting events and their details below</p>
          </div>
        </div>

        {/* Content Section with Cards (white background) */}
        <div className="bg-white p-6">
          {/* Loading state */}
          {loading && <div className="flex justify-center items-center h-full"><Loader /></div>}

          {/* Error state */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Display data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((item) => (
                <div className="w-full p-4 shadow-gray-300 shadow-xl">
                  <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                      style={{ maxHeight: '250px' }} // Adjust image size
                    />
                  </div>

                  <h3 className="text-xl font-semibold mt-4">{item.title}</h3>

                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 mt-2 border border-gray-300 rounded-md resize-none"
                      value={item.description}
                      readOnly
                      rows={2} // Adjust the number of rows as per your design
                    />
                  </div>

                  <div className="mt-2 text-sm text-gray-500 flex justify-between items-center">
                    <div>
                      <p>
                        <strong>Start Date:</strong> {new Date(item.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>End Date:</strong> {new Date(item.endDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Location:</strong> {item.location || 'Not available'}
                      </p>
                      <p>
                        <strong>Pincode:</strong> {item.pincode}
                      </p>
                    </div>
                    <div>
                      <button className='bg-blue-500 border-none px-2 py-2 rounded text-white'>
                        Calculate Expenses
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
