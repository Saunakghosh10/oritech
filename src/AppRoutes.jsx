import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Customers from './pages/Customers/Customers';
import ServiceCalls from './pages/ServiceCalls/ServiceCalls';
import Engineers from './pages/Engineers/Engineers';
import Billing from './pages/Billing/Billing';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/service-calls" element={<ServiceCalls />} />
      <Route path="/engineers" element={<Engineers />} />
      <Route path="/billing" element={<Billing />} />
    </Routes>
  );
};

export default AppRoutes;
