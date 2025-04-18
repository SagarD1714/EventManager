import { React, useState } from 'react'
import axios from 'axios'
import Api from '../Modules/Api'
import Loader from '../../assets/Loader'

const Eventdata = () => {
    const api = Api;
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState([]);

    const FetchData = async () => {
        const page = 0;
        setIsLoading(true); // Start loader

        try {
            const response = await axios.get(`${api}event`, {
                params: { page },
                headers: {
                    // TOKEN: TOKEN,
                    // USERNAME: user
                }
            });

            setEvents(response.data.result); // Store fetched data
            console.log(response.data.result)
        } catch (error) {
            console.error("Error fetching data:", error.response?.data || error.message);
        } finally {
            setIsLoading(false); // Stop loader
        }
    };



    return (
        <div className="font-sans font-semibold py-6  min-h-screen">
            {/* Refresh Button */}
            <button className="border border-gray-400 text-white bg-blue-500 hover:bg-blue-600 active:scale-95 transition-transform px-4 py-2 rounded shadow-sm mb-4"
                onClick={FetchData}
            >
                Refresh
            </button>

            {/* Event Card */}
            {isLoading ? (
                <Loader />
            ) : (
                <div className='overflow-auto h-[78vh]'>

                    <div className="border border-gray-300 bg-white p-6 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p>
                                Event Name: <strong className="text-gray-700">Event 1</strong>
                            </p>
                            <p>
                                Event Title: <strong className="text-gray-700">Event 1</strong>
                            </p>
                            <p>
                                Event Date: <strong className="text-gray-700">2022-01-01</strong>
                            </p>
                            <p>
                                Event Location: <strong className="text-gray-700">Kulai</strong>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button className="border border-blue-500 text-blue-600 bg-white hover:bg-blue-100 active:scale-95 transition-transform px-3 py-1 rounded">
                                Edit
                            </button>
                            <button className="border border-red-500 text-red-600 bg-white hover:bg-red-100 active:scale-95 transition-transform px-3 py-1 rounded">
                                Delete
                            </button>
                        </div>
                    </div>

                </div>
            )}

        </div>
    )
}

export default Eventdata
