import { useState } from 'react'
import { TruckIcon, MapPinIcon, ClockIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

const DeliveryCalls = () => {
  const [deliveries] = useState([
    {
      id: 'DEL001',
      customerName: 'Tech Solutions Ltd',
      itemType: 'Hardware',
      status: 'Out for Delivery',
      scheduledDate: '2024-01-25',
      scheduledTime: '10:00 AM - 12:00 PM',
      location: 'Mumbai, MH',
      assignedTo: 'John Driver',
      items: [
        { name: 'Server Unit', quantity: 1, serialNumber: 'SRV-2024-001' },
        { name: 'Network Switch', quantity: 2, serialNumber: 'NSW-2024-002' }
      ],
      documents: ['Delivery Challan', 'Warranty Card', 'Invoice'],
      specialInstructions: 'Requires loading dock access'
    },
    {
      id: 'DEL002',
      customerName: 'Global Systems Inc',
      itemType: 'Equipment',
      status: 'Scheduled',
      scheduledDate: '2024-01-26',
      scheduledTime: '02:00 PM - 04:00 PM',
      location: 'Delhi, DL',
      assignedTo: 'Mike Carrier',
      items: [
        { name: 'UPS System', quantity: 1, serialNumber: 'UPS-2024-003' },
        { name: 'Battery Pack', quantity: 4, serialNumber: 'BAT-2024-004' }
      ],
      documents: ['Installation Guide', 'Warranty Card', 'Invoice'],
      specialInstructions: 'Heavy equipment, crane required'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      'Out for Delivery': 'bg-blue-100 text-blue-800',
      Scheduled: 'bg-yellow-100 text-yellow-800',
      Delivered: 'bg-green-100 text-green-800',
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
          placeholder="Search deliveries..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="out-for-delivery">Out for Delivery</option>
          <option value="scheduled">Scheduled</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Deliveries List */}
      <div className="space-y-6">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{delivery.customerName}</h3>
                <p className="text-sm text-gray-500">ID: {delivery.id}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(delivery.status)}`}>
                  {delivery.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {/* Schedule Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled Time</p>
                    <p className="text-base font-medium text-gray-900">
                      {delivery.scheduledDate}<br />
                      {delivery.scheduledTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Location</p>
                    <p className="text-base font-medium text-gray-900">{delivery.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TruckIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Assigned To</p>
                    <p className="text-base font-medium text-gray-900">{delivery.assignedTo}</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Items for Delivery</p>
                <div className="space-y-2">
                  {delivery.items.map((item, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span>x{item.quantity}</span>
                      </div>
                      <p className="text-gray-500">S/N: {item.serialNumber}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents and Instructions */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Required Documents</p>
                  <div className="flex flex-wrap gap-2">
                    {delivery.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                      >
                        <DocumentTextIcon className="h-4 w-4" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Special Instructions</p>
                  <p className="text-sm text-gray-600 mt-1">{delivery.specialInstructions}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary/90">
                Mark as Delivered
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-primary text-primary rounded hover:bg-primary/10">
                Update Status
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700">
                Print Documents
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryCalls
