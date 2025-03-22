import React, { useState, useEffect } from "react";
import Therapist from './Therapist';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';

const TherapistDashboard = () => {
  const [data, setData] = useState(null);
  const [showMailbox, setShowMailbox] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch notifications from localStorage on component mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("tnotifications")) || [];
    
    // Convert the therapist notifications format to client dashboard format
    const formattedNotifications = storedNotifications.map((notif, index) => ({
      id: index + 1,
      type: 'therapist',
      title: 'Message from Therapist',
      message: notif.message,
      date: formatDateFromTimestamp(notif.timestamp),
      unread: true
    }));
    
    setNotifications(formattedNotifications);
  }, []);

  // Format date from ISO timestamp
  const formatDateFromTimestamp = (timestamp) => {
    if (!timestamp) return formatDate(new Date());
    
    const date = new Date(timestamp);
    return formatDate(date);
  };

  // Update filtered notifications when selected date or notifications change
  useEffect(() => {
    const selectedDateStr = formatDate(selectedDate);
    const filtered = notifications.filter(notif => notif.date === selectedDateStr);
    setFilteredNotifications(filtered);
  }, [selectedDate, notifications]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log('Message sent:', message);
    alert('Message sent to therapist!');
    setMessage('');
    setShowContactForm(false);
  };

  const colorOptions = [
    { value: 'green', label: 'Green', description: 'On Track' },
    { value: 'yellow', label: 'Yellow', description: 'Needs Attention' },
    { value: 'red', label: 'Red', description: 'Critical' }
  ];

  useEffect(() => {
    // Initialize all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
      new bootstrap.Dropdown(dropdown);
    });
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDeleteNotification = (notificationId) => {
    // Remove notification from state
    const updatedNotifications = notifications.filter(notif => notif.id !== notificationId);
    setNotifications(updatedNotifications);
    
    // Update filtered notifications
    const selectedDateStr = formatDate(selectedDate);
    const filtered = updatedNotifications.filter(notif => notif.date === selectedDateStr);
    setFilteredNotifications(filtered);
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notif => 
      notif.id === notificationId ? {...notif, unread: false} : notif
    );
    setNotifications(updatedNotifications);
    
    // Update filtered notifications
    const selectedDateStr = formatDate(selectedDate);
    const filtered = updatedNotifications.filter(notif => notif.date === selectedDateStr);
    setFilteredNotifications(filtered);
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notif => notif.unread).length;

  const handleClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api-endpoint/');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result.message);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  // Save notification with the new format
  const saveNotification = (msg) => {
    const newNotification = { message: msg, read: false, timestamp: new Date().toISOString() };
    
    // Get existing notifications from localStorage
    const existingNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    const updatedNotifications = [...existingNotifications, newNotification];
    
    // Save back to localStorage
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
    
    // Also update our formatted notifications for the UI
    const formattedNotifications = updatedNotifications.map((notif, index) => ({
      id: index + 1,
      type: 'therapist',
      title: 'Message from Therapist',
      message: notif.message,
      date: formatDateFromTimestamp(notif.timestamp),
      unread: true
    }));
    
    setNotifications(formattedNotifications);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      saveNotification(message);
      alert("Message Sent!")
      setMessage("");
    }
  };

  const handleCheckIn = () => {
    saveNotification("Check-in notification sent.");
    alert("Check-in notification saved!");
  };

  return (
    <div>
      <Therapist />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="card">
              <div className="card-header lead">Completed</div>
              <div className="card-body scrollable-card">
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
                <p>
                  <span className="green-dot"></span> User completed their monthly goal
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card">
              <div className="card-header lead">Incompleted</div>
              <div className="card-body scrollable-card">
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
                <p>
                  <span className="red-dot"></span> User missed their exercises
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-header lead">Contact User</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message here..."
                        aria-label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <button className="btn btn-primary" type="submit">
                        <i className="bi bi-send-fill"></i> Send
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
            </div>
            <div className="d-flex flex-column gap-3 ms-4 flex-grow-1 mt-4">
              <button
                className="p-4 fs-5 w-100 position-relative buttonblu"
                onClick={() => setShowMailbox(!showMailbox)}>
                📫 Mailbox
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount}
                    <span className="visually-hidden">unread messages</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mailbox Modal */}
      {showMailbox && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  📫 Notifications for {selectedDate.toLocaleDateString()}
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowMailbox(false)}></button>
              </div>
              <div className="modal-body">
                {filteredNotifications.length > 0 ? (
                  <div className="list-group">
                    {filteredNotifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`list-group-item list-group-item-action ${notification.unread ? 'list-group-item-light' : ''}`}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h6 className="mb-1">
                            {notification.unread && <span className="btn btn-primary badge me-1">New</span>}
                            {notification.title}
                          </h6>
                          <small className="text-muted">{notification.date}</small>
                        </div>
                        <p className="mb-1">{notification.message}</p>
                        <div className="d-flex justify-content-end mt-2">
                          {notification.unread && (
                            <button 
                              className="btn btn-sm me-2 btn-primary"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </button>
                          )}
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted my-4">No notifications for this date</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowMailbox(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};  

export default TherapistDashboard;