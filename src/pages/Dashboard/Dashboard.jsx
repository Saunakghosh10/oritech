import { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { title: 'Total Customers', value: 150, link: '/customers' },
    { title: 'Active Services', value: 45, link: '/services' },
    { title: 'Pending Calls', value: 12, link: '/service-calls?status=pending' },
    { title: 'Completed Calls', value: 89, link: '/service-calls?status=completed' },
  ];

  const recentCustomers = [
    { name: 'John Doe', serviceType: 'Maintenance', status: 'Active', lastUpdate: '2024-01-20' },
    { name: 'Jane Smith', serviceType: 'Repair', status: 'Pending', lastUpdate: '2024-01-19' },
    // Add more customers as needed
  ];

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Service Dashboard</h1>
        <Link
          to="/new-service"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Add New Service
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.title}</h3>
            <p className="text-4xl font-bold text-green-500">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Customers */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Customers</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">CUSTOMER NAME</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">SERVICE TYPE</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">STATUS</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">LAST UPDATE</th>
              </tr>
            </thead>
            <tbody>
              {recentCustomers.map((customer, index) => (
                <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-4 px-4">{customer.name}</td>
                  <td className="py-4 px-4">{customer.serviceType}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium
                        ${customer.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          customer.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-gray-100 text-gray-800'}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{customer.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
