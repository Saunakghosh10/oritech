import { useState } from 'react'
import { StarIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

const CompletedCalls = () => {
  const [completedCalls] = useState([
    {
      id: 'SC005',
      customerName: 'Tech Solutions Ltd',
      serviceType: 'Repair',
      completedBy: 'John Engineer',
      completionDate: '2024-01-18',
      duration: '3.5 hours',
      rating: 5,
      feedback: 'Excellent service, very professional',
      billAmount: 12500,
      billStatus: 'Generated',
      partsUsed: [
        { name: 'Power Supply', quantity: 1, cost: 2500 },
        { name: 'RAM Module', quantity: 2, cost: 3000 }
      ]
    },
    {
      id: 'SC006',
      customerName: 'Global Systems Inc',
      serviceType: 'Installation',
      completedBy: 'Sarah Tech',
      completionDate: '2024-01-19',
      duration: '5 hours',
      rating: 4,
      feedback: 'Good work, but took longer than expected',
      billAmount: 15000,
      billStatus: 'Pending',
      partsUsed: [
        { name: 'Network Card', quantity: 1, cost: 1800 },
        { name: 'Cables', quantity: 5, cost: 500 }
      ]
    }
  ])

  const getBillStatusColor = (status) => {
    const colors = {
      Generated: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      'On Hold': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      index < rating ? (
        <StarIconSolid key={index} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={index} className="h-5 w-5 text-gray-300" />
      )
    ))
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search completed calls..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Engineers</option>
          <option value="john">John Engineer</option>
          <option value="sarah">Sarah Tech</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">Bill Status</option>
          <option value="generated">Generated</option>
          <option value="pending">Pending</option>
          <option value="on-hold">On Hold</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Completed Calls List */}
      <div className="space-y-6">
        {completedCalls.map((call) => (
          <div key={call.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{call.customerName}</h3>
                <p className="text-sm text-gray-500">ID: {call.id}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBillStatusColor(call.billStatus)}`}>
                  Bill {call.billStatus}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Service Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="text-base font-medium text-gray-900">{call.serviceType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Completed By</p>
                  <p className="text-base font-medium text-gray-900">{call.completedBy}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="text-base font-medium text-gray-900">{call.duration}</p>
                  </div>
                </div>
              </div>

              {/* Parts Used */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Parts Used</p>
                <div className="space-y-2">
                  {call.partsUsed.map((part, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{part.name} x{part.quantity}</span>
                      <span className="font-medium">₹{part.cost}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total Bill</span>
                      <span>₹{call.billAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <div className="mb-2">
                  <p className="text-sm text-gray-500">Customer Rating</p>
                  <div className="flex gap-1 mt-1">
                    {renderStars(call.rating)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Feedback</p>
                  <p className="text-sm text-gray-600 mt-1">{call.feedback}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                <DocumentTextIcon className="h-4 w-4" />
                View Report
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Generate Bill
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
                Print Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompletedCalls
