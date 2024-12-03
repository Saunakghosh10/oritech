import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  PhoneIcon,
  UserIcon,
  CurrencyRupeeIcon,
  BellIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: HomeIcon },
    { path: '/customers', name: 'Customers', icon: UserGroupIcon },
    { path: '/service-calls', name: 'Service Calls', icon: PhoneIcon },
    { path: '/engineers', name: 'Engineers', icon: UserIcon },
    { path: '/billing', name: 'Billing', icon: CurrencyRupeeIcon },
    { path: '/reminders', name: 'Reminders', icon: BellIcon },
  ];

  return (
    <div className="bg-white w-64 min-h-screen">
      {/* <div className="p-4">
        <img src="/logo.png" alt="Logo" className="h-8" />
      </div> */}
      <nav className="mt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
