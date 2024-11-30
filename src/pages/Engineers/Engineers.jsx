import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'

const Engineers = () => {
  const [activeTab, setActiveTab] = useState('senior')

  const tabs = [
    { id: 'senior', name: 'Senior Engineers', path: '/engineers/senior' },
    { id: 'junior', name: 'Junior Engineers', path: '/engineers/junior' },
  ]

  const stats = {
    total: 24,
    senior: 10,
    junior: 14,
    available: 18,
    onCall: 6
  }

  return (
    <div className="w-full h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Engineers</h1>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center">
          <PlusIcon className="h-5 w-5" />
          Add Engineer
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Engineers</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Senior Engineers</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-primary">{stats.senior}</p>
            <p className="text-sm text-gray-500 mb-1">of {stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Junior Engineers</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-blue-600">{stats.junior}</p>
            <p className="text-sm text-gray-500 mb-1">of {stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Available</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-green-600">{stats.available}</p>
            <p className="text-sm text-gray-500 mb-1">now</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">On Call</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-yellow-600">{stats.onCall}</p>
            <p className="text-sm text-gray-500 mb-1">engineers</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <nav className="-mb-px flex space-x-8 p-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Engineers
