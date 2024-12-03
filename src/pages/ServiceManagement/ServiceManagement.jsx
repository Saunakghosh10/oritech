import React, { useState, useCallback } from 'react';
import ServiceScheduler from '../../components/ServiceScheduler/ServiceScheduler';
import PriorityManagement from '../../components/PriorityManagement/PriorityManagement';
import CostEstimation from '../../components/CostEstimation/CostEstimation';
import SLATracking from '../../components/SLATracking/SLATracking';
import ServiceFeedback from '../../components/ServiceFeedback/ServiceFeedback';
import moment from 'moment';

const ServiceManagement = () => {
  // Sample data - replace with actual data from your backend
  const [scheduledEvents, setScheduledEvents] = useState([
    {
      id: 1,
      title: 'Routine Maintenance',
      start: moment().add(1, 'days').hours(10).minutes(0).toDate(),
      end: moment().add(1, 'days').hours(12).minutes(0).toDate(),
      customerName: 'ABC Corp',
      priority: 'medium',
      createdAt: moment().subtract(2, 'hours').toDate(),
      respondedAt: moment().subtract(1, 'hours').toDate(),
      parts: [
        { name: 'Air Filter', price: 1200 },
        { name: 'Oil Filter', price: 800 }
      ],
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Emergency Repair',
      start: moment().add(2, 'days').hours(14).minutes(0).toDate(),
      end: moment().add(2, 'days').hours(16).minutes(0).toDate(),
      customerName: 'XYZ Industries',
      priority: 'high',
      createdAt: moment().subtract(1, 'hours').toDate(),
      parts: [
        { name: 'Circuit Board', price: 15000 },
        { name: 'Power Supply', price: 8000 }
      ],
      status: 'in-progress'
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [priorityStats, setPriorityStats] = useState({
    high: {
      count: 5,
      openCases: 2,
      avgResolutionTime: '4 hours'
    },
    medium: {
      count: 12,
      openCases: 5,
      avgResolutionTime: '2 days'
    },
    low: {
      count: 8,
      openCases: 3,
      avgResolutionTime: '5 days'
    }
  });

  // Event handlers
  const handleEventSelect = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleSlotSelect = useCallback(({ start, end, title }) => {
    console.log('Creating new service:', { start, end, title });
    
    const newEvent = {
      id: Date.now(),
      title: title || 'New Service Call',
      start: new Date(start),
      end: new Date(end),
      customerName: 'New Customer',
      priority: 'medium',
      createdAt: new Date(),
      status: 'scheduled',
      parts: []
    };

    console.log('New event:', newEvent);
    setScheduledEvents(prevEvents => {
      const updatedEvents = [...prevEvents, newEvent];
      console.log('Updated events:', updatedEvents);
      return updatedEvents;
    });
    setSelectedEvent(newEvent);

    // Show a success message
    alert('New service call created successfully!');
  }, []);

  const handleEventDrop = useCallback(({ event, start, end }) => {
    setScheduledEvents(prev =>
      prev.map(ev =>
        ev.id === event.id
          ? { ...ev, start, end }
          : ev
      )
    );
  }, []);

  const handleEventResize = useCallback(({ event, start, end }) => {
    setScheduledEvents(prev =>
      prev.map(ev =>
        ev.id === event.id
          ? { ...ev, start, end }
          : ev
      )
    );
  }, []);

  const handleStatusChange = useCallback((eventId, newStatus) => {
    setScheduledEvents(prev =>
      prev.map(ev =>
        ev.id === eventId
          ? { ...ev, status: newStatus }
          : ev
      )
    );
  }, []);

  const handleFeedbackSubmit = useCallback((feedback) => {
    if (selectedEvent) {
      setScheduledEvents(prev =>
        prev.map(ev =>
          ev.id === selectedEvent.id
            ? { ...ev, feedback, status: 'completed' }
            : ev
        )
      );

      // Update priority stats
      setPriorityStats(prev => {
        const priority = selectedEvent.priority;
        return {
          ...prev,
          [priority]: {
            ...prev[priority],
            count: prev[priority].count,
            openCases: prev[priority].openCases - 1
          }
        };
      });
    }
  }, [selectedEvent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Service Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Schedule and manage service calls based on priority and availability
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Calendar */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Service Schedule</h3>
              <ServiceScheduler
                events={scheduledEvents}
                onEventSelect={handleEventSelect}
                onSlotSelect={handleSlotSelect}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
              />
            </div>

            {/* Selected Event Details */}
            {selectedEvent && (
              <div className="space-y-6">
                {/* Event Actions */}
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {selectedEvent.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {selectedEvent.customerName} - {moment(selectedEvent.start).format('MMMM D, YYYY')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <select
                        value={selectedEvent.status}
                        onChange={(e) => handleStatusChange(selectedEvent.id, e.target.value)}
                        className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cost Estimation */}
                  <CostEstimation
                    serviceType={selectedEvent.title}
                    duration={moment(selectedEvent.end).diff(moment(selectedEvent.start), 'hours')}
                    parts={selectedEvent.parts}
                  />

                  {/* SLA Tracking */}
                  <SLATracking serviceCall={selectedEvent} />
                </div>

                {/* Service Feedback - only show for completed services */}
                {selectedEvent.status === 'completed' && !selectedEvent.feedback && (
                  <ServiceFeedback
                    serviceCall={selectedEvent}
                    onSubmitFeedback={handleFeedbackSubmit}
                  />
                )}

                {/* Show submitted feedback if available */}
                {selectedEvent.feedback && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Submitted Feedback</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Overall Rating</p>
                          <p className="mt-1">{selectedEvent.feedback.rating} / 5</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Service Quality</p>
                          <p className="mt-1">{selectedEvent.feedback.serviceQuality} / 5</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Engineer Professionalism</p>
                          <p className="mt-1">{selectedEvent.feedback.engineerProfessionalism} / 5</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Timely Completion</p>
                          <p className="mt-1">{selectedEvent.feedback.timelyCompletion} / 5</p>
                        </div>
                      </div>
                      {selectedEvent.feedback.comment && (
                        <div>
                          <p className="text-sm font-medium text-gray-500">Comments</p>
                          <p className="mt-1 text-sm text-gray-700">{selectedEvent.feedback.comment}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <PriorityManagement priorityStats={priorityStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
