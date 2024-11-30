import { useState } from 'react'

const JuniorEngineers = () => {
  const [engineers] = useState([
    {
      id: 1,
      name: 'Alex Thompson',
      specialization: 'Basic Repairs',
      experience: '2 years',
      status: 'Available',
      currentCalls: 2,
      completedCalls: 45,
      supervisor: 'John Smith',
      rating: 4.2
    },
    {
      id: 2,
      name: 'Emily Davis',
      specialization: 'Installation',
      experience: '1.5 years',
      status: 'Training',
      currentCalls: 1,
      completedCalls: 30,
      supervisor: 'Sarah Johnson',
      rating: 4.0
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      Available: 'bg-green-100 text-green-800',
      Training: 'bg-blue-100 text-blue-800',
      'On Call': 'bg-yellow-100 text-yellow-800',
      'On Leave': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search junior engineers..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="training">Training</option>
          <option value="on-call">On Call</option>
        </select>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineers.map((engineer) => (
          <div key={engineer.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{engineer.name}</h3>
                <p className="text-sm text-gray-500">{engineer.specialization}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(engineer.status)}`}>
                {engineer.status}
              </span>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Experience:</span> {engineer.experience}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Supervisor:</span> {engineer.supervisor}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Current Calls:</span> {engineer.currentCalls}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Completed Calls:</span> {engineer.completedCalls}
              </p>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-600 mr-2">Rating:</span>
                <span className="text-yellow-500">{engineer.rating} ★</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Assign Training
              </button>
              <button className="flex-1 border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors">
                View Progress
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JuniorEngineers
