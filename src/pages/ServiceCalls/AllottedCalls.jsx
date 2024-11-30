import { useState } from 'react'
import { ClockIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const AllottedCalls = () => {
  const [allottedCalls] = useState([
    {
      id: 'SC001',
      customerName: 'Tech Solutions Ltd',
      serviceType: 'Repair',
      priority: 'High',
      status: 'In Progress',
      allottedTo: 'John Engineer',
      allottedDate: '2024-01-20',
      scheduledDate: '2024-01-22',
      location: 'Mumbai, MH',
      description: 'Server maintenance and hardware upgrade'
    },
    {
      id: 'SC002',
      customerName: 'Global Systems Inc',
      serviceType: 'Installation',
      priority: 'Medium',
      status: 'Scheduled',
      allottedTo: 'Sarah Tech',
      allottedDate: '2024-01-21',
      scheduledDate: '2024-01-23',
      location: 'Delhi, DL',
      description: 'New system installation and configuration'
    }
  ])

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'text-red-600',
      Medium: 'text-yellow-600',
      Low: 'text-green-600'
    }
    return colors[priority] || 'text-gray-600'
  }

  const getStatusColor = (status) => {
    const colors = {
      'In Progress': 'bg-blue-100 text-blue-800',
      Scheduled: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search allotted calls..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Engineers</option>
          <option value="john">John Engineer</option>
          <option value="sarah">Sarah Tech</option>
        </select>
      </div>

      {/* Calls List */}
      <div className="space-y-4">
        {allottedCalls.map((call) => (
          <div key={call.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-gray-900">{call.customerName}</h3>
                  <span className={`text-sm font-medium ${getPriorityColor(call.priority)}`}>
                    ({call.priority} Priority)
                  </span>
                </div>
                <p className="text-sm text-gray-500">ID: {call.id}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                  {call.status}
                </span>
                <button className="text-primary hover:text-primary/80">
                  View Details
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Allotted To</p>
                <p className="text-base font-medium text-gray-900">{call.allottedTo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="text-base font-medium text-gray-900">{call.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-900">{call.location}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Allotted Date</p>
                  <p className="text-base font-medium text-gray-900">{call.allottedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Scheduled Date</p>
                  <p className="text-base font-medium text-gray-900">{call.scheduledDate}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{call.description}</p>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                <CheckCircleIcon className="h-4 w-4" />
                Mark Complete
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Reassign
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700">
                <XCircleIcon className="h-4 w-4" />
                Cancel Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllottedCalls
