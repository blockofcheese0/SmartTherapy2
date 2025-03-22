import React, { useState } from 'react';
import Calendar from './Calendar';
import './ClientSideDashboard.css';

const ClientSideDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [moodMarkers, setMoodMarkers] = useState({});
  const [showMailbox, setShowMailbox] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // Handle calendar date clicks
  const handleDateClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const currentMood = moodMarkers[dateStr];
    let nextMood;

    // Cycle through mood colors: green -> yellow -> red -> none
    if (!currentMood) nextMood = 'green';
    else if (currentMood === 'green') nextMood = 'yellow';
    else if (currentMood === 'yellow') nextMood = 'red';
    else nextMood = null;

    setMoodMarkers({
      ...moodMarkers,
      [dateStr]: nextMood
    });
  };

  // Render dots on calendar
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = date.toISOString().split('T')[0];
      const mood = moodMarkers[dateStr];
      return mood ? <div className={`mood-dot ${mood}`}></div> : null;
    }
    return null;
  };

  return (
    <div className="dashboard-container">
      {/* Left Column */}
      <div className="left-column">
        <div className="calendar-container">
          <div className="calendar-section">
            <Calendar
              onChange={setDate}
              value={date}
              onClickDay={handleDateClick}
              tileContent={tileContent}
              calendarType="US"
              formatShortWeekday={(locale, date) => ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'][date.getDay()]}
            />
          </div>
        </div>

        <div className="buttons-section">
          <button 
            className="mailbox-button"
            onClick={() => setShowMailbox(!showMailbox)}
          >
            📫 Mailbox
          </button>

          <button 
            className="contact-button"
            onClick={() => setShowContactForm(!showContactForm)}
          >
            👤 Contact Therapist
          </button>
        </div>

        {/* Mailbox Modal */}
        {showMailbox && (
          <div className="modal">
            <div className="modal-content">
              <h2>Your Notifications</h2>
              <div className="messages-list">
                {/* Add your messages here */}
              </div>
              <button onClick={() => setShowMailbox(false)}>Close</button>
            </div> 
          </div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="modal">
            <div className="modal-content">
              <h2>Contact Your Therapist</h2>
              <form>
                <textarea 
                  placeholder="Write your message here..."
                  rows="6"
                />
                <button type="submit">Send Message</button>
                <button 
                  type="button" 
                  onClick={() => setShowContactForm(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="right-column">
        <h1>Welcome to Smart Therapy!</h1>
        <img 
          src="/path-to-your-image.jpg" 
          alt="Welcome instructions for clients" 
          className="welcome-image"
        />
      </div>
    </div>
  );
};

export default ClientSideDashboard;


