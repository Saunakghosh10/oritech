import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Engineers = () => {
  const [activeTab, setActiveTab] = useState('senior')

  const tabs = [
    { id: 'senior', name: 'Senior Engineers', path: '/engineers/senior' },
    { id: 'junior', name: 'Junior Engineers', path: '/engineers/junior' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Engineers</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Add Engineer
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Engineers
