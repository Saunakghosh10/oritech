import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  PhoneIcon,
  CurrencyRupeeIcon,
  BellIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = [
    {
      title: 'Total Customers',
      value: '24',
      icon: UsersIcon,
      color: 'blue',
      change: '+12%'
    },
    {
      title: 'Active Service Calls',
      value: '12',
      icon: PhoneIcon,
      color: 'green',
      change: '+5%'
    },
    {
      title: 'Pending Payments',
      value: '₹47,500',
      icon: CurrencyRupeeIcon,
      color: 'yellow',
      change: '-8%'
    },
    {
      title: 'Active Reminders',
      value: '8',
      icon: BellIcon,
      color: 'red',
      change: '+2%'
    }
  ];

  const recentActivities = [
    { type: 'service_call', message: 'New service call from Tech Solutions Ltd', time: '2 hours ago' },
    { type: 'payment', message: 'Payment received from Global Systems Inc', time: '4 hours ago' },
    { type: 'reminder', message: 'Maintenance due for Innovate Corp', time: '5 hours ago' },
    { type: 'engineer', message: 'Engineer assigned to Tech Solutions Ltd', time: '6 hours ago' }
  ];

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Service Calls',
        data: [5, 8, 12, 7, 9, 4, 6],
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.4
      },
      {
        label: 'Completed Tasks',
        data: [4, 6, 10, 8, 7, 3, 5],
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${stat.color}-500 hover:shadow-md transition-shadow cursor-pointer`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last period
                </p>
              </div>
              <stat.icon className={`w-12 h-12 text-${stat.color}-500 opacity-20`} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Activities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
          <Line data={chartData} options={chartOptions} />
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'service_call' ? 'bg-blue-100' :
                  activity.type === 'payment' ? 'bg-green-100' :
                  activity.type === 'reminder' ? 'bg-yellow-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'service_call' ? <PhoneIcon className="w-5 h-5 text-blue-600" /> :
                   activity.type === 'payment' ? <CurrencyRupeeIcon className="w-5 h-5 text-green-600" /> :
                   activity.type === 'reminder' ? <BellIcon className="w-5 h-5 text-yellow-600" /> :
                   <UsersIcon className="w-5 h-5 text-purple-600" />}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
