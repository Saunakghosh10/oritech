import { useState } from 'react'

const Expiry = () => {
  const [expiryReminders] = useState([
    {
      id: 1,
      customerName: 'Tech Solutions Ltd',
      contractType: 'Annual Maintenance',
      expiryDate: '2024-02-15',
      status: 'Expiring Soon',
      lastRenewalDate: '2023-02-15',
      contractValue: 45000,
      contactPerson: 'John Smith',
      phone: '+91 98765 43210'
    },
    {
      id: 2,
      customerName: 'Global Systems Inc',
      contractType: 'Equipment Warranty',
      expiryDate: '2024-03-01',
      status: 'Upcoming',
      lastRenewalDate: '2023-03-01',
      contractValue: 32000,
      contactPerson: 'Sarah Wilson',
      phone: '+91 98765 43211'
    }
  ])

  const getStatusColor = (status) => {
    const colors = {
      'Expiring Soon': 'bg-red-100 text-red-800',
      Upcoming: 'bg-yellow-100 text-yellow-800',
      Renewed: 'bg-green-100 text-green-800',
      Expired: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getDaysUntilExpiry = (expiryDate) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search expiry reminders..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">Contract Type</option>
          <option value="amc">Annual Maintenance</option>
          <option value="warranty">Equipment Warranty</option>
          <option value="license">Software License</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
          <option value="">Status</option>
          <option value="expiring-soon">Expiring Soon</option>
          <option value="upcoming">Upcoming</option>
          <option value="renewed">Renewed</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Timeline View */}
      <div className="space-y-6">
        {expiryReminders.map((reminder) => (
          <div key={reminder.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{reminder.customerName}</h3>
                <p className="text-sm text-gray-500">{reminder.contractType}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reminder.status)}`}>
                  {reminder.status}
                </span>
                <p className="text-sm mt-2">
                  {getDaysUntilExpiry(reminder.expiryDate)} days remaining
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Expiry Date</p>
                <p className="text-base font-medium text-gray-900">{reminder.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Renewal</p>
                <p className="text-base font-medium text-gray-900">{reminder.lastRenewalDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contract Value</p>
                <p className="text-base font-medium text-gray-900">₹{reminder.contractValue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="text-base font-medium text-gray-900">{reminder.contactPerson}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors">
                Process Renewal
              </button>
              <button className="flex-1 border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors">
                Send Reminder
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors">
                View Contract
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Expiry
