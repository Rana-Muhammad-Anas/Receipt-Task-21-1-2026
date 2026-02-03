import React, { useState, useRef, useEffect } from 'react';

const TimeTable = ({ selectedDate,changeSelectedDate }) => {
    const timelineRef = useRef(null);
    const [events, setEvents] = useState([
        { id: 1, title: 'Meeting with Team', startTime: '09:00', endTime: '10:30', color: 'bg-blue-500' },
        { id: 2, title: 'Lunch Break', startTime: '12:00', endTime: '13:00', color: 'bg-green-500' },
        { id: 3, title: 'Client Call', startTime: '14:30', endTime: '15:30', color: 'bg-purple-500' },
    ]);

    const [showEventPopup, setShowEventPopup] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({ hour: null, time: '' });
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        color: 'bg-blue-500'
    });

  
    // Generate time slots from 6 AM to 10 PM
    const timeSlots = Array.from({ length: 17 }, (_, i) => {
        const hour = i + 6; // Start from 6 AM
        return `${hour.toString().padStart(2, '0')}:00`;
    });

    // Format date for input field (yyyy-MM-dd)
    const formatDateForInput = (date) => {
        if (!date) return '';
        
        // If it's already a string in yyyy-MM-dd format
        if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return date;
        }
        
        // Try to convert to Date object
        try {
            const dateObj = new Date(date);
            if (!isNaN(dateObj.getTime())) {
                const year = dateObj.getFullYear();
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const day = String(dateObj.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            }
        } catch (e) {
            console.error('Error formatting date:', e);
        }
        
        return '';
    };

    // Handle date change from input
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        if (changeSelectedDate) {
            changeSelectedDate(newDate);
        }
    };

    const convertTimeToPosition = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const totalMinutes = (hours - 6) * 60 + minutes;
        return (totalMinutes / 60) * 70; // 70px per hour
    };

    const calculateEventHeight = (startTime, endTime) => {
        const startPos = convertTimeToPosition(startTime);
        const endPos = convertTimeToPosition(endTime);
        return endPos - startPos;
    };

    const handleTimeSlotClick = (hour) => {
        const startTime = `${hour.toString().padStart(2, '0')}:00`;
        const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;

        setSelectedTimeSlot({ hour, time: startTime });
        setNewEvent({
            title: '',
            description: '',
            startTime,
            endTime,
            color: 'bg-blue-500'
        });
        setShowEventPopup(true);
    };

    const handleEventClick = (event, e) => {
        e.stopPropagation();
        // Handle event click (edit/delete)
        console.log('Event clicked:', event);
    };

    const handleDragStart = (event, e) => {
        e.dataTransfer.setData('eventId', event.id);
    };

    const handleDrop = (time, e) => {
        e.preventDefault();
        const eventId = e.dataTransfer.getData('eventId');
        console.log('Drop event', eventId, 'at time:', time);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCreateEvent = () => {
        if (!newEvent.title.trim() || !newEvent.startTime || !newEvent.endTime) {
            alert('Please fill in all required fields');
            return;
        }

        const event = {
            id: Date.now(),
            title: newEvent.title,
            startTime: newEvent.startTime,
            endTime: newEvent.endTime,
            color: newEvent.color,
            description: newEvent.description,
            date: selectedDate || new Date().toISOString().split('T')[0]
        };

        setEvents([...events, event]);
        setShowEventPopup(false);
        setNewEvent({
            title: '',
            description: '',
            startTime: '',
            endTime: '',
            color: 'bg-blue-500'
        });
    };

    const handleCancelEvent = () => {
        setShowEventPopup(false);
        setNewEvent({
            title: '',
            description: '',
            startTime: '',
            endTime: '',
            color: 'bg-blue-500'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="timeline-container relative border rounded-lg h-[35vh] overflow-y-auto overscroll-contain">
                {/* Header with current day */}
                <div className="flex border-b">
                    <div className="w-20 flex-shrink-0 border-r p-4">
                        <div className="text-sm text-gray-500">Time</div>
                    </div>
                    <div className="flex-1 p-3">
                        <div className="text-sm font-medium text-gray-700">
                            {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            }) : 'Today'}
                        </div>
                    </div>
                </div>

                {/* Timeline Grid */}
                <div className="flex relative">
                    {/* Time Labels */}
                    <div className="w-20 flex-shrink-0">
                        {timeSlots.map((time) => (
                            <div
                                key={time}
                                className="border-r border-gray-200 p-2 text-sm text-gray-500 text-right pr-2"
                                style={{ height: '70px' }}
                            >
                                {parseInt(time.split(':')[0]) <= 12 ?
                                    `${parseInt(time.split(':')[0])}:00 AM` :
                                    `${parseInt(time.split(':')[0]) - 12}:00 PM`}
                            </div>
                        ))}
                    </div>

                    {/* Time Grid */}
                    <div
                        ref={timelineRef}
                        className="flex-1 relative border-l"
                        style={{ minHeight: `${70 * timeSlots.length}px` }}
                    >
                        {/* Hour Lines */}
                        {timeSlots.map((time, index) => (
                            <div
                                key={time}
                                className={`absolute left-0 right-0 cursor-pointer hover:bg-blue-50 transition-colors ${index < timeSlots.length - 1 ? 'border-b border-gray-200' : ''
                                    }`}
                                style={{
                                    top: `${index * 70}px`,
                                    height: '70px'
                                }}
                                onClick={() => handleTimeSlotClick(parseInt(time.split(':')[0]))}
                                onDrop={(e) => handleDrop(time, e)}
                                onDragOver={handleDragOver}
                            >
                                {/* Half hour marker */}
                                <div
                                    className="absolute left-0 right-0 border-t border-gray-100"
                                    style={{ top: '35px' }}
                                ></div>
                            </div>
                        ))}

                        {/* Events */}
                        {events.map((event) => {
                            const topPosition = convertTimeToPosition(event.startTime);
                            const eventHeight = calculateEventHeight(event.startTime, event.endTime);

                            return (
                                <div
                                    key={event.id}
                                    className={`absolute left-2 right-2 rounded-lg p-3 shadow-sm cursor-pointer border-l-4 ${event.color} border-opacity-80`}
                                    style={{
                                        top: `${topPosition}px`,
                                        height: `${eventHeight}px`,
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        borderLeftColor: event.color.replace('bg-', '')
                                    }}
                                    onClick={(e) => handleEventClick(event, e)}
                                    draggable
                                    onDragStart={(e) => handleDragStart(event, e)}
                                >
                                    <div className="font-medium text-sm text-gray-800">{event.title}</div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {event.startTime} - {event.endTime}
                                    </div>
                                    {event.description && (
                                        <div className="text-xs text-gray-500 mt-2 truncate">
                                            {event.description}
                                        </div>
                                    )}
                                    {/* Event controls */}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <button className="p-1 hover:bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button className="p-1 hover:bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Current Time Indicator */}
                        <CurrentTimeIndicator />
                    </div>
                </div>

                {/* Add Event Button at the bottom */}
                <div className="border-t p-2">
                    <button
                        // onClick={onEventAdd}
                        className="w-full py-1 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add time slot
                    </button>
                </div>
            </div>

            {/* Event Creation Popup */}
            {showEventPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Add New Event
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newEvent.title}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter event title"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={newEvent.description}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter event description"
                                        rows="3"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formatDateForInput(selectedDate)}
                                        onChange={handleDateChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Time *
                                        </label>
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={newEvent.startTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Time *
                                        </label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            value={newEvent.endTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                
                                

                                <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="text-sm text-gray-600">
                                        <span className="font-medium">Date:</span> {selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }) : new Date().toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        <span className="font-medium">Time:</span> {newEvent.startTime} - {newEvent.endTime}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 rounded-b-lg">
                            <button
                                onClick={handleCancelEvent}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateEvent}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                            >
                                Create Event
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// Current Time Indicator Component
const CurrentTimeIndicator = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    const getCurrentTimePosition = () => {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const totalMinutes = (hours - 6) * 60 + minutes;
        return (totalMinutes / 60) * 70;
    };

    if (currentTime.getHours() < 6 || currentTime.getHours() > 22) {
        return null;
    }

    return (
        <div
            className="absolute left-0 right-0 z-10"
            style={{ top: `${getCurrentTimePosition()}px` }}
        >
            <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="h-0.5 bg-red-500 flex-grow"></div>
            </div>
            <div className="absolute left-2 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    );
};

export default TimeTable;