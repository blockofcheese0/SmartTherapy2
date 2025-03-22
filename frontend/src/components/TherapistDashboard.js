import React, { useState, useEffect } from "react";
import Therapist from './Therapist';

const TherapistDashboard = () => {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from localStorage on component mount
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
  }, []);

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

  // Save notification with the new format [message, read]
  const saveNotification = (msg) => {
    const newNotification = { message: msg, read: false, timestamp: new Date().toISOString() };
    const newNotifications = [...notifications, newNotification];
    setNotifications(newNotifications);
    localStorage.setItem("notifications", JSON.stringify(newNotifications));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      saveNotification(message);
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
          </div>
        </div>
      </div>
    </div>
  );
};  

export default TherapistDashboard;