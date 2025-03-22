import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <h2 className="display-3 fw-bold mb-3 text-primary">SmartTherapy</h2>
            <p className="fs-4 mb-5 text-secondary">Journey to Healing</p>

            <h2 className="mb-4 text-dark">How We Support Your Therapy Journey</h2>

            <ul className="d-flex flex-wrap justify-content-center gap-4 mb-5 list-unstyled">
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Enhance therapy outcomes by providing real-time data and insights 
              </li>
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Boost client engagement and accountability through AI-generated goals and automated reminders
              </li>
              <li className="bg-light text-dark p-4 rounded-3 shadow-sm w-75 w-md-auto">
                Facilitate seamless communication between therapists and clients
              </li>
            </ul>

            <div className="d-grid gap-2 d-sm-flex justify-content-center mt-5">
              <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
