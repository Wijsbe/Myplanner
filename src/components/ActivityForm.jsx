import React, { useState, useEffect } from 'react';
import { FiActivity, FiBookOpen, FiCoffee, FiStar } from 'react-icons/fi';
import Button from './Button';

const ActivityForm = ({ activity, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Fitness',
    date: 'Today',
    startTime: '09:00',
    endTime: '10:00',
    status: 'upcoming',
  });

  useEffect(() => {
    if (activity) {
      // If editing an existing activity, populate the form
      const [startTime, endTime] = activity.time.split(' - ');
      setFormData({
        title: activity.title,
        category: activity.category,
        date: activity.date,
        startTime,
        endTime,
        status: activity.status,
      });
    }
  }, [activity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the activity object from form data
    const newActivity = {
      id: activity ? activity.id : Date.now(), // Use existing ID or create a new one
      title: formData.title,
      time: `${formData.startTime} - ${formData.endTime}`,
      category: formData.category,
      date: formData.date,
      status: formData.status,
      icon: getCategoryIcon(formData.category),
    };
    
    onSubmit(newActivity);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'fitness':
        return <FiActivity className="text-green-500" />;
      case 'work':
        return <FiCoffee className="text-blue-500" />;
      case 'education':
        return <FiBookOpen className="text-purple-500" />;
      default:
        return <FiStar className="text-yellow-500" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Activity Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="Enter activity title"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="Fitness">Fitness</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date
          </label>
          <select
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Start Time
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            End Time
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
        >
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
        </select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {activity ? 'Update Activity' : 'Add Activity'}
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
