import TherapistDashboard from "./TherapistDashboard";
import "./therapist.css"
import React, { useState } from 'react';

const Client = () => {
    
  return (
    <div>
        <style></style>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/form">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="generatePlan">Generate Plan</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="clientJournal">Journal</a>
                    </li>
                </ul>

            </div>
        </div>
    </nav>

    
    </div>
  );
};

export default Client;