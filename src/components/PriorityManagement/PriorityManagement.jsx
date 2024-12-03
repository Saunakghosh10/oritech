import React from 'react';

const priorityLevels = {
  high: {
    name: 'High',
    description: 'Critical issues requiring immediate attention',
    responseTime: '< 2 hours',
    color: 'bg-red-100 text-red-800 border-red-300',
    icon: (
      <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    )
  },
  medium: {
    name: 'Medium',
    description: 'Important issues requiring attention within standard timeframe',
    responseTime: '< 24 hours',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: (
      <svg className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm0-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
      </svg>
    )
  },
  low: {
    name: 'Low',
    description: 'Non-critical issues that can be addressed during normal operations',
    responseTime: '< 72 hours',
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: (
      <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    )
  }
};

const PriorityCard = ({ level, stats }) => {
  const priorityInfo = priorityLevels[level];
  
  return (
    <div className={`rounded-lg border p-4 ${priorityInfo.color}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {priorityInfo.icon}
          <h3 className="text-lg font-semibold">{priorityInfo.name} Priority</h3>
        </div>
        <span className="text-2xl font-bold">{stats.count}</span>
      </div>
      <p className="text-sm mb-2">{priorityInfo.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Response Time:</span>
          <span className="font-medium">{priorityInfo.responseTime}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Open Cases:</span>
          <span className="font-medium">{stats.openCases}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Avg Resolution Time:</span>
          <span className="font-medium">{stats.avgResolutionTime}</span>
        </div>
      </div>
    </div>
  );
};

const PriorityManagement = ({ priorityStats }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(priorityLevels).map(([level]) => (
          <PriorityCard
            key={level}
            level={level}
            stats={priorityStats[level]}
          />
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Priority Guidelines</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-800">High Priority</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
              <li>Critical system failures</li>
              <li>Safety-related issues</li>
              <li>Production-stopping problems</li>
              <li>Data loss scenarios</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-yellow-800">Medium Priority</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
              <li>System performance issues</li>
              <li>Non-critical bugs</li>
              <li>Feature requests from key stakeholders</li>
              <li>Scheduled maintenance</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-800">Low Priority</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-4 space-y-1">
              <li>Minor UI/UX issues</li>
              <li>Documentation updates</li>
              <li>General inquiries</li>
              <li>Feature enhancement requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityManagement;
