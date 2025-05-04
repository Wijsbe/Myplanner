import React, { useState, useEffect } from 'react';
import { FiPlus, FiCalendar, FiClock, FiRepeat, FiAlertCircle, FiEdit, FiTrash2, FiSave } from 'react-icons/fi';
import Card, { CardHeader, CardBody, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';

const ShiftOrganizerPage = () => {
  // Sample shift types
  const shiftTypes = [
    { id: 1, name: 'Day Shift', color: 'primary', timeRange: '07:00 - 15:00' },
    { id: 2, name: 'Evening Shift', color: 'secondary', timeRange: '15:00 - 23:00' },
    { id: 3, name: 'Night Shift', color: 'accent', timeRange: '23:00 - 07:00' },
    { id: 4, name: 'Free Day', color: 'success', timeRange: 'All Day' },
  ];

  // State for shifts
  const [shifts, setShifts] = useState([
    { 
      id: 1, 
      date: '2025-05-04', 
      shiftTypeId: 4, // Free Day
      repeatDays: 10,
      notes: 'Regular free day'
    },
    { 
      id: 2, 
      date: '2025-05-05', 
      shiftTypeId: 1, // Day Shift
      repeatDays: 10,
      notes: 'Regular day shift'
    },
    { 
      id: 3, 
      date: '2025-05-06', 
      shiftTypeId: 2, // Evening Shift
      repeatDays: 10,
      notes: 'Regular evening shift'
    },
    { 
      id: 4, 
      date: '2025-05-07', 
      shiftTypeId: 3, // Night Shift
      repeatDays: 10,
      notes: 'Regular night shift'
    }
  ]);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShiftTypeModalOpen, setIsShiftTypeModalOpen] = useState(false);
  const [currentShift, setCurrentShift] = useState(null);
  const [currentShiftType, setCurrentShiftType] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Form state for adding/editing shifts
  const [formData, setFormData] = useState({
    date: '',
    shiftTypeId: 1,
    repeatDays: 7,
    notes: ''
  });

  // Form state for adding/editing shift types
  const [shiftTypeFormData, setShiftTypeFormData] = useState({
    name: '',
    color: 'primary',
    timeRange: ''
  });

  // Custom shift types state
  const [customShiftTypes, setCustomShiftTypes] = useState([]);

  // Combined shift types (default + custom)
  const allShiftTypes = [...shiftTypes, ...customShiftTypes];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle shift type form input changes
  const handleShiftTypeInputChange = (e) => {
    const { name, value } = e.target;
    setShiftTypeFormData({
      ...shiftTypeFormData,
      [name]: value
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get shift type by ID
  const getShiftType = (shiftTypeId) => {
    return allShiftTypes.find(type => type.id === shiftTypeId) || { name: 'Unknown', color: 'gray' };
  };

  // Handle adding a new shift
  const handleAddShift = () => {
    setCurrentShift(null);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      shiftTypeId: 1,
      repeatDays: 7,
      notes: ''
    });
    setIsAddModalOpen(true);
  };

  // Handle editing a shift
  const handleEditShift = (shift) => {
    setCurrentShift(shift);
    setFormData({
      date: shift.date,
      shiftTypeId: shift.shiftTypeId,
      repeatDays: shift.repeatDays,
      notes: shift.notes || ''
    });
    setIsEditModalOpen(true);
  };

  // Handle deleting a shift
  const handleDeleteShift = (shift) => {
    setCurrentShift(shift);
    setIsDeleteModalOpen(true);
  };

  // Handle adding a new shift type
  const handleAddShiftType = () => {
    setCurrentShiftType(null);
    setShiftTypeFormData({
      name: '',
      color: 'primary',
      timeRange: '09:00 - 17:00'
    });
    setIsShiftTypeModalOpen(true);
  };

  // Handle editing a shift type
  const handleEditShiftType = (shiftType) => {
    setCurrentShiftType(shiftType);
    setShiftTypeFormData({
      name: shiftType.name,
      color: shiftType.color,
      timeRange: shiftType.timeRange
    });
    setIsShiftTypeModalOpen(true);
  };

  // Submit new shift
  const handleAddShiftSubmit = (e) => {
    e.preventDefault();
    const newShift = {
      id: Date.now(),
      date: formData.date,
      shiftTypeId: parseInt(formData.shiftTypeId),
      repeatDays: parseInt(formData.repeatDays),
      notes: formData.notes
    };
    setShifts([...shifts, newShift]);
    setIsAddModalOpen(false);
    showSuccessMessage('Shift added successfully!');
  };

  // Submit edited shift
  const handleEditShiftSubmit = (e) => {
    e.preventDefault();
    const updatedShifts = shifts.map(shift => 
      shift.id === currentShift.id 
        ? {
            ...shift,
            date: formData.date,
            shiftTypeId: parseInt(formData.shiftTypeId),
            repeatDays: parseInt(formData.repeatDays),
            notes: formData.notes
          }
        : shift
    );
    setShifts(updatedShifts);
    setIsEditModalOpen(false);
    showSuccessMessage('Shift updated successfully!');
  };

  // Confirm delete shift
  const handleDeleteShiftConfirm = () => {
    const updatedShifts = shifts.filter(shift => shift.id !== currentShift.id);
    setShifts(updatedShifts);
    setIsDeleteModalOpen(false);
    showSuccessMessage('Shift deleted successfully!');
  };

  // Submit new shift type
  const handleShiftTypeSubmit = (e) => {
    e.preventDefault();
    if (currentShiftType) {
      // Edit existing shift type
      const updatedShiftTypes = customShiftTypes.map(type => 
        type.id === currentShiftType.id 
          ? {
              ...type,
              name: shiftTypeFormData.name,
              color: shiftTypeFormData.color,
              timeRange: shiftTypeFormData.timeRange
            }
          : type
      );
      setCustomShiftTypes(updatedShiftTypes);
      showSuccessMessage('Shift type updated successfully!');
    } else {
      // Add new shift type
      const newShiftType = {
        id: shiftTypes.length + customShiftTypes.length + 1,
        name: shiftTypeFormData.name,
        color: shiftTypeFormData.color,
        timeRange: shiftTypeFormData.timeRange
      };
      setCustomShiftTypes([...customShiftTypes, newShiftType]);
      showSuccessMessage('Shift type added successfully!');
    }
    setIsShiftTypeModalOpen(false);
  };

  // Show success message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Calculate next occurrence of a shift
  const calculateNextOccurrence = (shift) => {
    const shiftDate = new Date(shift.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // If the shift date is in the future, return it
    if (shiftDate >= today) {
      return formatDate(shift.date);
    }
    
    // Calculate days since the shift date
    const daysSinceShift = Math.floor((today - shiftDate) / (1000 * 60 * 60 * 24));
    
    // Calculate days until next occurrence
    const daysUntilNext = shift.repeatDays - (daysSinceShift % shift.repeatDays);
    
    // Calculate next occurrence date
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);
    
    return formatDate(nextDate.toISOString().split('T')[0]);
  };

  // Sort shifts by next occurrence
  const sortedShifts = [...shifts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

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
            Shift Organizer
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Set up your recurring shifts and manage your schedule
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-2">
          <Button variant="outline" onClick={handleAddShiftType}>
            <FiPlus className="mr-1" /> New Shift Type
          </Button>
          <Button onClick={handleAddShift}>
            <FiPlus className="mr-1" /> Add Shift
          </Button>
        </div>
      </div>

      {/* Shift Types Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Shift Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {allShiftTypes.map((type) => (
            <Card key={type.id} hover className="animate-fade-in">
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full bg-${type.color}-500 mr-2`}></div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{type.name}</h4>
                  </div>
                  {customShiftTypes.some(t => t.id === type.id) && (
                    <button 
                      className="text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                      onClick={() => handleEditShiftType(type)}
                    >
                      <FiEdit size={14} />
                    </button>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <FiClock className="mr-1" /> {type.timeRange}
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Shifts Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Recurring Shifts</h3>
        <div className="bg-white dark:bg-gray-800 shadow-soft rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Shift Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Repeat Every
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Next Occurrence
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {sortedShifts.map((shift) => {
                  const shiftType = getShiftType(shift.shiftTypeId);
                  return (
                    <tr key={shift.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-${shiftType.color}-500 mr-2`}></div>
                          <span className="font-medium text-gray-900 dark:text-white">{shiftType.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(shift.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <FiRepeat className="mr-1" />
                          <span>{shift.repeatDays} days</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {calculateNextOccurrence(shift)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {shift.notes || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button 
                            className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                            onClick={() => handleEditShift(shift)}
                          >
                            <FiEdit size={16} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            onClick={() => handleDeleteShift(shift)}
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {shifts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No shifts added yet. Click "Add Shift" to create your first shift.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Shift Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Shift"
      >
        <form onSubmit={handleAddShiftSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="shiftTypeId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Shift Type
            </label>
            <select
              id="shiftTypeId"
              name="shiftTypeId"
              value={formData.shiftTypeId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              {allShiftTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.timeRange})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="repeatDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Repeat Every (Days)
            </label>
            <input
              type="number"
              id="repeatDays"
              name="repeatDays"
              value={formData.repeatDays}
              onChange={handleInputChange}
              min="1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Shift
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Shift Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Shift"
      >
        <form onSubmit={handleEditShiftSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="shiftTypeId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Shift Type
            </label>
            <select
              id="shiftTypeId"
              name="shiftTypeId"
              value={formData.shiftTypeId}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              {allShiftTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.timeRange})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="repeatDays" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Repeat Every (Days)
            </label>
            <input
              type="number"
              id="repeatDays"
              name="repeatDays"
              value={formData.repeatDays}
              onChange={handleInputChange}
              min="1"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="3"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Shift Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Shift"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this shift? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteShiftConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add/Edit Shift Type Modal */}
      <Modal
        isOpen={isShiftTypeModalOpen}
        onClose={() => setIsShiftTypeModalOpen(false)}
        title={currentShiftType ? "Edit Shift Type" : "Add New Shift Type"}
      >
        <form onSubmit={handleShiftTypeSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Shift Type Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shiftTypeFormData.name}
              onChange={handleShiftTypeInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="e.g., Morning Shift"
            />
          </div>

          <div>
            <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Time Range
            </label>
            <input
              type="text"
              id="timeRange"
              name="timeRange"
              value={shiftTypeFormData.timeRange}
              onChange={handleShiftTypeInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              placeholder="e.g., 09:00 - 17:00"
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color
            </label>
            <select
              id="color"
              name="color"
              value={shiftTypeFormData.color}
              onChange={handleShiftTypeInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="primary">Blue</option>
              <option value="secondary">Purple</option>
              <option value="accent">Orange</option>
              <option value="success">Green</option>
              <option value="danger">Red</option>
              <option value="gray">Gray</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsShiftTypeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {currentShiftType ? "Save Changes" : "Add Shift Type"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ShiftOrganizerPage;
