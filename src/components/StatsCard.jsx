const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <h2 className="text-gray-600 text-lg mb-2">{title}</h2>
      <p className="text-3xl font-semibold text-primary">{value}</p>
    </div>
  )
}

export default StatsCard
