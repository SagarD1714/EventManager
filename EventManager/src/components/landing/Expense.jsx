import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Expense = () => {
    const location = useLocation();
    const destination = location.state?.location || ''; // Fetch destination from props

    const [source, setSource] = useState('');
    const [sourceName, setSourceName] = useState(''); // To store the source place name
    const [destinationName, setDestinationName] = useState(destination); // Destination fetched from props
    const [distance, setDistance] = useState(''); 
    const [headcount, setHeadcount] = useState(1);
    const [calculated, setCalculated] = useState(false);

    const CAR_RATE = 10;
    const BUS_RATE = 5;
    const PUBLIC_RATE = 3;

    const handleCalculate = () => {
        if (!source || !destinationName || !distance) {
            alert("Source, Destination, and Distance cannot be empty.");
            return;
        }

        setCalculated(true);
    };

    const calculateExpense = (rate) => {
        return distance ? (distance * rate * headcount).toFixed(2) : 0;
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                Travel Expense Calculator
            </h1>

            <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
                <div className="grid gap-4">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Source Location:</label>
                        <input
                            type="text"
                            className="w-full border px-3 py-2 rounded"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder="Enter source location (e.g., New York)"
                        />
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
                        <h2 className="text-lg font-bold text-blue-700">Destination</h2>
                        <p className="text-xl text-blue-900">{destinationName}</p>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Distance (in km):</label>
                        <input
                            type="number"
                            className="w-full border px-3 py-2 rounded"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder="Enter the distance in kilometers"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-1">Headcount:</label>
                        <input
                            type="number"
                            className="w-24 border px-2 py-1 rounded"
                            value={headcount}
                            onChange={(e) => setHeadcount(Number(e.target.value))}
                            min={1}
                        />
                    </div>

                    <button
                        onClick={handleCalculate}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Calculate Expense
                    </button>
                </div>

                {/* Display the distance once calculated */}
                {calculated && distance ? (
                    <div className="mt-6 text-center text-gray-700 text-lg">
                        <p>Total Distance: {distance} km</p>
                    </div>
                ) : null}

                {calculated && distance ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-green-100 p-4 rounded-xl text-center shadow-md">
                            <h2 className="text-xl font-semibold text-green-800">Car</h2>
                            <p className="text-lg">₹{calculateExpense(CAR_RATE)}</p>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-xl text-center shadow-md">
                            <h2 className="text-xl font-semibold text-yellow-800">Bus</h2>
                            <p className="text-lg">₹{calculateExpense(BUS_RATE)}</p>
                        </div>
                        <div className="bg-purple-100 p-4 rounded-xl text-center shadow-md">
                            <h2 className="text-xl font-semibold text-purple-800">Public Transport</h2>
                            <p className="text-lg">₹{calculateExpense(PUBLIC_RATE)}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Expense;
