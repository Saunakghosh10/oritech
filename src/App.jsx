import React from 'react';
import { DataProvider } from './context/DataContext';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';

// Import all pages
import Dashboard from './pages/Dashboard/Dashboard';
import Customers from './pages/Customers/Customers';
import ServiceCalls from './pages/ServiceCalls/ServiceCalls';
import Engineers from './pages/Engineers/Engineers';
import Billing from './pages/Billing/Billing';
import Reminders from './pages/Reminders/Reminders';

function App() {
  return (
    <DataProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/service-calls" element={<ServiceCalls />} />
          <Route path="/engineers" element={<Engineers />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/reminders" element={<Reminders />} />
        </Routes>
      </DashboardLayout>
    </DataProvider>
  );
}

export default App;
