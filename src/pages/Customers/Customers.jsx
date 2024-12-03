import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlusIcon, 
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';
import AddCustomerModal from '../../components/AddCustomerModal';

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

const Customers = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Tech Solutions Ltd',
      email: 'contact@techsolutions.com',
      phone: '+91 98765 43210',
      address: '123 Tech Park, Mumbai, MH 400001',
      status: 'active'
    },
    {
      id: 2,
      name: 'Global Systems Inc',
      email: 'info@globalsystems.com', 
      phone: '+91 98765 43211',
      address: '456 Business Hub, Delhi, DL 110001',
      status: 'active'
    },
    {
      id: 3,
      name: 'Innovate Corp',
      email: 'support@innovatecorp.com',
      phone: '+91 98765 43212', 
      address: '789 Innovation Center, Bangalore, KA 560001',
      status: 'inactive'
    },
    {
      id: 4,
      name: 'Digital Solutions',
      email: 'hello@digitalsolutions.com',
      phone: '+91 98765 43213',
      address: '321 Digital Zone, Pune, MH 411001', 
      status: 'active'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Add customer handler
  const handleAddCustomer = (newCustomer) => {
    setCustomers(prevCustomers => [
      ...prevCustomers,
      {
        ...newCustomer,
        id: prevCustomers.length + 1,
        status: newCustomer.status.toLowerCase()
      }
    ]);
    setIsModalOpen(false);
  };

  // Edit customer handler
  const handleEditCustomer = (updatedCustomer) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === updatedCustomer.id ? { ...updatedCustomer, status: updatedCustomer.status.toLowerCase() } : customer
      )
    );
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  // Delete customer handler
  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(prevCustomers => 
        prevCustomers.filter(customer => customer.id !== customerId)
      );
    }
  };

  // Open edit modal
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Filter customers based on search and status
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      {/* Search and Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="sm:col-span-3 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
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
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div key={customer.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{customer.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mt-2
                    ${customer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {customer.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  <a href={`mailto:${customer.email}`} className="hover:text-blue-600">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  <a href={`tel:${customer.phone}`} className="hover:text-blue-600">
                    {customer.phone}
                  </a>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPinIcon className="w-5 h-5 mr-2 mt-0.5" />
                  <span>{customer.address}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button 
                  onClick={() => handleEdit(customer)}
                  className="p-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCustomer(null);
        }}
        onSubmit={selectedCustomer ? handleEditCustomer : handleAddCustomer}
        customer={selectedCustomer}
      />
    </div>
  );
};

export default Customers;
