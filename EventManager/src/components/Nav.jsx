import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-white">⚡ EventManager</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">

        {/* <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/enterprise" className="hover:text-gray-300">Contacts</Link>
        <Link to="/pricing" className="hover:text-gray-300">Upcoming Events</Link> */}
        {/* <Link to="/careers" className="hover:text-gray-300">Careers</Link> */}
      </div>

      {/* Auth Buttons */}
      <div className="space-x-4">
      <Link to="/" className="hover:text-gray-300">Home</Link>
        {/* <Link to="/enterprise" className="hover:text-gray-300">Contacts</Link> */}
        <Link to="/pricing" className="hover:text-gray-300">Upcoming Events</Link>
        <Link to="/login" className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200">Log in</Link>
        {/* <Link 
          to="/get-started" 
          className="bg-white text-black font-semibold px-4 py-2 rounded-md hover:bg-gray-200"
        >
          Get started
        </Link> */}
      </div>
    </nav>
  );
};

export default Nav;
