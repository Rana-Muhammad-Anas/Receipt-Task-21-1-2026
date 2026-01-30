import React, { useRef, useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({ onDateSelect, selectedDate }) {
  const calendarRef = useRef(null);

  // Navigate calendar when selectedDate changes from input
  useEffect(() => {
    if (selectedDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  // Handle window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.render(); // Re-render on resize
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDateClick = (info) => {
    const formattedDate = info.dateStr;
    onDateSelect(formattedDate);
  };

  // Helper function to normalize dates for comparison
  const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  return (
    <div className="calendar-container w-full overflow-hidden">
      <Fullcalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev",
          center: "title",
          end: "next",
        }}
        buttonText={{
          today: "Today",
        }}
        // Responsive height
        height={"auto"}
        // Responsive aspect ratio
        aspectRatio={1.5}
        // Mobile-friendly settings
        initialDate={selectedDate || new Date()}
        dateClick={handleDateClick}
        selectable={true}
        // Responsive header toolbar
        customButtons={{
          today: {
            text: 'Today',
            click: function() {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.today();
              onDateSelect(new Date().toISOString().split('T')[0]);
            }
          }
        }}
        // Hide some buttons on mobile
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next today'
        }}
        // Adjust view for mobile
        views={{
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: 'short' },
            dayHeaderFormat: { weekday: 'short' },
            dayMaxEventRows: 2,
          }
        }}
        // Mobile-optimized styling
        dayMaxEvents={2}
        dayCellContent={(args) => {
          return {
            html: `<div class="fc-daygrid-day-number">${args.dayNumberText}</div>`
          };
        }}
        // Highlight selected date with responsive styles
        dayCellClassNames={(arg) => {
          if (selectedDate) {
            const cellDate = normalizeDate(arg.date);
            const selected = normalizeDate(selectedDate);
            
            if (cellDate && selected && cellDate.getTime() === selected.getTime()) {
              return [
                'selected-date',
                '!bg-blue-600',
                '!text-white',
                'md:!border-2',
                'border-blue-800',
                'rounded-md'
              ];
            }
          }
          return [];
        }}
        // Additional responsive styles
        dayCellDidMount={(arg) => {
          // Add touch-friendly padding on mobile
          if (window.innerWidth < 768) {
            arg.el.style.padding = '4px';
          }
        }}
        // Mobile event handling
        eventClick={(info) => {
          info.jsEvent.preventDefault();
        }}
        // Locale settings
        locale="en"
        firstDay={0} // Sunday
        // Week numbers
        weekNumbers={false}
        // Handle more responsive aspects
        handleWindowResize={true}
        // Content height auto
        contentHeight="auto"
        // Show more link
        moreLinkClick="popover"
      />
      
      {/* Mobile navigation buttons for better UX */}
      <div className="flex justify-between mt-4 md:hidden">
        <button
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.prev();
            }
          }}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Prev
        </button>
        <button
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();
              const today = new Date();
              calendarApi.gotoDate(today);
              onDateSelect(today.toISOString().split('T')[0]);
            }
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => {
            if (calendarRef.current) {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.next();
            }
          }}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Calendar;