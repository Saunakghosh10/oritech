import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

const ServiceCallsCharts = () => {
  const [chartDimensions, setChartDimensions] = useState({ width: '100%', height: 300 })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) { // sm
        setChartDimensions({ width: '100%', height: 250 })
      } else if (width < 1024) { // lg
        setChartDimensions({ width: '100%', height: 300 })
      } else {
        setChartDimensions({ width: '100%', height: 350 })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', completed: 45, pending: 15, cancelled: 5 },
    { month: 'Feb', completed: 52, pending: 18, cancelled: 3 },
    { month: 'Mar', completed: 48, pending: 12, cancelled: 4 },
    { month: 'Apr', completed: 55, pending: 20, cancelled: 6 },
    { month: 'May', completed: 49, pending: 16, cancelled: 2 },
    { month: 'Jun', completed: 58, pending: 14, cancelled: 4 }
  ]

  const statusDistribution = [
    { name: 'Completed', value: 58, color: '#4CAF50' },
    { name: 'Pending', value: 14, color: '#FFA726' },
    { name: 'In Progress', value: 20, color: '#42A5F5' },
    { name: 'Cancelled', value: 8, color: '#EF5350' }
  ]

  const priorityTrend = [
    { date: '1/1', high: 8, medium: 15, low: 10 },
    { date: '1/2', high: 10, medium: 12, low: 8 },
    { date: '1/3', high: 6, medium: 18, low: 12 },
    { date: '1/4', high: 9, medium: 14, low: 9 },
    { date: '1/5', high: 7, medium: 16, low: 11 }
  ]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Monthly Service Calls */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Service Calls</h3>
          <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" name="Completed" fill="#4CAF50" />
              <Bar dataKey="pending" name="Pending" fill="#FFA726" />
              <Bar dataKey="cancelled" name="Cancelled" fill="#EF5350" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Current Status Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Status Distribution</h3>
          <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Trend */}
        <div className="bg-white p-4 rounded-lg shadow-sm lg:col-span-2 xl:col-span-1">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Trend</h3>
          <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
            <LineChart data={priorityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="high"
                name="High Priority"
                stroke="#EF5350"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="medium"
                name="Medium Priority"
                stroke="#FFA726"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="low"
                name="Low Priority"
                stroke="#4CAF50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default ServiceCallsCharts
