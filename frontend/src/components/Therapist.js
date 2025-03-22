import TherapistDashboard from "./TherapistDashboard";
import "./therapist.css"
import React, { useState } from 'react';

const Therapist = () => {
    
  return (
    <div>
        <style></style>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/therapistWelcome">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
          
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="offcanvas" data-bs-target="#clientOffcanvas">
                            Patients
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="offcanvas offcanvas-start" tabindex="-1" id="clientOffcanvas" aria-labelledby="clientOffcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="clientOffcanvasLabel">Patients</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="mb-3">
                <input type="text" class="form-control" id="clientSearch" placeholder="Search patients..."></input>
            </div>
            <div class="client-list">
                <ul class="list-group" id="clientList">
                    <li class="list-group-item"><a href="therapistDashboard">John Doe</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Jane Smith</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Alex Johnson</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Emma Wilson</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Michael Brown</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Sarah Davis</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Thomas Miller</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Olivia Garcia</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Daniel Martinez</a></li>
                    <li class="list-group-item"><a href="therapistDashboard">Sophia Robinson</a></li>
                </ul>
            </div>
        </div>
    </div>
    
    </div>
  );
};

export default Therapist;