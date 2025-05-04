import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiPlus, FiActivity, FiBookOpen, FiCoffee, FiStar, FiAlertCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import ActivityForm from '../components/ActivityForm';
import ActivityDetails from '../components/ActivityDetails';

const SchedulePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduleData, setScheduleData] = useState([
    {
      id: 1,
      time: '06:30 - 07:30',
      title: 'Morning Exercise',
      category: 'Fitness',
      color: 'primary',
      icon: <FiActivity className="text-green-500" />,
      date: 'Today',
      status: 'completed'
    },
    {
      id: 2,
      time: '09:00 - 17:00',
      title: 'Work',
      category: 'Work',
      color: 'secondary',
      icon: <FiCoffee className="text-blue-500" />,
      date: 'Today',
      status: 'active'
    },
    {
      id: 3,
      time: '17:00 - 18:00',
      title: 'Sports',
      category: 'Fitness',
      color: 'primary',
      icon: <FiActivity className="text-green-500" />,
      date: 'Today',
      status: 'upcoming'
    },
    {
      id: 4,
      time: '19:15 - 20:15',
      title: 'Learning',
      category: 'Education',
      color: 'accent',
      icon: <FiBookOpen className="text-purple-500" />,
      date: 'Today',
      status: 'upcoming'
    },
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const previousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'fitness':
        return 'primary';
      case 'work':
        return 'secondary';
      case 'education':
        return 'accent';
      default:
        return 'gray';
    }
  };

  // Handle opening the add activity modal
  const handleAddActivity = () => {
    setCurrentActivity(null);
    setIsAddModalOpen(true);
  };

  // Handle opening the edit activity modal
  const handleEditActivity = (activity) => {
    setCurrentActivity(activity);
    setIsEditModalOpen(true);
  };

  // Handle opening the details modal
  const handleViewDetails = (activity) => {
    setCurrentActivity(activity);
    setIsDetailsModalOpen(true);
  };

  // Handle opening the delete confirmation modal
  const handleDeleteConfirmation = () => {
    setIsDetailsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  // Handle adding a new activity
  const handleAddSubmit = (newActivity) => {
    // Add the new activity to the list
    setScheduleData([...scheduleData, newActivity]);
    setIsAddModalOpen(false);
    showSuccessMessage('Activity added successfully!');
  };

  // Handle updating an activity
  const handleEditSubmit = (updatedActivity) => {
    // Update the activity in the list
    setScheduleData(scheduleData.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    setIsEditModalOpen(false);
    showSuccessMessage('Activity updated successfully!');
  };

  // Handle deleting an activity
  const handleDeleteActivity = () => {
    if (currentActivity) {
      // Remove the activity from the list
      setScheduleData(scheduleData.filter(activity => activity.id !== currentActivity.id));
      setIsDeleteModalOpen(false);
      showSuccessMessage('Activity deleted successfully!');
    }
  };

  // Show success message and hide it after a delay
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Handle clicking on a timeline slot to add an activity
  const handleTimeSlotClick = (hour) => {
    const startTime = `${hour < 10 ? '0' + hour : hour}:00`;
    const endTime = `${(hour + 1) < 10 ? '0' + (hour + 1) : (hour + 1)}:00`;

    setCurrentActivity({
      title: '',
      time: `${startTime} - ${endTime}`,
      category: 'Personal',
      date: 'Today',
      status: 'upcoming'
    });

    setIsAddModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Success message */}
      {successMessage && (
        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-md animate-fade-in">
          <div className="flex items-center">
            <FiAlertCircle className="mr-2" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      <div className="md:flex md:items-center md:justify-between mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            Daily Schedule
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your daily activities
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="ml-3" onClick={handleAddActivity}>
            <FiPlus className="mr-1" /> Add Activity
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader className="flex items-center justify-between">
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-primary-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {daysOfWeek[currentDate.getDay()]}, {formatDate(currentDate)}
            </h3>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={previousDay}>
              <FiChevronLeft />
            </Button>
            <Button variant="outline" size="sm" onClick={today}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={nextDay}>
              <FiChevronRight />
            </Button>
          </div>
        </CardHeader>
        <CardBody>
          <div className="relative">
            {/* Time indicators */}
            <div className="absolute top-0 bottom-0 left-0 w-20 flex flex-col text-xs text-gray-500 dark:text-gray-400 pointer-events-none">
              {Array.from({ length: 17 }, (_, i) => i + 6).map(hour => (
                <div key={hour} className="h-16 flex items-start pt-1">
                  {hour}:00
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="ml-20 border-l border-gray-200 dark:border-gray-700 relative">
              {/* Time slots */}
              {Array.from({ length: 16 }, (_, i) => i + 6).map(hour => (
                <div
                  key={hour}
                  className="h-16 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  onClick={() => handleTimeSlotClick(hour)}
                ></div>
              ))}

              {/* Activities */}
              {scheduleData.map((item) => {
                const startTime = item.time.split(' - ')[0];
                const endTime = item.time.split(' - ')[1];

                const startHour = parseInt(startTime.split(':')[0]);
                const startMinute = parseInt(startTime.split(':')[1]);

                const endHour = parseInt(endTime.split(':')[0]);
                const endMinute = parseInt(endTime.split(':')[1]);

                const startPosition = (startHour - 6) * 64 + (startMinute / 60) * 64;
                const duration = ((endHour - startHour) * 60 + (endMinute - startMinute)) / 60 * 64;

                return (
                  <div
                    key={item.id}
                    className={`absolute left-0 right-4 ml-1 p-2 rounded-md animate-fade-in shadow-sm border border-${item.color}-200 dark:border-${item.color}-800 bg-${item.color}-50 dark:bg-${item.color}-900/20 cursor-pointer hover:shadow-md transition-shadow`}
                    style={{
                      top: `${startPosition}px`,
                      height: `${duration}px`,
                      left: '20px',
                      right: '0'
                    }}
                    onClick={() => handleViewDetails(item)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {item.icon}
                        <h4 className="ml-2 font-medium text-gray-900 dark:text-white text-sm">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditActivity(item);
                          }}
                        >
                          <FiEdit size={14} />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentActivity(item);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.time}
                      </span>
                      <Badge variant={getCategoryColor(item.category)} size="sm">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {scheduleData.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No activities scheduled for this day
            </div>
          )}
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button variant="outline" size="sm" onClick={handleAddActivity}>
            <FiPlus className="mr-1" /> Add to this day
          </Button>
        </CardFooter>
      </Card>

      <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-5 border border-primary-100 dark:border-primary-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Weekly Overview
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This week's schedule includes activities across different categories
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Fitness</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {scheduleData.filter(a => a.category === 'Fitness').length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Work</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {scheduleData.filter(a => a.category === 'Work').length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Education</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {scheduleData.filter(a => a.category === 'Education').length}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 rounded shadow-sm">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Personal</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {scheduleData.filter(a => a.category === 'Personal').length}
            </div>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Activity"
      >
        <ActivityForm
          activity={currentActivity}
          onSubmit={handleAddSubmit}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Activity Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Activity"
      >
        <ActivityForm
          activity={currentActivity}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Activity Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title="Activity Details"
      >
        <ActivityDetails
          activity={currentActivity}
          onEdit={() => {
            setIsDetailsModalOpen(false);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteConfirmation}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Activity"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this activity? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteActivity}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SchedulePage;
