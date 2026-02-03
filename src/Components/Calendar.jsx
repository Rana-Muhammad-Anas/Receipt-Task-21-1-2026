import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar({ onDateSelect, selectedDate }) {
  const calendarRef = useRef(null);

  // Navigate calendar when selectedDate changes
  useEffect(() => {
    if (selectedDate && calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(selectedDate);
    }
  }, [selectedDate]);

  // Normalize date for comparison
  const normalizeDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  };

  const handleDateClick = (info) => {
    const formattedDate = info.dateStr;
    onDateSelect(formattedDate);
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"

        /* HEIGHT CONTROL */
        height="100%"
        expandRows={true}

        /* HEADER */
        headerToolbar={{
          left: "prev",
          center: "title",
          right: "next today"
        }}

        buttonText={{
          today: "Today"
        }}

        selectable={true}
        dateClick={handleDateClick}
        handleWindowResize={true}

        dayMaxEvents={2}
        moreLinkClick="popover"

        /* SELECTED DATE STYLING */
        dayCellClassNames={(arg) => {
          if (selectedDate) {
            const cellDate = normalizeDate(arg.date);
            const selected = normalizeDate(selectedDate);

            if (
              cellDate &&
              selected &&
              cellDate.getTime() === selected.getTime()
            ) {
              return ["selected-date"];
            }
          }
          return [];
        }}

        /* MOBILE TOUCH FRIENDLY */
        dayCellDidMount={(arg) => {
          if (window.innerWidth < 768) {
            arg.el.style.padding = "4px";
          }
        }}

        locale="en"
        firstDay={0}
        weekNumbers={false}
      />
    </div>
  );
}

export default Calendar;
