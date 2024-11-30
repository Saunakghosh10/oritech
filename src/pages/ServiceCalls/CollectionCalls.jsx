import { useState } from 'react'
import { BanknotesIcon, CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'

const CollectionCalls = () => {
  const [collections] = useState([
    {
      id: 'COL001',
      customerName: 'Tech Solutions Ltd',
      amount: 45000,
      paymentType: 'Cheque',
      chequeDetails: {
        number: 'CHQ-2024-001',
        bank: 'HDFC Bank',
        date: '2024-01-28'
      },
      status: 'Scheduled',
      scheduledDate: '2024-01-25',
      scheduledTime: '11:00 AM',
      location: 'Mumbai, MH',
      assignedTo: 'Sarah Collector',
      contactPerson: 'John Manager',
      contactNumber: '+91 98765 43210',
      notes: 'Collect from accounts department'
    },
    {
      id: 'COL002',
      customerName: 'Global Systems Inc',
      amount: 32000,
      paymentType: 'Cheque',
      chequeDetails: {
        number: 'CHQ-2024-002',
        bank: 'ICICI Bank',
        date: '2024-01-29'
      },
      status: 'In Progress',
      scheduledDate: '2024-01-26',
      scheduledTime: '02:30 PM',
      location: 'Delhi, DL',
      assignedTo: 'Mike Collector',
      contactPerson: 'Sarah Finance',
      contactNumber: '+91 98765 43211',
      notes: 'Call before arriving'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      Scheduled: 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Collected: 'bg-green-100 text-green-800',
      Failed: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search collections..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="in-progress">In Progress</option>
          <option value="collected">Collected</option>
          <option value="failed">Failed</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Collections List */}
      <div className="space-y-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{collection.customerName}</h3>
                <p className="text-sm text-gray-500">ID: {collection.id}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(collection.status)}`}>
                  {collection.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Collection Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BanknotesIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="text-lg font-semibold text-gray-900">₹{collection.amount}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cheque Details</p>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm">Number: {collection.chequeDetails.number}</p>
                    <p className="text-sm">Bank: {collection.chequeDetails.bank}</p>
                    <p className="text-sm">Date: {collection.chequeDetails.date}</p>
                  </div>
                </div>
              </div>

              {/* Schedule Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Time</p>
                    <p className="text-base font-medium text-gray-900">
                      {collection.scheduledDate} at {collection.scheduledTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Collection Location</p>
                    <p className="text-base font-medium text-gray-900">{collection.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="text-base font-medium text-gray-900">{collection.assignedTo}</p>
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="text-base font-medium text-gray-900">{collection.contactPerson}</p>
                  <p className="text-sm text-gray-600">{collection.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-sm text-gray-600 mt-1">{collection.notes}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                Mark as Collected
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Update Status
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

export default CollectionCalls
