import { useState } from 'react'
import { ClockIcon, UserPlusIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

const NonAllottedCalls = () => {
  const [nonAllottedCalls] = useState([
    {
      id: 'SC003',
      customerName: 'Innovate Solutions',
      serviceType: 'Maintenance',
      priority: 'High',
      status: 'Pending Allocation',
      requestDate: '2024-01-20',
      preferredDate: '2024-01-23',
      location: 'Bangalore, KA',
      description: 'Urgent maintenance required for production server',
      skillsRequired: ['Server Administration', 'Hardware Repair'],
      estimatedDuration: '4 hours'
    },
    {
      id: 'SC004',
      customerName: 'Digital Corp',
      serviceType: 'Installation',
      priority: 'Medium',
      status: 'New Request',
      requestDate: '2024-01-21',
      preferredDate: '2024-01-24',
      location: 'Chennai, TN',
      description: 'New network setup and configuration',
      skillsRequired: ['Network Configuration', 'System Setup'],
      estimatedDuration: '6 hours'
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
      'Pending Allocation': 'bg-yellow-100 text-yellow-800',
      'New Request': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const [selectedEngineers] = useState([
    { id: 1, name: 'John Engineer', skills: ['Server Administration', 'Hardware Repair'], availability: 'Available' },
    { id: 2, name: 'Sarah Tech', skills: ['Network Configuration', 'System Setup'], availability: 'Busy until 3 PM' },
    { id: 3, name: 'Mike Support', skills: ['Hardware Repair', 'System Setup'], availability: 'Available' }
  ])

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search non-allotted calls..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">Required Skills</option>
          <option value="server">Server Administration</option>
          <option value="network">Network Configuration</option>
          <option value="hardware">Hardware Repair</option>
        </select>
      </div>

      {/* Calls List */}
      <div className="space-y-6">
        {nonAllottedCalls.map((call) => (
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
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Service Type</p>
                <p className="text-base font-medium text-gray-900">{call.serviceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-900">{call.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Duration</p>
                <p className="text-base font-medium text-gray-900">{call.estimatedDuration}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Request Date</p>
                  <p className="text-base font-medium text-gray-900">{call.requestDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Preferred Date</p>
                  <p className="text-base font-medium text-gray-900">{call.preferredDate}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {call.skillsRequired.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{call.description}</p>

            {/* Suggested Engineers */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Suggested Engineers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedEngineers.map((engineer) => (
                  <div
                    key={engineer.id}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{engineer.name}</p>
                      <p className="text-xs text-gray-500">{engineer.availability}</p>
                    </div>
                    <button className="text-primary hover:text-primary/80">
                      <UserPlusIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                <UserPlusIcon className="h-4 w-4" />
                Allot Call
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Find More Engineers
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
                <ExclamationCircleIcon className="h-4 w-4" />
                Put On Hold
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NonAllottedCalls
