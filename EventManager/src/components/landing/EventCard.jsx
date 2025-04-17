import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import confetti from 'canvas-confetti';

const colors = [
  'text-yellow-400',
  'text-purple-500',
  'text-pink-500',
  'text-blue-400',
  'text-green-500',
  'text-red-400',
];

const EventCard = ({ event }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [randomColor, setRandomColor] = useState('');
  const [hovered, setHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setRandomColor(color);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % event.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [event.images.length]);

  useEffect(() => {
    const countdown = setInterval(() => {
      const diff = new Date(event.date) - new Date();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(countdown);
  }, [event.date]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Party popper effect at the top of the card
    confetti({
      particleCount: 100,
      spread: 70, // Adjust the origin to make confetti appear at the top
    });
  };

  return (
    <div
    className={`w-full sm:w-[40%] bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-col justify-between transition-transform hover:scale-[1.01] 
      hover:shadow-[0_4px_15px_${randomColor}]`}>
  
    {/* Image Container */}
    <div className="aspect-[16/9] w-full overflow-hidden rounded-xl mb-4">
      <img
        src={event.images[currentImage]}
        alt="event"
        className="w-full h-full object-cover transition-all duration-300"
      />
    </div>
  
    {/* Title */}
    <h2 className={`text-2xl font-semibold mb-2 ${randomColor}`}>{event.title}</h2>
  
    {/* Description */}
    <p
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-gray-600 text-sm overflow-hidden transition-all duration-300 h-12 hover:h-auto"
    >
      {hovered ? event.description : `${event.description.slice(0, 80)}...`}
    </p>
  
    {/* Date & Timer */}
    <div className="mt-4 flex items-center justify-between text-sm">
      <div className="text-gray-600">
        <p className="font-medium">Event Date:</p>
        <p>{new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">Starts In:</p>
        <p>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </div>
    </div>
  
    {/* Distance & Cost */}
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
      <p>Distance: <span className="font-medium">{event.distance} km</span></p>
      <p>Cost: <span className="font-medium">₹{event.cost}</span></p>
    </div>
  
    {/* Favorite Button */}
    <div className="mt-4 text-right">
      <button onClick={handleFavorite} className="text-red-500 text-xl">
        {isFavorite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  </div>
  
  );
};

export default EventCard;
