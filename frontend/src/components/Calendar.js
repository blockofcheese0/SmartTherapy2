import React, { useState } from 'react';

const calendarStyles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    maxWidth: '275px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  monthTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0'
  },
  navButton: {
    background: 'none',
    border: 'none',
    color: '#4a5568',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  weekdaysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px',
    textAlign: 'center',
    fontSize: '12px',
    marginBottom: '4px'
  },
  weekday: {
    fontWeight: '500'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '4px'
  },
  dayCell: {
    height: '32px',
    width: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    fontSize: '14px'
  },
  dayButton: {
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  },
  selected: {
    backgroundColor: '#D1FFBD',
    color: '#000000'
  }
};

const Calendar = ({ onDateClick, selectedDate, activities }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Build calendar days
  const buildCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Create blank spaces for days before first day of month
    const blanks = Array(firstDayOfMonth).fill(null);
    
    // Create array of days
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    

    // Combine blanks and days
    return [...blanks, ...days];
  };

  // Format month name
  const getMonthName = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[month];
  };

  // Navigate between months
  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(null);
  };

  // Handle day click
  const handleDayClick = (day) => {
    if (!day) return; // Don't do anything if clicking on a blank day
    setSelectedDay(day);
    if (onDateClick) {
      onDateClick(new Date(currentYear, currentMonth, day));
    }
  };

  const calendarDays = buildCalendar();

  
  return (
    <div style={calendarStyles.container}>
      <div style={calendarStyles.header}>
        <button 
          onClick={() => changeMonth(-1)}
          style={calendarStyles.navButton}
        >
          &lt;
        </button>
        <h2 style={calendarStyles.monthTitle}>
          {getMonthName(currentMonth)} {currentYear}
        </h2>
        <button 
          onClick={() => changeMonth(1)}
          style={calendarStyles.navButton}
        >
          &gt;
        </button>
      </div>
      
      <div style={calendarStyles.weekdaysGrid}>
        <div style={calendarStyles.weekday}>Su</div>
        <div style={calendarStyles.weekday}>Mo</div>
        <div style={calendarStyles.weekday}>Tu</div>
        <div style={calendarStyles.weekday}>We</div>
        <div style={calendarStyles.weekday}>Th</div>
        <div style={calendarStyles.weekday}>Fr</div>
        <div style={calendarStyles.weekday}>Sa</div>
      </div>
      
      <div style={calendarStyles.daysGrid}>
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => handleDayClick(day)}
            style={{
              ...calendarStyles.dayCell,
              ...(day && { cursor: 'pointer', ':hover': { backgroundColor: '#f3f4f6' } }),
              ...(day && day === selectedDay && calendarStyles.selected)
            }}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;