import React from 'react';

// Common service templates data
export const serviceTemplates = [
  {
    id: 1,
    name: 'Routine Maintenance',
    description: 'Standard maintenance check and service',
    estimatedDuration: '2 hours',
    priority: 'medium',
    checklistItems: [
      'Check equipment functionality',
      'Clean filters',
      'Lubricate moving parts',
      'Test safety features',
      'Performance optimization'
    ],
    requiredTools: ['Basic toolkit', 'Cleaning supplies', 'Diagnostic equipment'],
    estimatedCost: '₹2000'
  },
  {
    id: 2,
    name: 'Emergency Repair',
    description: 'Urgent repair for critical equipment failure',
    estimatedDuration: '4 hours',
    priority: 'high',
    checklistItems: [
      'Initial diagnosis',
      'Emergency repairs',
      'System testing',
      'Safety verification',
      'Performance validation'
    ],
    requiredTools: ['Advanced toolkit', 'Spare parts', 'Testing equipment'],
    estimatedCost: '₹5000'
  },
  {
    id: 3,
    name: 'Installation Setup',
    description: 'New equipment installation and configuration',
    estimatedDuration: '6 hours',
    priority: 'medium',
    checklistItems: [
      'Site preparation',
      'Equipment unpacking',
      'Installation',
      'Configuration',
      'Testing and validation'
    ],
    requiredTools: ['Installation kit', 'Configuration tools', 'Testing equipment'],
    estimatedCost: '₹8000'
  }
];

const ServiceTemplateCard = ({ template, onSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          template.priority === 'high' 
            ? 'bg-red-100 text-red-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {template.priority}
        </span>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700">Estimated Duration:</p>
          <p className="text-sm text-gray-600">{template.estimatedDuration}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Checklist:</p>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            {template.checklistItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-700">Required Tools:</p>
          <p className="text-sm text-gray-600">{template.requiredTools.join(', ')}</p>
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <p className="text-lg font-semibold text-gray-900">{template.estimatedCost}</p>
          <button
            onClick={() => onSelect(template)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
};

const ServiceTemplates = ({ onSelectTemplate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {serviceTemplates.map(template => (
        <ServiceTemplateCard
          key={template.id}
          template={template}
          onSelect={onSelectTemplate}
        />
      ))}
    </div>
  );
};

export default ServiceTemplates;
