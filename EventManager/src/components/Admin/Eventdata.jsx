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
    };


    return (
        <div className="font-sans font-semibold py-6 min-h-screen">
            {/* Refresh Button */}
            <button
                className="border border-gray-400 text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform px-4 py-2 rounded shadow-sm mb-4"
                onClick={FetchData}
            >
                Refresh
            </button>

            {/* Loader */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className="overflow-auto h-[78vh] space-y-4">
                    {events.map((event, index) => (
                        <div
                            key={event.id || index}
                            className="border border-gray-300 bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-4"
                        >
                            {/* Thumbnail */}
                            <img
                                src={event.coverImage}
                                alt="event-thumbnail"
                                className="w-20 h-20 object-cover rounded border border-gray-300"
                            />

                            {/* Event Info */}
                            <div className="flex-1 min-w-[200px] break-words whitespace-pre-line">
                                <p>
                                    Pin Code: <strong className="text-gray-700">{event.pincode}</strong>
                                </p>
                                <p>
                                    Event Title: <strong className="text-gray-700">{event.title}</strong>
                                </p>
                                <p>
                                    Event Date:{' '}
                                    <strong className="text-gray-700">
                                        {event.startDate} - {event.endDate}
                                    </strong>
                                </p>
                                <p>
                                    Event Location:{' '}
                                    <strong className="text-gray-700">{event.location}</strong>
                                </p>

                                <p className="mt-2 mb-1 font-medium">Event Description:</p>
                                <textarea
                                    className="w-full border border-gray-300 rounded p-2 text-gray-700 resize-y focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    value={event.description}
                                    readOnly
                                    rows={1}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <button className="border border-blue-500 text-blue-600 bg-white hover:bg-blue-100 active:scale-95 transition-transform px-3 py-1 rounded">
                                    Edit
                                </button>
                                <button
                                    className="border border-red-500 text-red-600 bg-white hover:bg-red-100 active:scale-95 transition-transform px-3 py-1 rounded"
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
