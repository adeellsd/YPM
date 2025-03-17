import React from 'react';
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex flex-1">
          <div className="relative w-64">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ypm-light"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center">
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-700">Admin YPM</p>
              <p className="text-xs text-gray-500">admin@ypm.fr</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;