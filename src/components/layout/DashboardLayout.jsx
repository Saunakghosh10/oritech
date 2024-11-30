import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashboardLayout = ({ children }) => {
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
    { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    { path: '/customers', name: 'Customers', icon: '👥' },
    { path: '/service-calls', name: 'Service Calls', icon: '📞' },
    { path: '/engineers', name: 'Engineers', icon: '👨‍🔧' },
    { path: '/billing', name: 'Billing', icon: '💰' },
    { path: '/reminders', name: 'Reminders', icon: '⏰' },
  ]

  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 w-72 lg:w-64`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">OriService</h2>
          {isMobile && (
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          )}
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        }`}
      >
        {/* Top Bar */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-[2000px] mx-auto">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100"
                  aria-label="Notifications"
                >
                  🔔
                </button>
                <div
                  className="w-8 h-8 rounded-full bg-gray-300"
                  aria-label="User profile"
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6 max-w-[2000px] mx-auto">
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
