import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Reminders = () => {
  const [activeTab, setActiveTab] = useState('collections')

  const tabs = [
    { id: 'collections', name: 'Collections', path: '/reminders/collections' },
    { id: 'expiry', name: 'Expiry', path: '/reminders/expiry' },
  ]

  const reminderStats = {
    totalReminders: 45,
    dueToday: 8,
    overdue: 12,
    upcoming: 25
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Reminders</h1>
        <div className="space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Add Reminder
          </button>
          <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Reminders</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{reminderStats.totalReminders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Due Today</h3>
          <p className="text-2xl font-semibold text-yellow-600 mt-2">{reminderStats.dueToday}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
          <p className="text-2xl font-semibold text-red-600 mt-2">{reminderStats.overdue}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
          <p className="text-2xl font-semibold text-green-600 mt-2">{reminderStats.upcoming}</p>
        </div>
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

export default Reminders
