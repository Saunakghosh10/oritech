import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  TrashIcon,
  CurrencyRupeeIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import InvoiceModal from '../../components/InvoiceModal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../../components/InvoicePDF';

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

const Billing = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      customerId: 1,
      customerName: 'Tech Solutions Ltd',
      serviceType: 'Network Maintenance',
      amount: 12500,
      status: 'pending',
      dueDate: '2024-03-15',
      createdAt: '2024-03-01',
      items: [
        { description: 'Network Security Audit', amount: 5000 },
        { description: 'Firewall Configuration', amount: 7500 }
      ]
    },
    {
      id: 'INV-2024-002',
      customerId: 2,
      customerName: 'Global Systems Inc',
      serviceType: 'Cloud Setup',
      amount: 25000,
      status: 'paid',
      dueDate: '2024-03-10',
      createdAt: '2024-02-25',
      items: [
        { description: 'AWS Infrastructure Setup', amount: 15000 },
        { description: 'Cloud Migration Service', amount: 10000 }
      ]
    },
    {
      id: 'INV-2024-003',
      customerId: 3,
      customerName: 'Innovate Corp',
      serviceType: 'Software Development',
      amount: 35000,
      status: 'overdue',
      dueDate: '2024-02-28',
      createdAt: '2024-02-14',
      items: [
        { description: 'Custom Software Development', amount: 25000 },
        { description: 'API Integration', amount: 10000 }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleAddInvoice = (newInvoice) => {
    setInvoices(prevInvoices => [...prevInvoices, {
      ...newInvoice,
      id: `INV-2024-${String(prevInvoices.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString().split('T')[0]
    }]);
    setIsModalOpen(false);
  };

  const handleEditInvoice = (updatedInvoice) => {
    setInvoices(prevInvoices =>
      prevInvoices.map(invoice =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
    setIsModalOpen(false);
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prevInvoices => 
        prevInvoices.filter(invoice => invoice.id !== invoiceId)
      );
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || invoice.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = filteredInvoices
    .filter(invoice => invoice.status === 'pending' || invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  // Add statistics cards
  const stats = [
    {
      title: "Total Invoices",
      value: filteredInvoices.length,
      icon: <DocumentTextIcon className="w-6 h-6 text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount.toLocaleString()}`,
      icon: <CurrencyRupeeIcon className="w-6 h-6 text-green-600" />,
      bgColor: "bg-green-50"
    },
    {
      title: "Pending Amount",
      value: `₹${pendingAmount.toLocaleString()}`,
      icon: <ClockIcon className="w-6 h-6 text-yellow-600" />,
      bgColor: "bg-yellow-50"
    },
    {
      title: "Overdue Invoices",
      value: filteredInvoices.filter(inv => inv.status === 'overdue').length,
      icon: <ExclamationCircleIcon className="w-6 h-6 text-red-600" />,
      bgColor: "bg-red-50"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Billing & Invoices</h1>
        <button
          onClick={() => {
            setSelectedInvoice(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Create Invoice
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`${stat.bgColor} p-6 rounded-lg shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
              </div>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                  <div className="text-sm text-gray-500">{invoice.serviceType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{invoice.customerName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">₹{invoice.amount.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 tooltip"
                      data-tooltip="View/Edit"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <PDFDownloadLink
                      document={<InvoicePDF invoice={invoice} />}
                      fileName={`${invoice.id}.pdf`}
                      className="text-green-600 hover:text-green-900 tooltip"
                      data-tooltip="Download PDF"
                    >
                      {({ loading }) => (
                        loading ? 
                        <span className="loading loading-spinner loading-sm"></span> :
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      )}
                    </PDFDownloadLink>
                    <button 
                      onClick={() => handleDeleteInvoice(invoice.id)}
                      className="text-red-600 hover:text-red-900 tooltip"
                      data-tooltip="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedInvoice(null);
        }}
        onSubmit={selectedInvoice ? handleEditInvoice : handleAddInvoice}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default Billing;
