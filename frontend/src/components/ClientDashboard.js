import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import './ClientDashboard.css';
import Client from './Client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';

const ClientDashboard = () => {
const [showMailbox, setShowMailbox] = useState(false);
const [showContactForm, setShowContactForm] = useState(false);
const [selectedDate, setSelectedDate] = useState(new Date());
const [activities, setActivities] = useState([
{ id: 1, name: 'Quad Sets', date: '2025-03-01', color: null, duration: '15 mins' },
{ id: 2, name: 'Hamstring Curls', date: '2025-03-01', color: null, duration: '20 mins' },
{ id: 3, name: 'Knee Extension', date: '2025-03-02', color: null, duration: '15 mins' },
{ id: 4, name: 'Straight Leg Raises', date: '2025-03-03', color: null, duration: '10 mins' },
{ id: 5, name: 'Wall Slides', date: '2025-03-03', color: null, duration: '20 mins' },
{ id: 6, name: 'Step Ups', date: '2025-03-04', color: null, duration: '15 mins' },
{ id: 7, name: 'Calf Raises', date: '2025-03-04', color: null, duration: '10 mins' },
{ id: 8, name: 'Lunges', date: '2025-03-05', color: null, duration: '20 mins' },
{ id: 9, name: 'Bracing Exercises', date: '2025-03-05', color: null, duration: '10 mins' },
{ id: 10, name: 'Standing Knee Flexion', date: '2025-03-06', color: null, duration: '15 mins' },
{ id: 11, name: 'Quad Sets', date: '2025-03-07', color: null, duration: '15 mins' },
{ id: 12, name: 'Hamstring Curls', date: '2025-03-07', color: null, duration: '20 mins' },
{ id: 13, name: 'Knee Extension', date: '2025-03-08', color: null, duration: '15 mins' },
{ id: 14, name: 'Straight Leg Raises', date: '2025-03-09', color: null, duration: '10 mins' },
{ id: 15, name: 'Wall Slides', date: '2025-03-09', color: null, duration: '20 mins' },
{ id: 16, name: 'Step Ups', date: '2025-03-10', color: null, duration: '15 mins' },
{ id: 17, name: 'Calf Raises', date: '2025-03-10', color: null, duration: '10 mins' },
{ id: 18, name: 'Lunges', date: '2025-03-11', color: null, duration: '20 mins' },
{ id: 19, name: 'Bracing Exercises', date: '2025-03-11', color: null, duration: '10 mins' },
{ id: 20, name: 'Standing Knee Flexion', date: '2025-03-12', color: null, duration: '15 mins' },
{ id: 21, name: 'Quad Sets', date: '2025-03-13', color: null, duration: '15 mins' },
{ id: 22, name: 'Hamstring Curls', date: '2025-03-13', color: null, duration: '20 mins' },
{ id: 23, name: 'Knee Extension', date: '2025-03-14', color: null, duration: '15 mins' },
{ id: 24, name: 'Straight Leg Raises', date: '2025-03-15', color: null, duration: '10 mins' },
{ id: 25, name: 'Wall Slides', date: '2025-03-15', color: null, duration: '20 mins' },
{ id: 26, name: 'Step Ups', date: '2025-03-16', color: null, duration: '15 mins' },
{ id: 27, name: 'Calf Raises', date: '2025-03-16', color: null, duration: '10 mins' },
{ id: 28, name: 'Lunges', date: '2025-03-17', color: null, duration: '20 mins' },
{ id: 29, name: 'Bracing Exercises', date: '2025-03-17', color: null, duration: '10 mins' },
{ id: 30, name: 'Standing Knee Flexion', date: '2025-03-18', color: null, duration: '15 mins' },
{ id: 31, name: 'Quad Sets', date: '2025-03-19', color: null, duration: '15 mins' },
{ id: 32, name: 'Hamstring Curls', date: '2025-03-19', color: null, duration: '20 mins' },
{ id: 33, name: 'Knee Flexion', date: '2025-03-20', color: null, duration: '15 mins' },
{ id: 34, name: 'Hip Abduction', date: '2025-03-20', color: null, duration: '10 mins' },
{ id: 35, name: 'Step Downs', date: '2025-03-21', color: null, duration: '15 mins' },
{ id: 36, name: 'Calf Raises', date: '2025-03-21', color: null, duration: '20 mins' },
{ id: 37, name: 'Leg Press', date: '2025-03-22', color: null, duration: '20 mins' },
{ id: 38, name: 'Lateral Leg Raises', date: '2025-03-22', color: null, duration: '15 mins' },
{ id: 39, name: 'Standing Toe Touch', date: '2025-03-23', color: null, duration: '10 mins' },
{ id: 40, name: 'Bridging', date: '2025-03-23', color: null, duration: '15 mins' },
{ id: 41, name: 'Single-Leg Deadlift', date: '2025-03-24', color: null, duration: '20 mins' },
{ id: 42, name: 'Hamstring Stretch', date: '2025-03-24', color: null, duration: '10 mins' },
{ id: 43, name: 'Step Up with Knee Raise', date: '2025-03-25', color: null, duration: '20 mins' },
{ id: 44, name: 'Wall Squats', date: '2025-03-25', color: null, duration: '15 mins' },
{ id: 45, name: 'Seated Knee Extension', date: '2025-03-26', color: null, duration: '10 mins' },
{ id: 46, name: 'Quad Sets', date: '2025-03-26', color: null, duration: '15 mins' },
{ id: 47, name: 'Clamshells', date: '2025-03-27', color: null, duration: '15 mins' },
{ id: 48, name: 'Side-Lying Leg Raises', date: '2025-03-27', color: null, duration: '15 mins' },
{ id: 49, name: 'Glute Bridges', date: '2025-03-28', color: null, duration: '20 mins' },
{ id: 50, name: 'Standing Leg Curls', date: '2025-03-28', color: null, duration: '15 mins' },
{ id: 51, name: 'Bridge with Leg Lift', date: '2025-03-29', color: null, duration: '20 mins' },
{ id: 52, name: 'Single-Leg Squat', date: '2025-03-29', color: null, duration: '15 mins' },
{ id: 53, name: 'Step Downs', date: '2025-03-30', color: null, duration: '20 mins' },
{ id: 54, name: 'Standing Knee Extension', date: '2025-03-30', color: null, duration: '10 mins' },
{ id: 55, name: 'Lunges', date: '2025-03-31', color: null, duration: '20 mins' },
{ id: 56, name: 'Bracing Exercises', date: '2025-03-31', color: null, duration: '10 mins' }
]);
const [filteredActivities, setFilteredActivities] = useState(activities);

const generateNotifications = () => {
const notificationTemplates = [
{ type: 'reminder', title: 'Exercise Reminder', message: 'Remember to complete your exercises for today!' },
{ type: 'progress', title: 'Progress Update', message: 'You\'re making great progress with your exercises.' },
{ type: 'appointment', title: 'Upcoming Session', message: 'You have a session scheduled for tomorrow.' },
{ type: 'reminder', title: 'Health Tip', message: 'Stay hydrated during your exercises today.' },
{ type: 'progress', title: 'Achievement', message: 'You\'ve completed all exercises this week!' }
];

let generatedNotifications = [];
let id = 1;

// Generate notifications for March 2025
for (let day = 1; day <= 31; day++) {
// Generate 1-3 notifications per day (changed from 0-2)
const numNotifications = Math.floor(Math.random() * 3) + 1;

for (let i = 0; i < numNotifications; i++) {
const template = notificationTemplates[Math.floor(Math.random() * notificationTemplates.length)];
generatedNotifications.push({
id: id++,
...template,
date: `2025-03-${String(day).padStart(2, '0')}`,
unread: Math.random() > 0.5
});
}
}

return generatedNotifications;
};

const [notifications] = useState(generateNotifications());

const [filteredNotifications, setFilteredNotifications] = useState([]);
const [message, setMessage] = useState('');

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

const handleDateClick = (date) => {
setSelectedDate(date);
const selectedDateStr = formatDate(date);
console.log('Selected Date:', selectedDateStr); // Debug log

const filtered = activities.filter(activity => {
console.log('Comparing:', activity.date, selectedDateStr); // Debug log
return activity.date === selectedDateStr;
});
setFilteredActivities(filtered);

// Update notifications for the selected date
const notificationFiltered = notifications.filter(notif => notif.date === selectedDateStr);
setFilteredNotifications(notificationFiltered);
};

const handleColorSelect = (activityId, color) => {
const updatedActivities = activities.map(activity =>
activity.id === activityId ? {...activity, color} : activity
);
setActivities(updatedActivities);

// Update filtered activities as well
const selectedDateStr = formatDate(selectedDate);
const filtered = updatedActivities.filter(activity => activity.date === selectedDateStr);
setFilteredActivities(filtered);
};

return (
<div>
    <Client />
<div className="container mt-4">
<div className="d-flex align-items-start mb-4">
<div className="calendar-section">
<Calendar
onDateClick={handleDateClick}
selectedDate={selectedDate}
activities={activities}
/>
</div>
<div className="d-flex flex-column gap-3 ms-4 flex-grow-1 mt-4">
<button
className="btn btn-primary p-4 fs-5 w-100"
onClick={() => setShowMailbox(!showMailbox)}>
📫 Mailbox
</button>
<button
className="btn btn-primary p-4 fs-5 w-100"
onClick={() => setShowContactForm(!showContactForm)}>
👤 Contact Therapist
</button>
</div>
</div>

{/* Tasks Section */}
<div className="card">
<div className="card-header d-flex justify-content-between align-items-center">
<h5 className="mb-0">Activities</h5>
<span className="text-muted">
{selectedDate ? selectedDate.toLocaleDateString() : 'Select a date'}
</span>
</div>
<div className="card-body">
<ul className="list-group">
{filteredActivities.map(activity => (
<li key={activity.id}
className="list-group-item d-flex justify-content-between align-items-center">
<span>{activity.name}</span>
<div className="btn-group">
<button
className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
type="button"
id={`dropdown-${activity.id}`}
data-bs-toggle="dropdown"
aria-expanded="false"
>
<span className={`dot ${activity.color ? `bg-${activity.color}` : 'bg-light border'}`}></span>
</button>
<ul className="dropdown-menu dropdown-menu-end">
{colorOptions.map(color => (
<li key={color.value}>
<a
href="#"
className="dropdown-item d-flex align-items-center gap-2"
onClick={(e) => {
e.preventDefault();
handleColorSelect(activity.id, color.value);
}}
>
<span className={`dot bg-${color.value}`}></span>
<div>
<div>{color.label}</div>
<small className="text-muted">{color.description}</small>
</div>
</a>
</li>
))}
</ul>
</div>
</li>
))}
</ul>
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
<h6 className="mb-1">{notification.title}</h6>
<small className="text-muted">{notification.date}</small>
</div>
<p className="mb-1">{notification.message}</p>
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

{/* Contact Form Modal */}
{showContactForm && (
<div className="modal" style={{ display: 'block' }}>
<div className="modal-dialog">
<div className="modal-content">
<div className="modal-header">
<h5 className="modal-title">Contact Your Therapist</h5>
<button
type="button"
className="btn-close"
onClick={() => setShowContactForm(false)}
></button>
</div>
<form onSubmit={handleSubmitMessage}>
<div className="modal-body">
<div className="form-group">
<textarea
className="form-control"
placeholder="Write your message here..."
rows="6"
value={message}
onChange={(e) => setMessage(e.target.value)}
required
/>
</div>
</div>
<div className="modal-footer">
<button
type="button"
className="btn btn-secondary"
onClick={() => setShowContactForm(false)}
>
Cancel
</button>
<button
type="submit"
className="btn btn-primary"
disabled={!message.trim()}
>
Send Message
</button>
</div>
</form>
</div>
</div>
</div>
)}
</div>
</div>
);
};

export default ClientDashboard;