import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const predefinedDistances = {
  'Pune-Mumbai': 150,
  'Mumbai-Nashik': 170,
  'Delhi-Agra': 220,
};

const Expense = () => {
  const location = useLocation();
  const destination = location.state?.location || '';

  const [source, setSource] = useState('');
  const [distance, setDistance] = useState('');
  const [headcount, setHeadcount] = useState(1);
  const [calculated, setCalculated] = useState(false);

  const CAR_RATE = 10;
  const BUS_RATE = 5;
  const PUBLIC_RATE = 3;

  const autoDetectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = `${pos.coords.latitude}, ${pos.coords.longitude}`;
        setSource(coords);
      },
      () => {
        alert("Location access denied.");
      }
    );
  };

  const handleCalculate = () => {
    if (!distance) {
      const key = `${source}-${destination}`;
      const reverseKey = `${destination}-${source}`;
      const dist = predefinedDistances[key] || predefinedDistances[reverseKey];
      if (dist) {
        setDistance(dist);
      } else {
        alert('Distance not found. Enter it manually or add to the list.');
        return;
      }
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
              placeholder="Enter your location"
            />
            <button
              onClick={autoDetectLocation}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Auto Detect Location
            </button>
          </div>

          <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
            <h2 className="text-lg font-bold text-blue-700">Destination</h2>
            <p className="text-xl text-blue-900">{destination}</p>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Distance (in km):</label>
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              placeholder="Enter distance manually or leave blank"
              min={0}
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
