import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  BellIcon,
  BellAlertIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import ReminderModal from '../../components/ReminderModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Reminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Follow up with Tech Solutions',
      description: 'Check network maintenance completion status',
      type: 'customer',
      priority: 'high',
      dueDate: '2024-03-15',
      status: 'pending',
      relatedTo: 'Tech Solutions Ltd',
      createdAt: '2024-03-01'
    },
    {
      id: 2,
      title: 'Service Call Schedule',
      description: 'Schedule maintenance for Global Systems',
      type: 'service',
      priority: 'medium',
      dueDate: '2024-03-20',
      status: 'pending',
      relatedTo: 'Global Systems Inc',
      createdAt: '2024-03-05'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);

  const handleAddReminder = (newReminder) => {
    setReminders(prev => [...prev, { ...newReminder, id: prev.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleEditReminder = (updatedReminder) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
    setIsModalOpen(false);
    setSelectedReminder(null);
  };

  const handleDeleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
    }
  };

  const handleCompleteReminder = (id) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, status: 'completed' } : reminder
      )
    );
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-red-600 bg-red-50',
      medium: 'text-yellow-600 bg-yellow-50',
      low: 'text-green-600 bg-green-50'
    };
    return colors[priority] || colors.medium;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-50',
      completed: 'text-green-600 bg-green-50',
      overdue: 'text-red-600 bg-red-50'
    };
    return colors[status] || colors.pending;
  };

  const filteredReminders = reminders
    .filter(reminder => {
      const matchesSearch = 
        reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.relatedTo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || reminder.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

  return (
    <div className="p-6">
     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reminders</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Reminder
        </button>
      </div>

      <div className="mb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            {
              title: 'Total Reminders',
              count: reminders.length,
              icon: BellIcon,
              color: 'blue'
            },
            {
              title: 'Pending',
              count: reminders.filter(r => r.status === 'pending').length,
              icon: ClockIcon,
              color: 'yellow'
            },
            {
              title: 'Completed',
              count: reminders.filter(r => r.status === 'completed').length,
              icon: CheckCircleIcon,
              color: 'green'
            },
            {
              title: 'Overdue',
              count: reminders.filter(r => r.status === 'overdue').length,
              icon: ExclamationCircleIcon,
              color: 'red'
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white p-4 rounded-lg shadow border-l-4 border-${stat.color}-500`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.count}</p>
                </div>
                <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search reminders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredReminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{reminder.title}</h3>
                <p className="text-sm text-gray-500">{reminder.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCompleteReminder(reminder.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                  disabled={reminder.status === 'completed'}
                >
                  <CheckCircleIcon className={`w-5 h-5 ${
                    reminder.status === 'completed' ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </button>
                <button
                  onClick={() => {
                    setSelectedReminder(reminder);
                    setIsModalOpen(true);
                  }}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <BellAlertIcon className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => handleDeleteReminder(reminder.id)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)} Priority
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                {reminder.status.charAt(0).toUpperCase() + reminder.status.slice(1)}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-4 h-4" />
                Due: {reminder.dueDate}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <ClockIcon className="w-4 h-4" />
                Created: {reminder.createdAt}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReminder(null);
        }}
        onSubmit={selectedReminder ? handleEditReminder : handleAddReminder}
        reminder={selectedReminder}
      />
    </div>
  );
};

export default Reminders;
