import React from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useTodos from '../../hooks/useTodos';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarView({ onEventClick }) {
  const { todos } = useTodos();

  // Mapping todos with due dates to big-calendar events
  const events = todos
    .filter((t) => t.dueDate)
    .map((todo) => {
      const date = new Date(todo.dueDate);
      return {
        id: todo._id,
        title: todo.title,
        start: date,
        end: date,
        allDay: true,
        resource: todo,
      };
    });

  const eventPropGetter = (event) => {
    const todo = event.resource;
    const style = {
      border: 'none',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    };

    if (todo.completed) {
      style.backgroundColor = '#94A3B8'; // Slate-400
      style.textDecoration = 'line-through';
      style.opacity = 0.70;
    } else {
      if (todo.priority === 'high') {
        style.backgroundColor = '#F43F5E'; // Rose-500
      } else if (todo.priority === 'medium') {
        style.backgroundColor = '#F59E0B'; // Amber-500
      } else {
        style.backgroundColor = '#10B981'; // Emerald-500
      }
    }

    return { style };
  };

  return (
    <div className="p-4 bg-white dark:bg-cardDark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 620 }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={(event) => onEventClick && onEventClick(event.resource)}
        views={['month', 'week', 'day']}
      />
    </div>
  );
}
