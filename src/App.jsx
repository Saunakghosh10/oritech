import { useState } from 'react'
import DashboardLayout from './components/layout/DashboardLayout'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import CustomersTable from './components/CustomersTable'

function App() {
  const [stats] = useState({
    totalCustomers: 150,
    activeServices: 45,
    pendingCalls: 12,
    completedCalls: 89
  })

  const [customers] = useState([
    {
      name: 'John Doe',
      serviceType: 'Maintenance',
      status: 'Active',
      lastUpdate: '2024-01-20'
    },
    {
      name: 'Jane Smith',
      serviceType: 'Repair',
      status: 'Pending',
      lastUpdate: '2024-01-19'
    }
  ])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Customers" value={stats.totalCustomers} />
          <StatsCard title="Active Services" value={stats.activeServices} />
          <StatsCard title="Pending Calls" value={stats.pendingCalls} />
          <StatsCard title="Completed Calls" value={stats.completedCalls} />
        </div>

        <CustomersTable customers={customers} />
      </div>
    </DashboardLayout>
  )
}

export default App
