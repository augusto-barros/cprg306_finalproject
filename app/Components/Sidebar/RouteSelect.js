import React, { useState } from 'react';
import { FaTachometerAlt, FaAppleAlt } from 'react-icons/fa';
import { FaCalendar } from 'react-icons/fa';

export const RouteSelect = () => {
  const [selectedRoute, setSelectedRoute] = useState('Dashboard');

  const handleRouteChange = (route) => {
    setSelectedRoute(route);
  };

  return (
    <div className='space-y-4'>
      <button
        onClick={() => handleRouteChange('Dashboard')}
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selectedRoute === 'Dashboard'
            ? 'bg-white text-stone-950 shadow'
            : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
        }`}
      >
        <FaTachometerAlt className='text-lg' /> {/* Dashboard Icon */}
        Dashboard
      </button>
      <button
        onClick={() => handleRouteChange('Calories Tracker')}
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selectedRoute === 'Calories Tracker'
            ? 'bg-white text-stone-950 shadow'
            : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
        }`}
      >
        <FaAppleAlt className='text-lg' /> {/* Calories Tracker Icon */}
        Calories Tracker
      </button>
      <button
        onClick={() => handleRouteChange('Calendar')}
        className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
          selectedRoute === 'Calendar'
            ? 'bg-white text-stone-950 shadow'
            : 'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none'
        }`}
      >
        <FaCalendar className='text-lg' /> {/* Calendar Icon */}
        Calendar
      </button>
    </div>
  );
};