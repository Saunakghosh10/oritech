import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { PlusIcon } from '@heroicons/react/24/outline'
import ServiceCallsCharts from '../../components/charts/ServiceCallsCharts'

const ServiceCalls = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    const path = location.pathname.split('/').pop()
    setActiveTab(path)
  }, [location])

  const tabs = [
    { id: 'all', name: 'All Calls', path: '/service-calls/all' },
    { id: 'allotted', name: 'Allotted', path: '/service-calls/allotted' },
    { id: 'non-allotted', name: 'Non-Allotted', path: '/service-calls/non-allotted' },
    { id: 'completed', name: 'Completed', path: '/service-calls/completed' },
    { id: 'pending', name: 'Pending', path: '/service-calls/pending' },
    { id: 'delivery', name: 'Delivery', path: '/service-calls/delivery' },
    { id: 'collection', name: 'Collection', path: '/service-calls/collection' }
  ]

  const stats = {
    total: 45,
    allotted: 32,
    nonAllotted: 13,
    highPriority: 8,
    completed: 28,
    pending: 17,
    delivery: 5,
    collection: 3
  }

  return (
    <div className="w-full h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Service Calls</h1>
        <button
          onClick={() => navigate('/service-calls/new')}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
        >
          <PlusIcon className="h-5 w-5" />
          New Service Call
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Calls</h3>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Allotted</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-primary">{stats.allotted}</p>
            <p className="text-sm text-gray-500 mb-1">of {stats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Non-Allotted</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-yellow-600">{stats.nonAllotted}</p>
            <p className="text-sm text-gray-500 mb-1">pending</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">High Priority</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-red-600">{stats.highPriority}</p>
            <p className="text-sm text-gray-500 mb-1">calls</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-green-600">{stats.completed}</p>
            <p className="text-sm text-gray-500 mb-1">{Math.round((stats.completed / stats.total) * 100)}%</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-gray-600">{stats.pending}</p>
            <p className="text-sm text-gray-500 mb-1">to resolve</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Delivery</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-blue-600">{stats.delivery}</p>
            <p className="text-sm text-gray-500 mb-1">scheduled</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Collection</h3>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-semibold text-purple-600">{stats.collection}</p>
            <p className="text-sm text-gray-500 mb-1">pending</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Calls Overview</h2>
        <ServiceCallsCharts />
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full overflow-x-auto">
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
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default ServiceCalls
