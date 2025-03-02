import React from 'react';
import { Sun, Moon, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold dark:text-white">Task Manager</h1>
      
      <div className="flex items-center gap-4">
        {currentUser && (
          <div className="flex items-center">
            <div className="hidden md:block">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, <span className="font-medium text-gray-800 dark:text-gray-200">{currentUser.name}</span>
              </p>
            </div>
            <button
              onClick={logout}
              className="ml-3 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={20} />
            </button>
          </div>
        )}
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="text-white" size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;