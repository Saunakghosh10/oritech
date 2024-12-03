import React from 'react';
import moment from 'moment';

const slaDefinitions = {
  high: {
    responseTime: 2, // hours
    resolutionTime: 24 // hours
  },
  medium: {
    responseTime: 4, // hours
    resolutionTime: 48 // hours
  },
  low: {
    responseTime: 8, // hours
    resolutionTime: 72 // hours
  }
};

const calculateSLAStatus = (createdAt, respondedAt, resolvedAt, priority) => {
  const sla = slaDefinitions[priority];
  const now = moment();
  const created = moment(createdAt);
  
  // Response time calculation
  const responseTime = respondedAt ? 
    moment(respondedAt).diff(created, 'hours', true) : 
    now.diff(created, 'hours', true);
  const responseStatus = responseTime <= sla.responseTime ? 'on-track' : 'breached';
  
  // Resolution time calculation
  const resolutionTime = resolvedAt ? 
    moment(resolvedAt).diff(created, 'hours', true) : 
    now.diff(created, 'hours', true);
  const resolutionStatus = resolutionTime <= sla.resolutionTime ? 'on-track' : 'breached';

  return {
    responseTime: responseTime.toFixed(1),
    resolutionTime: resolutionTime.toFixed(1),
    responseStatus,
    resolutionStatus,
    responseTarget: sla.responseTime,
    resolutionTarget: sla.resolutionTime
  };
};

const StatusBadge = ({ status }) => {
  const colors = {
    'on-track': 'bg-green-100 text-green-800',
    'at-risk': 'bg-yellow-100 text-yellow-800',
    'breached': 'bg-red-100 text-red-800'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.replace('-', ' ').toUpperCase()}
    </span>
  );
};

const ProgressBar = ({ current, target, status }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const colors = {
    'on-track': 'bg-green-500',
    'at-risk': 'bg-yellow-500',
    'breached': 'bg-red-500'
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${colors[status]}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const SLATracking = ({ serviceCall }) => {
  const slaStatus = calculateSLAStatus(
    serviceCall.createdAt,
    serviceCall.respondedAt,
    serviceCall.resolvedAt,
    serviceCall.priority
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">SLA Tracking</h3>
          <p className="text-sm text-gray-500">
            Service Level Agreement metrics and status
          </p>
        </div>

        {/* Response Time */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Response Time</h4>
              <p className="text-xs text-gray-500">
                Target: {slaStatus.responseTarget} hours
              </p>
            </div>
            <StatusBadge status={slaStatus.responseStatus} />
          </div>
          <div className="space-y-2">
            <ProgressBar
              current={slaStatus.responseTime}
              target={slaStatus.responseTarget}
              status={slaStatus.responseStatus}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{slaStatus.responseTime} hours elapsed</span>
              <span>{slaStatus.responseTarget} hours target</span>
            </div>
          </div>
        </div>

        {/* Resolution Time */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Resolution Time</h4>
              <p className="text-xs text-gray-500">
                Target: {slaStatus.resolutionTarget} hours
              </p>
            </div>
            <StatusBadge status={slaStatus.resolutionStatus} />
          </div>
          <div className="space-y-2">
            <ProgressBar
              current={slaStatus.resolutionTime}
              target={slaStatus.resolutionTarget}
              status={slaStatus.resolutionStatus}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{slaStatus.resolutionTime} hours elapsed</span>
              <span>{slaStatus.resolutionTarget} hours target</span>
            </div>
          </div>
        </div>

        {/* SLA Definitions */}
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">SLA Definitions</h4>
          <div className="space-y-2">
            {Object.entries(slaDefinitions).map(([priority, times]) => (
              <div key={priority} className="text-sm">
                <span className="capitalize font-medium text-gray-700">{priority}:</span>
                <span className="text-gray-500 ml-2">
                  Response: {times.responseTime}h, Resolution: {times.resolutionTime}h
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SLATracking;
