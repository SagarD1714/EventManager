import React, { useEffect, useState } from 'react';

// Separated component for individual event cards
const EventCard = ({ event }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div key={event.id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
      <p className="text-gray-600 text-sm">{event.description}</p>
      <p className="text-sm mt-2">
        <span className="font-semibold">Start:</span> {event.startDate}
      </p>
      <p className="text-sm">
        <span className="font-semibold">End:</span> {event.endDate}
      </p>

      {event.coverImage && (
        <div className="relative w-full h-40 mt-2">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg animate-pulse">
              <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin" />
            </div>
          )}
          <img
            src={event.coverImage}
            alt="Cover"
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`rounded-lg w-full h-40 object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      )}
    </div>
  );
};

const EventInfo = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [view, setView] = useState('summary'); // 'summary', 'all', 'current', 'upcoming'

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('cachedEvents')) || [];
    setEvents(storedEvents);

    const today = new Date().toISOString().split('T')[0];

    const current = storedEvents.find(
      (event) => today >= event.startDate && today <= event.endDate
    );
    setCurrentEvent(current);

    const upcoming = storedEvents
      .filter((event) => event.startDate > today)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    setUpcomingEvents(upcoming);
  }, []);

  const renderSection = () => {
    switch (view) {
      case 'all':
        return (
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        );
      case 'current':
        return currentEvent ? (
          <div className="mt-6">
            <EventCard event={currentEvent} />
          </div>
        ) : (
          <p className="text-center text-yellow-600 mt-6">No current event available.</p>
        );
      case 'upcoming':
        return upcomingEvents.length ? (
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-yellow-600 mt-6">No upcoming events available.</p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">📅 Event Dashboard</h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-blue-500">
          <h2 className="text-lg font-semibold text-gray-700">Total Events</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{events.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-green-500">
          <h2 className="text-lg font-semibold text-gray-700">Current Event</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{currentEvent ? 1 : 0}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-t-4 border-yellow-500">
          <h2 className="text-lg font-semibold text-gray-700">Upcoming Events</h2>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{upcomingEvents.length}</p>
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button
          onClick={() => setView('all')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded shadow cursor-pointer"
        >
          View All Events
        </button>
        <button
          onClick={() => setView('current')}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded shadow cursor-pointer"
        >
          View Current Event
        </button>
        <button
          onClick={() => setView('upcoming')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded shadow cursor-pointer"
        >
          View Upcoming Events
        </button>
        <button
          onClick={() => setView('summary')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded shadow cursor-pointer"
        >
          Hide Details
        </button>
      </div>

      {/* Render Selected View */}
      {renderSection()}
    </div>
  );
};

export default EventInfo;
