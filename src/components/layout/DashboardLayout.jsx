import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HomeIcon,
  UserGroupIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  CreditCardIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: HomeIcon },
    { path: '/customers', name: 'Customers', icon: UserGroupIcon },
    { path: '/service-calls', name: 'Service Calls', icon: PhoneIcon },
    { path: '/engineers', name: 'Engineers', icon: WrenchScrewdriverIcon },
    { path: '/billing', name: 'Billing', icon: CreditCardIcon },
    { path: '/reminders', name: 'Reminders', icon: BellIcon },
  ]

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-30"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 'auto' : '0',
          x: isSidebarOpen ? 0 : -280,
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className={`fixed lg:static top-0 left-0 z-40 h-screen bg-white border-r border-gray-200 overflow-hidden`}
      >
        <div className="flex flex-col h-full w-[280px]">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
                className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              >
                <span className="text-white text-lg font-bold">O</span>
              </motion.div>
              <span className="text-xl font-semibold text-gray-800">OriService</span>
            </Link>
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeSidebar}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </motion.button>
            )}
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors relative group ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-6 h-6 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                  {!isActive && (
                    <motion.div
                      initial={false}
                      animate={{ x: [-4, 0] }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-3 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </motion.div>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <UserCircleIcon className="w-6 h-6 text-gray-500" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@oriservice.com</p>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between p-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle sidebar"
            >
              <Bars3Icon className="w-6 h-6 text-gray-500" />
            </motion.button>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-lg hover:bg-gray-100"
                aria-label="Notifications"
              >
                <BellIcon className="w-6 h-6 text-gray-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                <UserCircleIcon className="w-6 h-6 text-gray-500" />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 overflow-auto p-4 lg:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}

export default DashboardLayout
