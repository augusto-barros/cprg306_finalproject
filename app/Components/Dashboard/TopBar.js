import React from 'react';
import { useUserAuth } from '../../_utils/auth-context';

export const TopBar = () => {
  const { user } = useUserAuth();

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
      <div className='flex items-center justify-between p-0.5'>
        <span className='text-sm font-bold text-black'>
            Welcome, {user ? user.displayName : 'Guest'} 🚀
            <span className='text-xs block text-stone-400'>
            {currentDate}
            </span>
        </span>

        
      </div>
    </div>
  );
};

export default TopBar;
