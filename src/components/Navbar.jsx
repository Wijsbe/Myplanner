import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSun, FiMoon, FiList, FiCalendar, FiActivity, FiClock, FiTarget } from 'react-icons/fi';
import logo from '../assets/logo.svg';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={logo} alt="Shifty Logo" />
              <span className="ml-2 text-xl font-bold text-primary-600 dark:text-primary-400">
                MyPlanner
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-primary-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <FiList className="mr-1" /> Activities
              </Link>
              <Link
                to="/schedule"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/schedule')
                    ? 'border-primary-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <FiCalendar className="mr-1" /> Schedule
              </Link>
              <Link
                to="/shifts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/shifts')
                    ? 'border-primary-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <FiClock className="mr-1" /> Shift Organizer
              </Link>
              <Link
                to="/workouts"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/workouts')
                    ? 'border-primary-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
                }`}
              >
                <FiActivity className="mr-1" /> Workout Planner
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FiSun className="h-5 w-5 text-accent-400" />
              ) : (
                <FiMoon className="h-5 w-5 text-primary-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          <Link
            to="/"
            className={`flex justify-center items-center px-2 py-2 rounded-md text-sm font-medium ${
              isActive('/')
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FiList className="mr-1" /> Activities
          </Link>
          <Link
            to="/schedule"
            className={`flex justify-center items-center px-2 py-2 rounded-md text-sm font-medium ${
              isActive('/schedule')
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FiCalendar className="mr-1" /> Schedule
          </Link>
          <Link
            to="/shifts"
            className={`flex justify-center items-center px-2 py-2 rounded-md text-sm font-medium ${
              isActive('/shifts')
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FiClock className="mr-1" /> Shifts
          </Link>
          <Link
            to="/workouts"
            className={`flex justify-center items-center px-2 py-2 rounded-md text-sm font-medium ${
              isActive('/workouts')
                ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <FiActivity className="mr-1" /> Workouts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
