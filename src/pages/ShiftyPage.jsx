import React, { useState } from 'react';
import { FiPlus, FiClock, FiBookOpen, FiCalendar, FiMapPin, FiActivity, FiCoffee, FiStar, FiAlertCircle } from 'react-icons/fi';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import ActivityForm from '../components/ActivityForm';
import ActivityDetails from '../components/ActivityDetails';

const ShiftyPage = () => {
  // Sample data - in a real app, this would come from a database
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: 'Morning Exercise',
      time: '06:30 - 07:30',
      category: 'Fitness',
      icon: <FiActivity className="text-green-500" />,
      date: 'Today',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Work',
      time: '09:00 - 17:00',
      category: 'Work',
      icon: <FiCoffee className="text-blue-500" />,
      date: 'Today',
      status: 'active'
    },
    {
      id: 3,
      title: 'Sports',
      time: '17:00 - 18:00',
      category: 'Fitness',
      icon: <FiActivity className="text-green-500" />,
      date: 'Today',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Learning',
      time: '19:15 - 20:15',
      category: 'Education',
      icon: <FiBookOpen className="text-purple-500" />,
      date: 'Today',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Morning Run',
      time: '07:00 - 08:00',
      category: 'Fitness',
      icon: <FiActivity className="text-green-500" />,
      date: 'Tomorrow',
      status: 'planned'
    }
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

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

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'fitness':
        return <FiActivity className="mr-2 flex-shrink-0 text-green-500" />;
      case 'work':
        return <FiCoffee className="mr-2 flex-shrink-0 text-blue-500" />;
      case 'education':
        return <FiBookOpen className="mr-2 flex-shrink-0 text-purple-500" />;
      default:
        return <FiStar className="mr-2 flex-shrink-0 text-yellow-500" />;
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
    setActivities([...activities, newActivity]);
    setIsAddModalOpen(false);
    showSuccessMessage('Activity added successfully!');
  };

  // Handle updating an activity
  const handleEditSubmit = (updatedActivity) => {
    // Update the activity in the list
    setActivities(activities.map(activity =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    ));
    setIsEditModalOpen(false);
    showSuccessMessage('Activity updated successfully!');
  };

  // Handle deleting an activity
  const handleDeleteActivity = () => {
    if (currentActivity) {
      // Remove the activity from the list
      setActivities(activities.filter(activity => activity.id !== currentActivity.id));
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
            My Daily Planner
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Organize your personal activities and tasks
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="ml-3" onClick={handleAddActivity}>
            <FiPlus className="mr-1" /> Add New Activity
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-soft rounded-lg mb-8">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-5 border border-primary-100 dark:border-primary-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-800 rounded-md p-3">
                  <FiClock className="h-6 w-6 text-primary-600 dark:text-primary-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Today's Activities
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {activities.filter(a => a.date === 'Today').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-secondary-50 dark:bg-secondary-900/20 rounded-lg p-5 border border-secondary-100 dark:border-secondary-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-secondary-100 dark:bg-secondary-800 rounded-md p-3">
                  <FiActivity className="h-6 w-6 text-secondary-600 dark:text-secondary-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Fitness Activities
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {activities.filter(a => a.category === 'Fitness').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-accent-50 dark:bg-accent-900/20 rounded-lg p-5 border border-accent-100 dark:border-accent-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-accent-100 dark:bg-accent-800 rounded-md p-3">
                  <FiCalendar className="h-6 w-6 text-accent-600 dark:text-accent-300" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                      Upcoming Activities
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900 dark:text-white">
                        {activities.filter(a => a.status === 'upcoming' || a.status === 'planned').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Today's Activities</h3>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {activities.filter(a => a.date === 'Today').map((activity) => (
          <Card key={activity.id} hover className="animate-fade-in">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                {activity.icon}
                <span className="ml-2">{activity.title}</span>
              </h3>
              {getStatusBadge(activity.status)}
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiClock className="mr-2 flex-shrink-0" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiCalendar className="mr-2 flex-shrink-0" />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  {getCategoryIcon(activity.category)}
                  <span>{activity.category}</span>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditActivity(activity)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleViewDetails(activity)}
              >
                Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-8 mb-4">Upcoming Activities</h3>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {activities.filter(a => a.date === 'Tomorrow').map((activity) => (
          <Card key={activity.id} hover className="animate-fade-in">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                {activity.icon}
                <span className="ml-2">{activity.title}</span>
              </h3>
              {getStatusBadge(activity.status)}
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiClock className="mr-2 flex-shrink-0" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <FiCalendar className="mr-2 flex-shrink-0" />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  {getCategoryIcon(activity.category)}
                  <span>{activity.category}</span>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditActivity(activity)}
              >
                Edit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleViewDetails(activity)}
              >
                Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Activity Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Activity"
      >
        <ActivityForm
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

export default ShiftyPage;
