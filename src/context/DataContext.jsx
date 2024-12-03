import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Initialize state with localStorage data or defaults
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [serviceCalls, setServiceCalls] = useState(() => {
    const saved = localStorage.getItem('serviceCalls');
    return saved ? JSON.parse(saved) : [];
  });

  const [engineers, setEngineers] = useState(() => {
    const saved = localStorage.getItem('engineers');
    return saved ? JSON.parse(saved) : [];
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('serviceCalls', JSON.stringify(serviceCalls));
  }, [serviceCalls]);

  useEffect(() => {
    localStorage.setItem('engineers', JSON.stringify(engineers));
  }, [engineers]);

  // Customer operations
  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id, data) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === id ? { ...customer, ...data } : customer
    ));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(customer => customer.id !== id));
  };

  // Service Call operations
  const addServiceCall = (serviceCall) => {
    const newServiceCall = {
      ...serviceCall,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: serviceCall.status || 'pending'
    };
    setServiceCalls(prev => [...prev, newServiceCall]);
    return newServiceCall;
  };

  const updateServiceCall = (id, data) => {
    setServiceCalls(prev => prev.map(call => 
      call.id === id ? { ...call, ...data } : call
    ));
  };

  const deleteServiceCall = (id) => {
    setServiceCalls(prev => prev.filter(call => call.id !== id));
  };

  // Engineer operations
  const addEngineer = (engineer) => {
    const newEngineer = {
      ...engineer,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: engineer.status || 'available'
    };
    setEngineers(prev => [...prev, newEngineer]);
    return newEngineer;
  };

  const updateEngineer = (id, data) => {
    setEngineers(prev => prev.map(engineer => 
      engineer.id === id ? { ...engineer, ...data } : engineer
    ));
  };

  const deleteEngineer = (id) => {
    setEngineers(prev => prev.filter(engineer => engineer.id !== id));
  };

  // Report generation
  const generateReport = (type, dateRange) => {
    switch (type) {
      case 'customers':
        return {
          title: 'Customer Report',
          data: customers,
          summary: {
            total: customers.length,
            active: customers.filter(c => c.status === 'active').length,
            new: customers.filter(c => {
              const createdDate = new Date(c.createdAt);
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
              return createdDate > thirtyDaysAgo;
            }).length
          }
        };

      case 'serviceCalls':
        return {
          title: 'Service Calls Report',
          data: serviceCalls,
          summary: {
            total: serviceCalls.length,
            pending: serviceCalls.filter(c => c.status === 'pending').length,
            completed: serviceCalls.filter(c => c.status === 'completed').length,
            inProgress: serviceCalls.filter(c => c.status === 'in-progress').length
          }
        };

      case 'engineers':
        return {
          title: 'Engineers Report',
          data: engineers,
          summary: {
            total: engineers.length,
            available: engineers.filter(e => e.status === 'available').length,
            busy: engineers.filter(e => e.status === 'busy').length,
            offDuty: engineers.filter(e => e.status === 'off-duty').length
          }
        };

      default:
        return null;
    }
  };

  return (
    <DataContext.Provider value={{
      customers,
      serviceCalls,
      engineers,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      addServiceCall,
      updateServiceCall,
      deleteServiceCall,
      addEngineer,
      updateEngineer,
      deleteEngineer,
      generateReport
    }}>
      {children}
    </DataContext.Provider>
  );
};
