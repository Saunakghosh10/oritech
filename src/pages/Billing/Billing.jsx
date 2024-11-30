import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Billing = () => {
  const [activeTab, setActiveTab] = useState('to-be-billed')

  const tabs = [
    { id: 'to-be-billed', name: 'To Be Billed', path: '/billing/to-be-billed' },
    { id: 'to-be-cancelled', name: 'To Be Cancelled', path: '/billing/to-be-cancelled' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Billing Management</h1>
        <div className="space-x-4">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Generate Invoice
          </button>
          <button className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Total Pending Bills</h3>
          <p className="text-3xl font-bold text-primary">₹45,250</p>
          <p className="text-sm text-gray-500 mt-2">From 23 service calls</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">To Be Cancelled</h3>
          <p className="text-3xl font-bold text-red-600">₹12,800</p>
          <p className="text-sm text-gray-500 mt-2">From 8 service calls</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">This Month's Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹1,23,450</p>
          <p className="text-sm text-gray-500 mt-2">From 45 completed calls</p>
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

export default Billing
