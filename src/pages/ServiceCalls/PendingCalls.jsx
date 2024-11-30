import { useState } from 'react'
import { CalendarIcon, MapPinIcon, ClockIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

const PendingCalls = () => {
  const [pendingCalls] = useState([
    {
      id: 'SC007',
      customerName: 'Tech Solutions Ltd',
      serviceType: 'Maintenance',
      priority: 'High',
      status: 'Scheduled',
      scheduledDate: '2024-01-25',
      scheduledTime: '10:00 AM',
      location: 'Mumbai, MH',
      assignedTo: 'John Engineer',
      reason: 'Regular maintenance check',
      delayReason: null,
      estimatedDuration: '2 hours',
      prerequisites: ['Access card', 'System documentation']
    },
    {
      id: 'SC008',
      customerName: 'Global Systems Inc',
      serviceType: 'Repair',
      priority: 'Medium',
      status: 'Delayed',
      scheduledDate: '2024-01-24',
      scheduledTime: '02:00 PM',
      location: 'Delhi, DL',
      assignedTo: 'Sarah Tech',
      reason: 'Network connectivity issues',
      delayReason: 'Waiting for spare parts',
      estimatedDuration: '3 hours',
      prerequisites: ['Network diagrams', 'Previous service history']
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
      Scheduled: 'bg-blue-100 text-blue-800',
      Delayed: 'bg-red-100 text-red-800',
      'In Progress': 'bg-yellow-100 text-yellow-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search pending calls..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="delayed">Delayed</option>
          <option value="in-progress">In Progress</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Pending Calls List */}
      <div className="space-y-6">
        {pendingCalls.map((call) => (
          <div key={call.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Schedule Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Date & Time</p>
                    <p className="text-base font-medium text-gray-900">
                      {call.scheduledDate} at {call.scheduledTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Duration</p>
                    <p className="text-base font-medium text-gray-900">{call.estimatedDuration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-base font-medium text-gray-900">{call.location}</p>
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="text-base font-medium text-gray-900">{call.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="text-base font-medium text-gray-900">{call.assignedTo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="text-base font-medium text-gray-900">{call.reason}</p>
                </div>
              </div>

              {/* Prerequisites and Status */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Prerequisites</p>
                  <ul className="mt-1 space-y-1">
                    {call.prerequisites.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {call.delayReason && (
                  <div className="flex items-start gap-2 text-red-600">
                    <ExclamationCircleIcon className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Delay Reason</p>
                      <p className="text-sm">{call.delayReason}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                Start Service
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Reschedule
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-700">
                Report Issue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingCalls
