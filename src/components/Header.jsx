const Header = () => {
  return (
    <header className="bg-primary rounded-lg shadow-lg p-6 flex justify-between items-center">
      <h1 className="text-2xl font-semibold text-white">Service Dashboard</h1>
      <button className="bg-white text-primary px-4 py-2 rounded-md font-medium border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-200">
        Add New Service
      </button>
    </header>
  )
}

export default Header
