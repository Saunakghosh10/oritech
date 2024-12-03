import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const eventStyleGetter = (event) => {
  const style = {
    backgroundColor: '#4F46E5', // default color
    borderRadius: '4px',
    opacity: 0.8,
    color: 'white',
    border: '0',
    display: 'block'
  };

  // Color based on priority
  switch (event.priority) {
    case 'high':
      style.backgroundColor = '#DC2626'; // red
      break;
    case 'medium':
      style.backgroundColor = '#F59E0B'; // yellow
      break;
    case 'low':
      style.backgroundColor = '#10B981'; // green
      break;
    default:
      break;
  }

  // Adjust opacity based on status
  switch (event.status) {
    case 'completed':
      style.opacity = 0.5;
      break;
    case 'cancelled':
      style.opacity = 0.3;
      style.textDecoration = 'line-through';
      break;
    case 'in-progress':
      style.opacity = 1;
      break;
    default:
      break;
  }

  return { style };
};

const customDayPropGetter = (date) => {
  const today = moment().startOf('day');
  const isToday = moment(date).isSame(today, 'day');
  
  return {
    className: isToday ? 'bg-primary/5' : '',
  };
};

const ServiceScheduler = ({
  events,
  onEventSelect,
  onSlotSelect,
  onEventDrop,
  onEventResize
}) => {
  const handleSelectSlot = (slotInfo) => {
    console.log('Slot selected:', slotInfo);
    const title = prompt('Enter service title:');
    if (title) {
      onSlotSelect({
        start: slotInfo.start,
        end: slotInfo.end,
        title
      });
    }
  };

  const handleEventSelect = (event) => {
    console.log('Event selected:', event);
    onEventSelect(event);
  };

  const handleEventDrop = (dropInfo) => {
    console.log('Event dropped:', dropInfo);
    onEventDrop(dropInfo);
  };

  const handleEventResize = (resizeInfo) => {
    console.log('Event resized:', resizeInfo);
    onEventResize(resizeInfo);
  };

  const [view, setView] = useState('week');

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-md p-4">
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        view={view}
        onView={setView}
        selectable
        resizable
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSelectSlot}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        eventPropGetter={eventStyleGetter}
        dayPropGetter={customDayPropGetter}
        views={['month', 'week', 'day']}
        step={30}
        timeslots={2}
        defaultView="week"
        toolbar={true}
        popup
        components={{
          event: (props) => (
            <div className="p-1">
              <div className="font-medium">{props.title}</div>
              {props.event.customerName && (
                <div className="text-xs">{props.event.customerName}</div>
              )}
            </div>
          )
        }}
        tooltipAccessor={(event) => `
          ${event.title}
          Customer: ${event.customerName}
          Priority: ${event.priority}
          Status: ${event.status}
        `}
      />
    </div>
  );
};

export default ServiceScheduler;
