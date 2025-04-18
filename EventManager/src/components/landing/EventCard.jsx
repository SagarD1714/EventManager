import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../Modules/Api';

const EventDisplay = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${api}event`, {
          params: { page: 0 },
        });
        console.log(response.data); // Log the whole response to inspect its structure
        if (response.data?.status) {
          setEvents(response.data.result); // Assuming result contains an array of events
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.length > 0 ? (
          events.map((event, index) => (
            <EventCard key={event._id || index} event={event} /> // Key fallback to index if _id is missing
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No events found.</p>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="relative mb-6">
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
          {event.category || 'General'}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
      </div>

      <p className="text-gray-600 mb-4">{event.description}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div>
          <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
        </div>
        <div>
          <strong>Cost:</strong> ₹{event.cost}
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <div>
          <strong>Distance:</strong> {event.distance} km
        </div>
        <div>
          <strong>Location:</strong> {event.location || 'Not available'}
        </div>
      </div>

      <button className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
        Join Event
      </button>
    </div>
  );
};

export default EventDisplay;
