import { useState } from 'react'

const AllCalls = () => {
  const [serviceCalls] = useState([
    {
      id: 1,
      customerName: 'John Doe',
      serviceType: 'Repair',
      status: 'Pending',
      engineer: 'Mike Smith',
      date: '2024-01-20',
      priority: 'High'
    },
    {
      id: 2,
      customerName: 'Jane Smith',
      serviceType: 'Maintenance',
      status: 'Completed',
      engineer: 'Sarah Johnson',
      date: '2024-01-19',
      priority: 'Medium'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityColor = (priority) => {
    const colors = {
      High: 'text-red-600',
      Medium: 'text-yellow-600',
      Low: 'text-green-600'
    }
    return colors[priority] || 'text-gray-600'
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search service calls..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* Service Calls Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Engineer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {serviceCalls.map((call) => (
              <tr key={call.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{call.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.serviceType}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.engineer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{call.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`text-sm font-medium ${getPriorityColor(call.priority)}`}>
                    {call.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllCalls
