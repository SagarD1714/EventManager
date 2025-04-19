import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../Modules/Api';
import Loader from '../../assets/Loader';

const Eventdata = () => {
    const api = Api;
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);
    const [TOKEN, setToken] = useState();
    const [user, setUser] = useState();


    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            const token = user?.TOKEN;
            const username = user?.result?.username;

            if (token && typeof username === 'string') {
                setUser(username);
                setToken(token);
                // setRenderpage(true);
                console.log('Token and username found');
            } else {
                // setRenderpage(false);
                alert('Please login');
                // navigate('/admin');
            }
        } else {
            // setRenderpage(false);
            alert('Please login');
            // navigate('/admin');
        }
    },);



    // Function to fetch from server and cache
    const FetchData = async () => {
        const page = 0;
        setIsLoading(true);

        try {
            const response = await axios.get(`${api}event`, {
                params: { page },
                headers: {
                    // TOKEN: TOKEN,
                    // USERNAME: user
                },
            });

            const data = response.data.result || [];

            // Store to localStorage
            localStorage.setItem('cachedEvents', JSON.stringify(data));

            // Then load from localStorage
            const cached = localStorage.getItem('cachedEvents');
            if (cached) {
                setEvents(JSON.parse(cached));
            }
        } catch (error) {
            console.error('Error fetching data:', error.response?.data || error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Load from localStorage on first load
    useEffect(() => {
        const cached = localStorage.getItem('cachedEvents');
        if (cached) {
            setEvents(JSON.parse(cached));
        }
    }, []);

    // Dummy delete function for now
    const DeleteEvent = (id, coverImage) => async () => {

        const cnf = confirm("Are you sure to delete ?");
        if (cnf) {
            console.log('Deleting event:', id, coverImage);

            const formData = new FormData();
            formData.append('id', id);
            formData.append('coverImage', coverImage);

            try {
                const response = await axios.delete(api + 'event', {
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'TOKEN': TOKEN,
                        'USERNAME': user
                    }
                });

                console.log('Deleted successfully:', response.data);
                FetchData();
                // Optionally refresh events here
            } catch (error) {
                console.error('Delete failed:', error.response?.data || error.message);
            }
        }
    };


    return (
        <div className="font-sans font-semibold py-6 px-4 min-h-screen bg-gray-50">
  {/* Refresh Button */}
  <button
    className="border border-blue-400 text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform px-5 py-2 rounded-md shadow-md mb-6"
    onClick={FetchData}
  >
    Refresh
  </button>

  {/* Loader */}
  {isLoading ? (
    <Loader />
  ) : (
    <div className="overflow-auto h-[78vh] space-y-6 pr-2">
      {events.map((event, index) => (
        <div
          key={event.id || index}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 rounded-xl border border-gray-200 shadow-sm bg-white hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <img
            src={event.coverImage}
            alt="event-thumbnail"
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />

          {/* Event Info */}
          <div className="flex-1 min-w-[200px] space-y-2 text-sm text-gray-800">
            <p>
              <span className="font-medium text-gray-500">Pin Code:</span>{' '}
              <span className="text-gray-700">{event.pincode}</span>
            </p>
            <p>
              <span className="font-medium text-gray-500">Title:</span>{' '}
              <span className="text-gray-700">{event.title}</span>
            </p>
            <p>
              <span className="font-medium text-gray-500">Date:</span>{' '}
              <span className="text-gray-700">
                {event.startDate} - {event.endDate}
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-500">Location:</span>{' '}
              <span className="text-gray-700">{event.location}</span>
            </p>
            <div>
              <p className="font-medium text-gray-500 mb-1">Description:</p>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300 bg-gray-50"
                value={event.description}
                readOnly
                rows={2}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 self-stretch md:self-auto">
            {/* <button className="border border-blue-500 text-blue-600 bg-white hover:bg-blue-100 active:scale-95 transition-transform px-4 py-1 rounded-md">
              Edit
            </button> */}
            <button
              className="border border-red-500 text-red-600 bg-white hover:bg-red-100 active:scale-95 transition-transform px-4 py-1 rounded-md"
              onClick={DeleteEvent(event.id, event.coverImage)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>
    );
};

export default Eventdata;
