import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ShiftyPage from './pages/ShiftyPage';
import SchedulePage from './pages/SchedulePage';
import ShiftOrganizerPage from './pages/ShiftOrganizerPage';

function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<ShiftyPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/shifts" element={<ShiftOrganizerPage />} />
          </Routes>
        </main>
        <footer className="bg-white dark:bg-gray-800 shadow-soft py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} MyPlanner - Personal Activity Scheduler. All rights reserved.
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
