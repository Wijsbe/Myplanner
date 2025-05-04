import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import Button from './Button';
import Badge from './Badge';
import { workoutCategories, exerciseLibrary } from '../data/workoutData';

const WorkoutForm = ({ workout, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'custom',
    description: '',
    duration: 30,
    difficulty: 'beginner',
    exercises: [],
  });

  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    if (workout) {
      // If editing an existing workout, populate the form
      setFormData({
        name: workout.name,
        category: workout.category,
        description: workout.description,
        duration: workout.duration,
        difficulty: workout.difficulty,
        exercises: workout.exercises,
      });
      
      // Populate selected exercises
      const exercises = workout.exercises.map(id => 
        exerciseLibrary.find(ex => ex.id === id)
      ).filter(Boolean);
      
      setSelectedExercises(exercises);
    }
  }, [workout]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExercise = (exercise) => {
    if (!selectedExercises.some(ex => ex.id === exercise.id)) {
      setSelectedExercises([...selectedExercises, exercise]);
      setFormData(prev => ({
        ...prev,
        exercises: [...prev.exercises, exercise.id]
      }));
    }
  };

  const handleRemoveExercise = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(ex => ex.id !== exerciseId));
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(id => id !== exerciseId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create the workout object from form data
    const newWorkout = {
      id: workout ? workout.id : Date.now(), // Use existing ID or create a new one
      ...formData
    };
    
    onSubmit(newWorkout);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Workout Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="Enter workout name"
        />
      </div>

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
          {workoutCategories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          placeholder="Describe your workout"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            min="5"
            max="180"
            required
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Difficulty
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Exercises
        </label>
        
        {/* Selected exercises */}
        {selectedExercises.length > 0 ? (
          <div className="mb-4 space-y-2">
            {selectedExercises.map(exercise => (
              <div key={exercise.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <Badge variant="gray" size="sm" className="ml-2">
                    {exercise.type}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  onClick={() => handleRemoveExercise(exercise.id)}
                  className="text-red-500"
                >
                  <FiTrash2 />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 mb-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
            <p className="text-gray-500 dark:text-gray-400">
              No exercises added yet. Select from the library below.
            </p>
          </div>
        )}
        
        {/* Exercise library */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Exercise Library</h4>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {exerciseLibrary.map(exercise => (
              <div 
                key={exercise.id} 
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleAddExercise(exercise)}
              >
                <div>
                  <span className="font-medium">{exercise.name}</span>
                  <Badge variant="gray" size="sm" className="ml-2">
                    {exercise.type}
                  </Badge>
                </div>
                <Button variant="ghost" size="xs">
                  <FiPlus />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {workout ? 'Update Workout' : 'Create Workout'}
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
