import React from 'react';
import { BellIcon, MenuIcon, MoonIcon, SunIcon, SearchIcon, LogOutIcon } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}
const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  darkMode,
  toggleDarkMode
}) => {

  return <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center">
      <button onClick={toggleSidebar} className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
        <MenuIcon size={20} className="text-gray-500 dark:text-gray-400" />
      </button>
      <div className="hidden md:flex items-center rounded-md bg-gray-100 dark:bg-gray-700">
        <SearchIcon size={18} className="ml-3 text-gray-500 dark:text-gray-400" />
        <input type="text" placeholder="Search..." className="w-64 px-3 py-1.5 text-sm bg-transparent border-none focus:outline-none text-gray-700 dark:text-gray-300" />
      </div>
    </div>
    <div className="flex items-center space-x-3">
      <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <BellIcon size={20} className="text-gray-500 dark:text-gray-400" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        {darkMode ? <SunIcon size={20} className="text-gray-500 dark:text-gray-400" /> : <MoonIcon size={20} className="text-gray-500" />}
      </button>
      <div className="relative group">
        <button className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
            A
          </div>
        </button>
        <div className="absolute right-0 mt-2 w-48 py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              name
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              email
            </p>
          </div>
          <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <LogOutIcon size={16} className="mr-2" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  </header>;
};
export default Header;