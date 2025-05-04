import React, { useState } from 'react';
import { FiPlus, FiActivity, FiAlertCircle, FiClock, FiTarget, FiAward } from 'react-icons/fi';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import WorkoutForm from '../components/WorkoutForm';
import { presetWorkouts, workoutCategories, exerciseLibrary } from '../data/workoutData';

const WorkoutPlannerPage = () => {
  // State for success messages
  const [successMessage, setSuccessMessage] = useState('');
  // State for modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  // State for user workouts
  const [userWorkouts, setUserWorkouts] = useState([]);

  // Show success message and hide it after a delay
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Get category color
  const getCategoryColor = (categoryId) => {
    const category = workoutCategories.find(cat => cat.id === categoryId);
    return category ? category.color : 'gray';
  };

  // Handle viewing a workout
  const handleViewWorkout = (workout) => {
    setSelectedWorkout(workout);
    setIsViewModalOpen(true);
  };

  // Handle creating a new workout
  const handleCreateWorkout = () => {
    setIsCreateModalOpen(true);
  };

  // Handle submitting a new workout
  const handleWorkoutSubmit = (newWorkout) => {
    setUserWorkouts([...userWorkouts, newWorkout]);
    setIsCreateModalOpen(false);
    showSuccessMessage('Workout created successfully!');
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
            Workout Planner
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create and schedule your workouts with our exercise library
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Button className="ml-3" onClick={handleCreateWorkout}>
            <FiPlus className="mr-1" /> Create Workout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* My Workouts Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              My Workouts
            </h3>
          </CardHeader>
          <CardBody>
            {userWorkouts.length > 0 ? (
              <div className="space-y-3">
                {userWorkouts.map(workout => (
                  <div
                    key={workout.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => handleViewWorkout(workout)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FiActivity className={`text-${getCategoryColor(workout.category)}-500 mr-2`} />
                        <span className="font-medium">{workout.name}</span>
                      </div>
                      <Badge variant={getCategoryColor(workout.category)}>
                        {workoutCategories.find(cat => cat.id === workout.category)?.name}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FiActivity className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-3" />
                <p className="text-gray-500 dark:text-gray-400 mb-3">
                  You haven't created any workouts yet.
                </p>
                <Button size="sm" onClick={handleCreateWorkout}>
                  <FiPlus className="mr-1" /> Create Workout
                </Button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Workout Library Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Workout Library
            </h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Browse our preset workouts for different training styles.
            </p>
            <div className="space-y-3">
              {presetWorkouts.map(workout => (
                <div
                  key={workout.id}
                  className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() => handleViewWorkout(workout)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FiActivity className={`text-${getCategoryColor(workout.category)}-500 mr-2`} />
                      <span className="font-medium">{workout.name}</span>
                    </div>
                    <Badge variant={getCategoryColor(workout.category)}>
                      {workoutCategories.find(cat => cat.id === workout.category)?.name}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                      <FiClock className="mr-1" />
                      <span>{workout.duration} minutes</span>
                      <span className="mx-2">•</span>
                      <FiAward className="mr-1" />
                      <span className="capitalize">{workout.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Create Workout Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Workout"
        size="lg"
      >
        <WorkoutForm
          onSubmit={handleWorkoutSubmit}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* View Workout Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={selectedWorkout?.name || 'Workout Details'}
        size="lg"
      >
        {selectedWorkout && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={getCategoryColor(selectedWorkout.category)} size="lg">
                {workoutCategories.find(cat => cat.id === selectedWorkout.category)?.name}
              </Badge>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <FiClock className="mr-1" />
                <span>{selectedWorkout.duration} minutes</span>
                <span className="mx-2">•</span>
                <FiAward className="mr-1" />
                <span className="capitalize">{selectedWorkout.difficulty}</span>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              {selectedWorkout.description}
            </p>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Exercises</h4>
              <div className="space-y-2">
                {selectedWorkout.exercises.map(exerciseId => {
                  const exercise = exerciseLibrary.find(ex => ex.id === exerciseId);
                  if (!exercise) return null;

                  return (
                    <div key={exercise.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{exercise.name}</span>
                        <Badge variant="gray" size="sm">
                          {exercise.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exercise.description}
                      </p>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {exercise.defaultSets && exercise.defaultReps && (
                          <span>{exercise.defaultSets} sets × {exercise.defaultReps} reps</span>
                        )}
                        {exercise.defaultDuration && (
                          <span>{exercise.defaultDuration} {exercise.defaultDuration >= 60 ? 'seconds' : 'minutes'}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                // Logic to add this workout to user's workouts
                if (!userWorkouts.some(w => w.id === selectedWorkout.id)) {
                  setUserWorkouts([...userWorkouts, selectedWorkout]);
                  showSuccessMessage('Workout added to your collection!');
                  setIsViewModalOpen(false);
                } else {
                  showSuccessMessage('This workout is already in your collection.');
                }
              }}>
                Add to My Workouts
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WorkoutPlannerPage;
