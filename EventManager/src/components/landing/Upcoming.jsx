import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../Modules/Api';

// const api = 'https://your-api-url.com/api/'; // Replace with your actual API base URL

const Upcoming = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get(api + 'event', {
          params: { page: 0 },
        });

        if (response.data?.status) {
          const today = new Date().toISOString().split('T')[0];

          const filtered = response.data.result.filter(
            (event) => event.startDate > today
          );

          setUpcomingEvents(filtered);
        } else {
          setError('No upcoming events found.');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">📆 Upcoming Events</h1>

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : upcomingEvents.length === 0 ? (
        <p className="text-center text-yellow-600">No upcoming events available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{event.title}</h2>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">Start:</span> {event.startDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">End:</span> {event.endDate}
              </p>

              {event.coverImage && (
                <img
                  src={event.coverImage}
                  alt="Cover"
                  className="mt-3 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming;
