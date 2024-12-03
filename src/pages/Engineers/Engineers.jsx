import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import EngineerModal from '../../components/EngineerModal';

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

const Engineers = () => {
  const [engineers, setEngineers] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@oritech.com',
      phone: '+91 98765 43210',
      specialization: 'Network Security',
      experience: '8 years',
      certifications: ['CISSP', 'CCNA', 'CompTIA Security+'],
      status: 'available'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@oritech.com',
      phone: '+91 98765 43211',
      specialization: 'Cloud Infrastructure',
      experience: '6 years',
      certifications: ['AWS Solutions Architect', 'Azure Administrator'],
      status: 'available'
    },
    {
      id: 3,
      name: 'Amit Patel',
      email: 'amit.patel@oritech.com',
      phone: '+91 98765 43212',
      specialization: 'Software Development',
      experience: '5 years',
      certifications: ['Full Stack Developer', 'MERN Specialist'],
      status: 'on-call'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      email: 'sneha.reddy@oritech.com',
      phone: '+91 98765 43213',
      specialization: 'Database Administration',
      experience: '7 years',
      certifications: ['Oracle DBA', 'MongoDB Developer'],
      status: 'unavailable'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEngineer, setSelectedEngineer] = useState(null);

  const handleAddEngineer = (newEngineer) => {
    setEngineers(prevEngineers => [
      ...prevEngineers,
      {
        ...newEngineer,
        id: prevEngineers.length + 1,
        status: newEngineer.status.toLowerCase()
      }
    ]);
    setIsModalOpen(false);
  };

  const handleEditEngineer = (updatedEngineer) => {
    setEngineers(prevEngineers =>
      prevEngineers.map(engineer =>
        engineer.id === updatedEngineer.id ? { ...updatedEngineer } : engineer
      )
    );
    setIsModalOpen(false);
    setSelectedEngineer(null);
  };

  const handleDeleteEngineer = (engineerId) => {
    if (window.confirm('Are you sure you want to delete this engineer?')) {
      setEngineers(prevEngineers => 
        prevEngineers.filter(engineer => engineer.id !== engineerId)
      );
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      'on-call': 'bg-yellow-100 text-yellow-800',
      unavailable: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = 
      engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engineer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || engineer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Engineers</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Add Engineer
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="sm:col-span-3 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search engineers..."
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
          <option value="available">Available</option>
          <option value="on-call">On Call</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEngineers.map(engineer => (
          <div key={engineer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{engineer.name}</h3>
                  <p className="text-sm text-gray-600">{engineer.specialization}</p>
                  <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(engineer.status)}`}>
                    {engineer.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  <a href={`mailto:${engineer.email}`} className="hover:text-blue-600">
                    {engineer.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  <a href={`tel:${engineer.phone}`} className="hover:text-blue-600">
                    {engineer.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <BriefcaseIcon className="w-5 h-5 mr-2" />
                  <span>{engineer.experience}</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <AcademicCapIcon className="w-5 h-5 mr-2 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {engineer.certifications.map((cert, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  onClick={() => {
                    setSelectedEngineer(engineer);
                    setIsModalOpen(true);
                  }}
                  className="p-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteEngineer(engineer.id)}
                  className="p-2 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Engineer Modal */}
      <EngineerModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEngineer(null);
        }}
        onSubmit={selectedEngineer ? handleEditEngineer : handleAddEngineer}
        engineer={selectedEngineer}
      />
    </div>
  );
};

export default Engineers;
