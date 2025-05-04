import React from 'react';
import { FiClock, FiCalendar, FiTag, FiInfo } from 'react-icons/fi';
import Badge from './Badge';
import Button from './Button';

const ActivityDetails = ({ activity, onEdit, onDelete, onClose }) => {
  if (!activity) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'upcoming':
        return <Badge variant="primary">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="gray">Completed</Badge>;
      case 'planned':
        return <Badge variant="info">Planned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          {activity.icon}
          <span className="ml-2">{activity.title}</span>
        </h2>
        {getStatusBadge(activity.status)}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <FiClock className="mr-2 flex-shrink-0" />
          <span className="font-medium">Time:</span>
          <span className="ml-2">{activity.time}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <FiCalendar className="mr-2 flex-shrink-0" />
          <span className="font-medium">Date:</span>
          <span className="ml-2">{activity.date}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <FiTag className="mr-2 flex-shrink-0" />
          <span className="font-medium">Category:</span>
          <span className="ml-2">{activity.category}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
          <FiInfo className="mr-2 flex-shrink-0" />
          <span className="font-medium">Status:</span>
          <span className="ml-2">{activity.status}</span>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="danger" size="sm" onClick={onDelete}>
          Delete Activity
        </Button>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" size="sm" onClick={onEdit}>
            Edit Activity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
