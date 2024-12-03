import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar/Sidebar';
import { 
  Bars3Icon, 
  BellIcon, 
  UserCircleIcon 
} from '@heroicons/react/24/outline';
import oritechLogo from '../../assets/image/oritech.png';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '0px' }}
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-30 overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <img 
              src="src/assets/image/oritech.png" 
              alt="Oritech Logo" 
              className="h-8 w-auto"
            />
          </div>
          <Sidebar />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'ml-[280px]' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Bars3Icon className="w-6 h-6 text-gray-500" />
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <BellIcon className="w-6 h-6 text-gray-500" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <UserCircleIcon className="w-6 h-6 text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
