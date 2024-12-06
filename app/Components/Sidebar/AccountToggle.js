import React from 'react';
import { useUserAuth } from '../../_utils/auth-context'; // Adjust the import path as necessary
import { FaSignOutAlt } from 'react-icons/fa'; // Import the sign-out icon

export const AccountToggle = () => {
  const { user, firebaseSignOut } = useUserAuth();

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
      <div className='flex justify-between items-center'>
        <div className='flex p-0.5 rounded relative gap-2 items-center'>
          <img
            src={user.photoURL || '/default-avatar.png'} // Provide a fallback image
            alt={user.displayName || 'User'} // Provide a fallback alt text
            className='size-8 rounded shrink-0 bg-green-200 shadow'
          />
          <div className='text-start'>
            <span className='text-sm font-semibold block'>{user.displayName || 'User'}</span>
            <span className='text-xs block text-stone-500'>{user.email || 'N/A'}</span>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className='flex text-xs hover:text-red-600 rounded transition duration-300 ease-in-out'
        >
          <FaSignOutAlt className='text-xl' />
        </button>
      </div>
    </div>
  );
};
