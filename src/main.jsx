import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './components/layout/DashboardLayout'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Customers from './pages/Customers.jsx'
import ServiceCalls from './pages/ServiceCalls/ServiceCalls.jsx'
import AllCalls from './pages/ServiceCalls/AllCalls.jsx'
import AllottedCalls from './pages/ServiceCalls/AllottedCalls.jsx'
import NonAllottedCalls from './pages/ServiceCalls/NonAllottedCalls.jsx'
import CompletedCalls from './pages/ServiceCalls/CompletedCalls.jsx'
import PendingCalls from './pages/ServiceCalls/PendingCalls.jsx'
import DeliveryCalls from './pages/ServiceCalls/DeliveryCalls.jsx'
import CollectionCalls from './pages/ServiceCalls/CollectionCalls.jsx'
import NewServiceCall from './pages/ServiceCalls/NewServiceCall.jsx'
import Engineers from './pages/Engineers/Engineers.jsx'
import SeniorEngineers from './pages/Engineers/SeniorEngineers.jsx'
import JuniorEngineers from './pages/Engineers/JuniorEngineers.jsx'
import Billing from './pages/Billing/Billing.jsx'
import ToBeBilled from './pages/Billing/ToBeBilled.jsx'
import ToBeCancelled from './pages/Billing/ToBeCancelled.jsx'
import Reminders from './pages/Reminders/Reminders.jsx'
import Collections from './pages/Reminders/Collections.jsx'
import Expiry from './pages/Reminders/Expiry.jsx'
import Dashboard from './pages/Dashboard/Dashboard'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes with DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<App />} />
          <Route path="/customers" element={<Customers />} />
          
          <Route path="/service-calls" element={<ServiceCalls />}>
            <Route path="all" element={<AllCalls />} />
            <Route path="allotted" element={<AllottedCalls />} />
            <Route path="non-allotted" element={<NonAllottedCalls />} />
            <Route path="completed" element={<CompletedCalls />} />
            <Route path="pending" element={<PendingCalls />} />
            <Route path="delivery" element={<DeliveryCalls />} />
            <Route path="collection" element={<CollectionCalls />} />
            <Route path="new" element={<NewServiceCall />} />
            <Route index element={<Navigate to="all" replace />} />
          </Route>

          <Route path="/engineers" element={<Engineers />}>
            <Route path="senior" element={<SeniorEngineers />} />
            <Route path="junior" element={<JuniorEngineers />} />
            <Route index element={<Navigate to="senior" replace />} />
          </Route>

          <Route path="/billing" element={<Billing />}>
            <Route path="to-be-billed" element={<ToBeBilled />} />
            <Route path="to-be-cancelled" element={<ToBeCancelled />} />
            <Route index element={<Navigate to="to-be-billed" replace />} />
          </Route>

          <Route path="/reminders" element={<Reminders />}>
            <Route path="collections" element={<Collections />} />
            <Route path="expiry" element={<Expiry />} />
            <Route index element={<Navigate to="collections" replace />} />
          </Route>

          {/* Default route */}
          <Route index element={<App />} />
        </Route>

        {/* Catch-all redirect to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
