import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

const laborRates = {
  junior: 500,
  senior: 800,
  specialist: 1200
};

const partMarkup = 0.15; // 15% markup on parts

const CostBreakdown = ({ costs }) => (
  <div className="space-y-3">
    {Object.entries(costs).map(([category, amount]) => (
      <div key={category} className="flex justify-between items-center text-sm">
        <span className="text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
        <span className="font-medium">₹{amount.toLocaleString()}</span>
      </div>
    ))}
    <div className="border-t pt-2 flex justify-between items-center font-medium">
      <span>Total Estimate</span>
      <span className="text-lg">₹{Object.values(costs).reduce((a, b) => a + b, 0).toLocaleString()}</span>
    </div>
  </div>
);

const CostEstimation = ({ serviceType, duration, parts = [] }) => {
  const [engineerLevel, setEngineerLevel] = useState('senior');
  const [additionalCosts, setAdditionalCosts] = useState([]);
  const [newCostDescription, setNewCostDescription] = useState('');
  const [newCostAmount, setNewCostAmount] = useState('');
  const [showAddCost, setShowAddCost] = useState(false);

  const hourlyRates = {
    specialist: 1200,
    senior: 800,
    junior: 500
  };

  const calculateLabor = () => {
    const hours = typeof duration === 'string' ? 
      parseInt(duration.split(' ')[0]) : 
      duration || 2;
    return hourlyRates[engineerLevel] * hours;
  };

  const calculateParts = () => {
    return parts.reduce((total, part) => total + (part.price * (1 + partMarkup)), 0);
  };

  const calculateTotal = () => {
    const labor = calculateLabor();
    const parts = calculateParts();
    const additional = additionalCosts.reduce((sum, cost) => sum + parseFloat(cost.amount), 0);
    const subtotal = labor + parts + additional;
    const tax = subtotal * 0.18; // 18% tax
    return {
      labor,
      parts,
      additional,
      tax: Math.round(tax),
      total: Math.round(subtotal + tax)
    };
  };

  const handleAddCost = (e) => {
    e.preventDefault();
    if (newCostDescription && newCostAmount) {
      setAdditionalCosts([
        ...additionalCosts,
        {
          description: newCostDescription,
          amount: parseFloat(newCostAmount)
        }
      ]);
      setNewCostDescription('');
      setNewCostAmount('');
      setShowAddCost(false);
    }
  };

  const handleRemoveCost = (index) => {
    setAdditionalCosts(additionalCosts.filter((_, i) => i !== index));
  };

  const totals = calculateTotal();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Cost Estimation</h3>
      
      <div className="space-y-6">
        {/* Engineer Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Engineer Level
          </label>
          <select
            value={engineerLevel}
            onChange={(e) => setEngineerLevel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          >
            <option value="junior">Junior Engineer (₹500/hr)</option>
            <option value="senior">Senior Engineer (₹800/hr)</option>
            <option value="specialist">Specialist (₹1200/hr)</option>
          </select>
        </div>

        {/* Parts List */}
        {parts.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Required Parts</h4>
            <div className="space-y-2">
              {parts.map((part, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{part.name}</span>
                  <span>₹{part.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Costs */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-700">Additional Costs</h4>
            <button
              type="button"
              onClick={() => setShowAddCost(true)}
              className="text-sm text-primary hover:text-primary/80"
            >
              + Add Cost
            </button>
          </div>

          {showAddCost && (
            <form
              onSubmit={handleAddCost}
              className="space-y-2 mb-4"
            >
              <input
                type="text"
                placeholder="Description"
                value={newCostDescription}
                onChange={(e) => setNewCostDescription(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Amount"
                  value={newCostAmount}
                  onChange={(e) => setNewCostAmount(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Add
                </button>
              </div>
            </form>
          )}

          {additionalCosts.length > 0 && (
            <div className="space-y-2">
              {additionalCosts.map((cost, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-700">{cost.description}</p>
                    <p className="text-sm text-gray-600">₹{cost.amount}</p>
                  </div>
                  <button
                    onClick={() => handleRemoveCost(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Cost Breakdown */}
        <div className="border-t pt-4">
          <CostBreakdown costs={{
            labor: totals.labor,
            parts: totals.parts,
            additional: totals.additional,
            tax: totals.tax,
            total: totals.total
          }} />
        </div>
      </div>
    </div>
  );
};

export default CostEstimation;
