import { useState } from 'react'

const ToBeCancelled = () => {
  const [bills] = useState([
    {
      id: 'BILL003',
      customerName: 'Innovate Corp',
      serviceType: 'Equipment Repair',
      date: '2024-01-10',
      amount: 5600,
      reason: 'Service not completed',
      requestedBy: 'John Manager',
      status: 'Pending Approval'
    },
    {
      id: 'BILL004',
      customerName: 'Dynamic Solutions',
      serviceType: 'Installation',
      date: '2024-01-12',
      amount: 7200,
      reason: 'Customer disputed charges',
      requestedBy: 'Sarah Admin',
      status: 'Under Review'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      'Pending Approval': 'bg-yellow-100 text-yellow-800',
      'Under Review': 'bg-blue-100 text-blue-800',
      Approved: 'bg-green-100 text-green-800',
      Rejected: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search cancellation requests..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="pending">Pending Approval</option>
          <option value="review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Cancellation Requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bills.map((bill) => (
          <div key={bill.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{bill.customerName}</h3>
                <p className="text-sm text-gray-500">Bill ID: {bill.id}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bill.status)}`}>
                {bill.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Service Type:</span>
                <span className="text-sm font-medium">{bill.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="text-sm font-medium">₹{bill.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Date:</span>
                <span className="text-sm font-medium">{bill.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Requested By:</span>
                <span className="text-sm font-medium">{bill.requestedBy}</span>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-600">Reason for Cancellation:</span>
                <p className="text-sm font-medium mt-1">{bill.reason}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
                Approve
              </button>
              <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ToBeCancelled
