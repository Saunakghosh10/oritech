import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  CalendarIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import ServiceCallModal from '../../components/ServiceCallModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const ServiceCalls = () => {
  const [serviceCalls, setServiceCalls] = useState([
    {
      id: 1,
      customerId: 1,
      engineerId: 1,
      description: "Server maintenance and security updates",
      status: "scheduled",
      priority: "high",
      scheduledDate: "2024-03-20",
      type: "Maintenance"
    },
    {
      id: 2,
      customerId: 2,
      engineerId: 2,
      description: "Network connectivity issues in main office",
      status: "in-progress",
      priority: "medium",
      scheduledDate: "2024-03-19",
      type: "Repair"
    },
    {
      id: 3,
      customerId: 3,
      engineerId: 3,
      description: "New software installation and configuration",
      status: "completed",
      priority: "low",
      scheduledDate: "2024-03-18",
      type: "Installation"
    },
    {
      id: 4,
      customerId: 4,
      engineerId: 1,
      description: "Quarterly system health check",
      status: "pending",
      priority: "medium",
      scheduledDate: "2024-03-21",
      type: "Inspection"
    }
  ]);

  const [engineers] = useState([
    { id: 1, name: "Rahul Kumar", specialization: "Network Security" },
    { id: 2, name: "Priya Sharma", specialization: "Software Development" },
    { id: 3, name: "Amit Patel", specialization: "System Administration" }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  const handleAddCall = (newCall) => {
    setServiceCalls(prev => [...prev, { ...newCall, id: prev.length + 1 }]);
    setIsModalOpen(false);
  };

  const handleEditCall = (updatedCall) => {
    setServiceCalls(prev => 
      prev.map(call => call.id === updatedCall.id ? updatedCall : call)
    );
    setIsModalOpen(false);
    setSelectedCall(null);
  };

  const handleDeleteCall = (callId) => {
    if (window.confirm('Are you sure you want to delete this service call?')) {
      setServiceCalls(prev => prev.filter(call => call.id !== callId));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'scheduled': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'pending': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-600',
      'medium': 'text-yellow-600',
      'low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredCalls = serviceCalls.filter(call => {
    const searchString = `${call.description} ${call.type}`.toLowerCase();
    const matchesSearch = searchString.includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || call.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Service Calls</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          New Service Call
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="sm:col-span-3 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search service calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Service Calls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalls.map(call => (
          <div key={call.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${getPriorityColor(call.priority)} bg-opacity-10`}>
                    {call.priority} Priority
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start text-gray-600">
                  <WrenchScrewdriverIcon className="w-5 h-5 mr-2 mt-1" />
                  <p>{call.description}</p>
                </div>
                <div className="flex items-center text-gray-600">
                  <UserIcon className="w-5 h-5 mr-2" />
                  <span>{engineers.find(e => e.id === call.engineerId)?.name || 'Unassigned'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  <span>{new Date(call.scheduledDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{call.type}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  onClick={() => {
                    setSelectedCall(call);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteCall(call.id)}
                  className="p-2 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Service Call Modal */}
      <ServiceCallModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCall(null);
        }}
        onSubmit={selectedCall ? handleEditCall : handleAddCall}
        serviceCall={selectedCall}
        engineers={engineers}
        customers={[
          { id: 1, name: 'Tech Solutions Ltd' },
          { id: 2, name: 'Global Systems Inc' },
          { id: 3, name: 'Innovate Corp' },
          { id: 4, name: 'Digital Solutions' }
        ]}
      />
    </div>
  );
};

export default ServiceCalls;
