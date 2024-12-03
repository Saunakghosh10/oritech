import React, { useState } from 'react';
import { XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

const InvoiceModal = ({ isOpen, onClose, onSubmit, invoice }) => {
  const [items, setItems] = useState(invoice?.items || [{ description: '', amount: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const invoiceData = {
      customerName: formData.get('customerName'),
      serviceType: formData.get('serviceType'),
      status: formData.get('status'),
      dueDate: formData.get('dueDate'),
      items: items,
      amount: items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
    };

    if (invoice) {
      invoiceData.id = invoice.id;
      invoiceData.createdAt = invoice.createdAt;
    }

    onSubmit(invoiceData);
    setItems([{ description: '', amount: '' }]);
  };

  const addItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Name</label>
              <input
                type="text"
                name="customerName"
                defaultValue={invoice?.customerName || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Type</label>
              <input
                type="text"
                name="serviceType"
                defaultValue={invoice?.serviceType || ''}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                defaultValue={invoice?.status || 'pending'}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                name="dueDate"
                defaultValue={invoice?.dueDate || new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Items</label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  placeholder="Item description"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateItem(index, 'amount', e.target.value)}
                  placeholder="Amount"
                  className="w-32 rounded-md border border-gray-300 px-3 py-2"
                />
                {items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
            >
              <PlusIcon className="w-4 h-4 mr-1" />
              Add Item
            </button>
          </div>

          <div className="border-t pt-4">
            <div className="text-right">
              <span className="text-sm font-medium text-gray-700">Total Amount: </span>
              <span className="text-lg font-semibold">₹{calculateTotal().toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {invoice ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal; 