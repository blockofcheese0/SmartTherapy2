import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import API from './api'; 
import './App.css'; 
import TherapistWelcome from "./components/TherapistWelcome";
import TherapistDashboard from './components/TherapistDashboard';
import ClientDashboard from './components/ClientDashboard';
import Login from './components/Auth/Login';
import HomePage from './components/HomePage';
import GeneratePlan from './components/GeneratePlan';
import ClientJournal from './components/ClientJournal'; 
import NewJournal from './components/NewJournal';

function App() { 
    const [data, setData] = useState([]); 

    useEffect(() => { 
        API.get('api-endpoint/')  // Replace with actual endpoint 
            .then(response => setData(response.data)) 
            .catch(error => console.error(error)); 
    }, []); 

    return ( 
      <Router>
        <Routes>
          {/* Default route redirects to homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication Route */}
          <Route path="/login" element={<Login />} />

          {/* Client and Therapist Routes */}
          <Route path="/form" element={<ClientDashboard />} />
          <Route path="/therapistWelcome" element={<TherapistWelcome />} />
          <Route path="/therapistDashboard" element={<TherapistDashboard />} />
          <Route path="/generatePlan" element={<GeneratePlan />} />
          <Route path="/clientJournal" element={<ClientJournal />} />
          <Route path="/newJournal" element={<NewJournal />} />
          </Routes>
      </Router>
    ); 
} 

export default App;