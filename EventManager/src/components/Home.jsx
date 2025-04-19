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
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}

          {/* Error state */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-black"
                >
                  {/* Image */}
                  <div className="relative w-full pb-[56.25%] bg-gray-100">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>

                    <p className="text-sm text-gray-700 line-clamp-3 mb-3">
                      {item.description}
                    </p>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                    <div className="space-y-1">
                      <p>
                        <span className="font-medium">Start:</span>{" "}
                        {new Date(item.startDate).toLocaleDateString()}
                      </p>
                      <p>
                        <span className="font-medium">End:</span>{" "}
                        {new Date(item.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {item.location || "Not available"}
                      </p>
                      <p>
                        <span className="font-medium">Pincode:</span> {item.pincode}
                      </p>
                    </div>
                  </div>

                    <div className="flex justify-end">
                    <button className='bg-black text-white border-none px-2 py-2 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-1000'>
                        Calculate Expenses
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 col-span-full">
                No data available
              </div>
            )}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Home;
