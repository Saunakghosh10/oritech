import { useState } from 'react'

const Collections = () => {
  const [collections] = useState([
    {
      id: 1,
      customerName: 'Tech Solutions Ltd',
      amount: 25000,
      dueDate: '2024-01-25',
      invoiceNumber: 'INV-2024-001',
      status: 'Overdue',
      contactPerson: 'John Smith',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      customerName: 'Global Systems Inc',
      amount: 18500,
      dueDate: '2024-02-01',
      invoiceNumber: 'INV-2024-002',
      status: 'Due Soon',
      contactPerson: 'Sarah Wilson',
      phone: '+91 98765 43211'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      Overdue: 'bg-red-100 text-red-800',
      'Due Soon': 'bg-yellow-100 text-yellow-800',
      Scheduled: 'bg-blue-100 text-blue-800',
      Collected: 'bg-green-100 text-green-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search collections..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">All Status</option>
          <option value="overdue">Overdue</option>
          <option value="due-soon">Due Soon</option>
          <option value="scheduled">Scheduled</option>
          <option value="collected">Collected</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{collection.customerName}</h3>
                <p className="text-sm text-gray-500">Invoice: {collection.invoiceNumber}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(collection.status)}`}>
                {collection.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-lg font-semibold text-gray-900">₹{collection.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Due Date</p>
                <p className="text-lg font-semibold text-gray-900">{collection.dueDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="text-base text-gray-900">{collection.contactPerson}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-base text-gray-900">{collection.phone}</p>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Mark as Collected
              </button>
              <button className="flex-1 border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors">
                Schedule Follow-up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collections
