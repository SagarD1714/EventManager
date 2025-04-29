import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import api from './Modules/Api';
import Loader from '../assets/Loader';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const navigate = useNavigate();
  
  
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api + 'event', {
          params: { page: 0 },
        });
        if (response.data?.status) {
          setData(response.data.result);
          setFilteredData(response.data.result);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let updatedData = [...data];

    // Search filter
    if (searchQuery) {
      updatedData = updatedData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Month filter
    if (selectedMonth) {
      updatedData = updatedData.filter(item => {
        const eventMonth = new Date(item.startDate).getMonth(); // 0-11
        return eventMonth === parseInt(selectedMonth);
      });
    }

    setFilteredData(updatedData);
  }, [searchQuery, selectedMonth, data]);

  const months = [
    { value: '', label: 'All Months' },
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];

  return (
    <div>
      <Nav />
      <section className="relative">
        <div className="w-full h-[70vh] bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Event Hub</h1>
            <p className="text-lg">Discover exciting events and their details below</p>
          </div>
        </div>

        <div className="bg-white p-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search by title or location"
              className="w-full sm:w-1/2 border border-gray-4 00 p-2 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="w-full sm:w-1/4 border border-gray-300 p-2 rounded-md"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          )}

          {/* Error */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Event Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-black"
                >
                  <div className="relative w-full pb-[56.25%] bg-gray-100">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-black mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-700 line-clamp-3 mb-3">{item.description}</p>

                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <div className="space-y-1">
                        <p><span className="font-medium">Start:</span> {new Date(item.startDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">End:</span> {new Date(item.endDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p><span className="font-medium">Location:</span> {item.location || "Not available"}</p>
                        <p><span className="font-medium">Pincode:</span> {item.pincode}</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => navigate('/expense', { state: { location: item.location } })}
                        className='bg-black text-white border-none px-2 py-2 rounded hover:bg-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-1000'
                      >
                        Calculate Expenses
                      </button>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 col-span-full">No events found</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
