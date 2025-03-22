import React, { useState } from 'react';
import Therapist from './Therapist';
import './TherapistWelcome.css';
import '../App.css';  // Add this import

const TherapistWelcome = () => {
  const [data, setData] = useState(null);

  return (
    <div>
            <Therapist />

    <div className="therapist-welcome-container">

      <h1 className="welcome-heading">Welcome to Smart Therapy!</h1>
      
      <div className="photo-grid">
        <div className="photo-item">
          <img src="/smarttherapylogo.jpg" alt="Therapy Service 1" />
        </div>
        <div className="photo-item large-item">
          <img src="/instructions.jpg" alt="Therapy Service 2" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default TherapistWelcome;